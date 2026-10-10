import os
import subprocess
import sys
import glob
import time
import shutil

# --- CONFIGURATION ---
APP_NAME = "ViewTube"
SCRIPT_FILE = "app.py"
SRC_DIR = "src"
DIST_DIR = "dist"

def set_working_directory():
    """Forces the script to run from its own folder."""
    script_path = os.path.abspath(__file__)
    script_dir = os.path.dirname(script_path)
    os.chdir(script_dir)
    return script_dir

def get_icon_path():
    """Scans src/ for a valid .ico file."""
    if os.path.exists(SRC_DIR):
        ico_files = glob.glob(os.path.join(SRC_DIR, "*.ico"))
        if ico_files:
            return ico_files[0] # Return the first valid .ico found
    return None

def run_build():
    work_dir = set_working_directory()
    print(f"\n[+] Working Directory: {work_dir}")
    print(f"[+] Initializing build for {APP_NAME}...")

    # 1. CLEANUP PREVIOUS BUILD
    if os.path.exists(DIST_DIR):
        try:
            shutil.rmtree(DIST_DIR)
            print("[+] Cleaned old 'dist' folder.")
        except Exception as e:
            print(f"[!] Warning: Could not clean 'dist' folder (File in use?): {e}")

    icon_path = get_icon_path()
    if icon_path:
        print(f" [OK] Icon linked: {icon_path}")
    else:
        print(" [INFO] No .ico found. Using default icon.")

    # 2. CONSTRUCT COMMAND (Using sys.executable ensures we use the correct Python)
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--noconsole",
        "--onefile",
        "--clean",
        "--name", APP_NAME,
        SCRIPT_FILE
    ]
    
    if icon_path:
        cmd.append(f"--icon={icon_path}")

    print("-----------------------------------------------------------")
    print("[+] Starting Compilation (Please Wait)...")
    print("-----------------------------------------------------------")

    # 3. RUN WITH REAL-TIME OUTPUT
    # We remove 'capture_output' so you see the logs scrolling!
    try:
        process = subprocess.run(cmd, text=True)
    except Exception as e:
        print(f"\n[CRITICAL ERROR] Failed to launch PyInstaller: {e}")
        return

    # 4. VERIFY RESULT
    exe_path = os.path.join(DIST_DIR, f"{APP_NAME}.exe")
    
    print("-----------------------------------------------------------")
    if os.path.exists(exe_path):
        file_size_mb = os.path.getsize(exe_path) / (1024 * 1024)
        print(f"""
    SUCCESS!
    =======================================================
    [✓] Generated: {exe_path}
    [✓] Size:      {file_size_mb:.2f} MB
    =======================================================
    """)
    else:
        print(f"""
    BUILD FAILED / FILE MISSING
    =======================================================
    The script finished, but '{APP_NAME}.exe' is not in the 'dist' folder.
    
    POSSIBLE CAUSES:
    1. ANTIVIRUS: Windows Defender likely quarantined it immediately.
       -> Check 'Virus & threat protection' > 'Protection history'.
    2. ERROR: Look at the text output above for 'Error' or 'Traceback'.
    =======================================================
    """)

if __name__ == "__main__":
    # Auto-install PyInstaller if missing
    try:
        import PyInstaller
        run_build()
    except ImportError:
        print("Installing PyInstaller...")
        subprocess.run([sys.executable, "-m", "pip", "install", "pyinstaller"])
        run_build()
    
    input("\n[>] Press Enter to close...")
