import webview
import threading
import ctypes
import os
import sys
import shutil
import urllib.request
import zipfile
import io
import re
import json
import time
import datetime
import hashlib
import tkinter as tk
import inspect
import textwrap
import traceback

# --- CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXT_DIR = os.path.join(BASE_DIR, 'extensions') 
INTERNAL_DATA_ROOT = os.path.join(os.environ['LOCALAPPDATA'], 'ViewTube_System')
USER_DATA_DIR = os.path.join(INTERNAL_DATA_ROOT, 'Profile')
INTERNAL_EXT_DIR = os.path.join(INTERNAL_DATA_ROOT, 'Active_Extensions')
CONFIG_FILE = os.path.join(INTERNAL_DATA_ROOT, 'config.json')

os.makedirs(INTERNAL_DATA_ROOT, exist_ok=True)

APP_LOGS = []
EXT_IDS = {}
MIRRORED = {}
LOG_DIR = os.path.join(BASE_DIR, 'logs')
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, 'viewtube.log')
def log(message):
    entry = f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {message}"
    print(entry)
    APP_LOGS.append(entry)
    try:
        with open(LOG_FILE, 'a', encoding='utf-8') as f: f.write(entry + "\n")
    except: pass

def load_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r') as f: return json.load(f)
        except: pass
    return {"pill_x": 150, "pill_y": 15}

def save_config(x, y):
    try:
        with open(CONFIG_FILE, 'w') as f: json.dump({"pill_x": x, "pill_y": y}, f)
    except: pass

# --- Windows Native Utils ---
user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
GWL_STYLE, GWL_EXSTYLE = -16, -20
WS_CAPTION, WS_THICKFRAME = 0xC00000, 0x40000
WS_EX_LAYERED, LWA_ALPHA = 0x80000, 0x2

def get_short_path(long_name):
    if not os.path.exists(long_name): return long_name
    buf = ctypes.create_unicode_buffer(256)
    kernel32.GetShortPathNameW(long_name, buf, 256)
    return buf.value

def set_window_alpha(hwnd, alpha):
    try:
        old = user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
        user32.SetWindowLongW(hwnd, GWL_EXSTYLE, old | WS_EX_LAYERED)
        user32.SetLayeredWindowAttributes(hwnd, 0, alpha, LWA_ALPHA)
    except: pass

def show_splash():
    root = tk.Tk()
    root.overrideredirect(True)
    root.attributes("-topmost", True)
    sw, sh = root.winfo_screenwidth(), root.winfo_screenheight()
    w, h = 450, 260
    root.geometry(f"{w}x{h}+{int((sw-w)/2)}+{int((sh-h)/2)}")
    root.configure(bg='#0f0f0f')
    container = tk.Frame(root, bg='#0f0f0f')
    container.pack(expand=True)
    title_frame = tk.Frame(container, bg='#0f0f0f')
    title_frame.pack(pady=(0, 15))
    tk.Label(title_frame, text="View", font=("Segoe UI Black", 32), fg="#ffffff", bg="#0f0f0f").pack(side=tk.LEFT)
    tk.Label(title_frame, text="Tube", font=("Segoe UI Black", 32), fg="#ff0000", bg="#0f0f0f").pack(side=tk.LEFT)
    shortcuts = [("Ctrl + M", "Open Settings Menu"), ("F / Esc", "Fullscreen Toggle")]
    for keys, desc in shortcuts:
        row = tk.Frame(container, bg='#0f0f0f')
        row.pack(fill=tk.X, pady=1)
        tk.Label(row, text=keys, font=("Consolas", 10, "bold"), fg="#aaaaaa", bg='#0f0f0f', width=22, anchor="e").pack(side=tk.LEFT)
        tk.Label(row, text=f" :  {desc}", font=("Segoe UI", 10), fg="#666666", bg='#0f0f0f', anchor="w").pack(side=tk.LEFT)
    root.attributes("-alpha", 0.0)
    for alpha in range(0, 101, 10):
        root.attributes("-alpha", alpha / 100.0)
        root.update(); time.sleep(0.005)
    time.sleep(1.5)
    for alpha in range(100, -1, -12):
        root.attributes("-alpha", alpha / 100.0)
        root.update(); time.sleep(0.005)
    root.destroy()
def get_extension_id(path):
    """Calculates a stable Chrome ID for unpacked extensions."""
    p = path.lower().replace('\\', '/').encode('utf-8')
    h = hashlib.sha256(p).hexdigest()[:32]
    return "".join([chr(int(c, 16) + ord('a')) for c in h])

def find_manifest(start_dir):
    for root, _, files in os.walk(start_dir):
        if 'manifest.json' in files: return root
    return None

def resolve_name(path, raw):
    if not raw or not raw.startswith("__MSG_"): return raw
    key = raw.replace("__MSG_", "").replace("__", "")
    for loc in ['en', 'en_US', 'en_GB']:
        f_path = os.path.join(path, '_locales', loc, 'messages.json')
        if os.path.exists(f_path):
            try:
                with open(f_path, 'r', encoding='utf-8') as f:
                    d = json.load(f)
                    if key in d: return d[key]['message']
            except: pass
    return raw

def generate_manager_html():
    rows = ""
    if os.path.exists(EXT_DIR):
        for folder in os.listdir(EXT_DIR):
            src = os.path.join(EXT_DIR, folder); real = find_manifest(src)
            if not real: continue
            
            # We must use the ID generated from the MIRRORED C: path
            mirrored_root = os.path.join(INTERNAL_EXT_DIR, folder)
            ext_id = EXT_IDS.get(folder) or get_extension_id(mirrored_root)
            
            name, opt_page = folder, ""
            try:
                with open(os.path.join(real, 'manifest.json'), 'r', encoding='utf-8') as f:
                    m = json.load(f)
                    name = resolve_name(real, m.get('name', folder))
                    if 'options_page' in m: opt_page = m['options_page']
                    elif 'options_ui' in m: opt_page = m['options_ui'].get('page', '')
                    elif 'action' in m: opt_page = m['action'].get('default_popup', '')
            except: pass
            
            # Action buttons
            btns = f"<button onclick='pywebview.api.delete_ext(\"{folder}\")' style='background:#cc0000;color:white;border:none;padding:8px 15px;border-radius:5px;cursor:pointer;'>Uninstall</button>"
            if opt_page:
                target = f"chrome-extension://{ext_id}/{opt_page}"
                # We use the Python API to load the URL to bypass the 404 error
                btns = f"<button onclick='pywebview.api.open_ext_url(\"{target}\")' style='background:#0066cc;color:white;border:none;padding:8px 15px;border-radius:5px;cursor:pointer;margin-right:10px;'>Options</button>" + btns
            
            rows += f"<div style='background:#222;padding:15px;margin-bottom:10px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;border:1px solid #333;'><div style='color:white'><h3 style='margin:0'>{name}</h3><code style='font-size:10px;color:#888;'>{ext_id}</code></div><div>{btns}</div></div>"
    
    return f"<!DOCTYPE html><html><body style='background:#111;font-family:sans-serif;padding:30px;'><button onclick='pywebview.api.go_home()' style='background:#444;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;margin-bottom:20px;'>← Back to YouTube</button><h1 style='color:white;border-bottom:2px solid red;padding-bottom:10px;'>Extensions Manager</h1>{rows}</body></html>"
# --- INJECTED UI ---
def get_injected_ui():
    cfg = load_config()
    return """
    (function() {
        if(window.vt_loaded || !document.body || !document.head) return; window.vt_loaded = true;
        let vtPolicy = null;
        if (window.trustedTypes && window.trustedTypes.createPolicy) {
            try { vtPolicy = window.trustedTypes.createPolicy('vt', { createHTML: (s) => s }); } catch (e) {}
        }
        function setHTML(el, h) { el.innerHTML = vtPolicy ? vtPolicy.createHTML(h) : h; }
        
        const div = document.createElement('div'); div.id = 'vt_overlay';
        setHTML(div, `<div id="vt_pill"><div id="vt_handle"></div><div id="vt_box"><div id="vt_s" class="vt_i">🔍 Search</div><div id="vt_m" class="vt_i">⚡ Install</div><div id="vt_e" class="vt_i">🔧 Manage</div><div id="vt_l" class="vt_i">📜 Logs</div></div></div>`);
        const s = document.createElement('style');
        s.textContent = `#vt_overlay { position:fixed; top: """+str(cfg['pill_y'])+"""px; right: """+str(cfg['pill_x'])+"""px; z-index:9999999; } #vt_pill { background:rgba(255,0,0,0.8); border:2px solid white; border-radius:15px; width:50px; height:12px; transition: 0.2s; overflow:hidden; box-shadow:0 0 15px red; cursor:pointer; } #vt_pill:hover { width:150px; height:165px; background:#1a1a1a; cursor:default; } #vt_handle { width:25px; height:4px; background:white; border-radius:10px; margin: 2px auto; cursor: move; } #vt_box { opacity:0; display:flex; flex-direction:column; } #vt_pill:hover #vt_box { opacity:1; } .vt_i { padding:10px 15px; color:#eee; font-size:12px; cursor:pointer; font-family:sans-serif; } .vt_i:hover { background:#333; } #vt_log_m { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); width:80%; height:70%; background:#000; border:1px solid #333; z-index:9999999; color:#0f0; font-family:monospace; display:none; flex-direction:column; padding:15px; }`;
        document.head.appendChild(s); document.body.appendChild(div);
        
        let isDragging = false, sx, sy, sR, sT;
        const handle = document.getElementById('vt_handle');
        handle.onmousedown = (e) => { isDragging = true; sx = e.clientX; sy = e.clientY; sR = parseInt(div.style.right); sT = parseInt(div.style.top); e.preventDefault(); };
        document.onmousemove = (e) => { if (!isDragging) return; div.style.right = (sR + (sx - e.clientX)) + 'px'; div.style.top = (sT + (e.clientY - sy)) + 'px'; };
        document.onmouseup = () => { if (isDragging) { isDragging = false; pywebview.api.save_pos(parseInt(div.style.right), parseInt(div.style.top)); } };

        document.getElementById('vt_s').onclick = () => pywebview.api.go_google();
        document.getElementById('vt_m').onclick = () => pywebview.api.do_magic();
        document.getElementById('vt_e').onclick = () => pywebview.api.go_manager();
        document.getElementById('vt_l').onclick = () => pywebview.api.show_logs();
        
        const m = document.createElement('div'); m.id='vt_log_m'; 
        setHTML(m, `<div>LOGS <button onclick="this.parentElement.parentElement.style.display='none'" style="float:right;background:red;color:white;border:none;cursor:pointer;padding:2px 10px;">X</button></div><div id="vt_log_t" style="flex:1;overflow:auto;margin-top:10px;white-space:pre-wrap;"></div>`);
        document.body.appendChild(m);
    })();
    """

class Api:
    def __init__(self): self._w = None
    def _nav(self, fn, *args): threading.Timer(0.15, fn, args).start()
    def go_google(self): self._nav(self._w.load_url, "https://google.com")
    def go_home(self): self._nav(self._w.load_url, "https://youtube.com")
    def go_manager(self): self._nav(lambda: self._w.load_html(generate_manager_html()))
    def open_ext_url(self, url): self._nav(self._w.gui.load_url, url, self._w.uid)   
    def save_pos(self, x, y): save_config(x, y)
    def show_logs(self):
        txt = "\\n".join(APP_LOGS).replace("'", "\\'").replace('"', '\\"').replace('\n', '\\n')
        self._w.evaluate_js(f"document.getElementById('vt_log_t').innerText = '{txt}'; document.getElementById('vt_log_m').style.display='flex';")
    def delete_ext(self, folder):
        p = os.path.join(EXT_DIR, folder)
        if os.path.exists(p): shutil.rmtree(p); self.go_manager()
    def do_magic(self):
        u = self._w.get_current_url()
        match = re.search(r'detail/.*?/([a-z]{32})', u) or re.search(r'([a-z]{32})', u)
        if not match: return
        ext_id = match.group(1)
        try:
            dl = f"https://google.com{ext_id}%26uc"
            data = urllib.request.urlopen(urllib.request.Request(dl, headers={'User-Agent': 'Mozilla/5.0'})).read()
            with zipfile.ZipFile(io.BytesIO(data[data.find(b'PK\x03\x04'):])) as z: z.extractall(os.path.join(EXT_DIR, ext_id))
            self._w.destroy(); os.execl(sys.executable, sys.executable, *sys.argv)
        except: pass

def init_app():
    if os.path.exists(INTERNAL_EXT_DIR): shutil.rmtree(INTERNAL_EXT_DIR, ignore_errors=True)
    os.makedirs(INTERNAL_EXT_DIR, exist_ok=True)
    paths = []
    if os.path.exists(EXT_DIR):
        for item in os.listdir(EXT_DIR):
            src = os.path.join(EXT_DIR, item); root = find_manifest(src)
            if root:
                dest = os.path.join(INTERNAL_EXT_DIR, item); shutil.copytree(root, dest); MIRRORED[item] = dest
                paths.append(f'"{get_short_path(dest)}"')
    if paths:
        log(f"Mirrored {len(paths)} extensions.")
        os.environ["WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS"] = f"--load-extension={','.join(paths)} --enable-browser-extensions --allow-file-access-from-files"

def install_hooks():
    try:
        from webview.platforms import edgechromium as ec
        from System import Action
        from System.Threading.Tasks import Task
        from Microsoft.Web.WebView2.Core import CoreWebView2Environment, CoreWebView2EnvironmentOptions, CoreWebView2BrowserExtension
    except Exception as e:
        log(f"Hooks unavailable: {e}")
        return

    ec.CoreWebView2Environment = CoreWebView2Environment
    ec.CoreWebView2EnvironmentOptions = CoreWebView2EnvironmentOptions

    try:
        src = textwrap.dedent(inspect.getsource(ec.EdgeChrome.__init__))
        old = "self.webview.EnsureCoreWebView2Async(None)"
        if old not in src:
            log("Env patch skipped: anchor not found")
        else:
            new = "\n    ".join([
                "_opts = CoreWebView2EnvironmentOptions()",
                "_opts.AreBrowserExtensionsEnabled = True",
                "_opts.AdditionalBrowserArguments = props.AdditionalBrowserArguments",
                "def _vt_ensure(task):",
                "    self.webview.EnsureCoreWebView2Async(task.Result)",
                "CoreWebView2Environment.CreateAsync(props.BrowserExecutableFolder, props.UserDataFolder, _opts).ContinueWith(Action[Task[CoreWebView2Environment]](_vt_ensure), self.syncContextTaskScheduler)",
            ])
            ns = {}
            exec(compile(src.replace(old, new, 1), "<vt_env_patch>", "exec"), ec.__dict__, ns)
            ec.EdgeChrome.__init__ = ns["__init__"]
    except Exception as e:
        log(f"Env patch failed: {e}")
        return

    original = ec.EdgeChrome.on_webview_ready

    def on_ready(self, sender, args):
        original(self, sender, args)
        if not args.IsSuccess:
            log(f"WebView2 init failed: {args.InitializationException}")
            return
        core = sender.CoreWebView2
        log(f"WebView2 runtime {core.Environment.BrowserVersionString}")
        try:
            ui = get_injected_ui()
            boot = "(function(){if(window.top!==window)return;var go=function(){" + ui + "};if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',go);}else{go();}})();"
            core.AddScriptToExecuteOnDocumentCreatedAsync(boot)
        except Exception as e:
            log(f"Pill script registration failed: {e}")
        core.ProcessFailed += lambda s, a: log(f"Process failed: {a.ProcessFailedKind} {a.Reason}")
        core.NavigationCompleted += lambda s, a: None if a.IsSuccess else log(f"Navigation failed: {a.WebErrorStatus}")
        pending = [len(MIRRORED)]

        def make_cb(folder):
            def cb(task):
                try:
                    EXT_IDS[folder] = task.Result.Id
                    log(f"Extension loaded: {folder} -> {task.Result.Id} name={task.Result.Name} enabled={task.Result.IsEnabled}")
                except Exception as e:
                    log(f"Extension failed: {folder}: {e!r}")
                pending[0] -= 1
                if pending[0] == 0:
                    def audit(t):
                        try:
                            for ext in t.Result:
                                known = ext.Id in EXT_IDS.values()
                                log(f"Installed extension: {ext.Id} name={ext.Name} known={known}")
                                if not known:
                                    ext.RemoveAsync()
                        except Exception as e:
                            log(f"Extension audit failed: {e!r}")
                        core.Reload()
                    core.Profile.GetBrowserExtensionsAsync().ContinueWith(Action[Task](audit), self.syncContextTaskScheduler)
            return cb

        for folder, path in MIRRORED.items():
            try:
                core.Profile.AddBrowserExtensionAsync(path).ContinueWith(
                    Action[Task[CoreWebView2BrowserExtension]](make_cb(folder)),
                    self.syncContextTaskScheduler,
                )
            except Exception as e:
                log(f"Extension add error: {folder}: {e}")
                pending[0] -= 1

    ec.EdgeChrome.on_webview_ready = on_ready

def main():
    init_app()
    install_hooks()
    sys.excepthook = lambda t, v, tb: log("".join(traceback.format_exception(t, v, tb)))
    threading.excepthook = lambda a: log("".join(traceback.format_exception(a.exc_type, a.exc_value, a.exc_traceback)))
    threading.Thread(target=show_splash, daemon=True).start()
    api = Api(); window = webview.create_window('ViewTube', url='https://youtube.com', width=1280, height=720, js_api=api)
    api._w = window
    window.events.loaded += lambda: window.evaluate_js(get_injected_ui())
    webview.settings['REMOTE_DEBUGGING_PORT'] = 9222
    webview.start(private_mode=False, storage_path=USER_DATA_DIR)

if __name__ == '__main__':
    main()
