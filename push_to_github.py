import os
import sys
import subprocess
import tempfile
import shutil
import logging
import re
from datetime import datetime

SOURCE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_LOG = os.path.join(tempfile.gettempdir(), f"push_to_github_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log")

logger = logging.getLogger("push_to_github")
logger.setLevel(logging.DEBUG)
file_handler = logging.FileHandler(TEMP_LOG, encoding="utf-8")
file_handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
logger.addHandler(file_handler)
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(logging.Formatter("%(message)s"))
console_handler.setLevel(logging.INFO)
logger.addHandler(console_handler)

def finalize_log():
    logs_dir = os.path.join(SOURCE_DIR, "logs")
    try:
        os.makedirs(logs_dir, exist_ok=True)
        dest = os.path.join(logs_dir, os.path.basename(TEMP_LOG))
        shutil.copy2(TEMP_LOG, dest)
        logger.info(f"Log copied to: {dest}")
        return dest
    except Exception as e:
        logger.error(f"Failed to copy log to source dir: {e}")
        return TEMP_LOG

def fail(message, code=1):
    logger.error(message)
    dest = finalize_log()
    logger.error(f"FAILED. Log path: {dest}")
    sys.exit(code)

def print_progress(percent, elapsed_seconds, done, total, prefix=""):
    bar_len = 30
    filled = int(bar_len * percent // 100)
    bar = "#" * filled + "." * (bar_len - filled)
    counts = f" {done}/{total}" if total else ""
    sys.stdout.write(f"\r{prefix}[{bar}] {percent}%{counts} | {elapsed_seconds:.0f}s elapsed   ")
    sys.stdout.flush()

def run(cmd, cwd=SOURCE_DIR, check=True):
    logger.debug(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    logger.debug(f"stdout: {result.stdout.strip()}")
    logger.debug(f"stderr: {result.stderr.strip()}")
    if check and result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return result

def check_git_available():
    try:
        run(["git", "--version"])
    except Exception:
        fail("git is not installed or not on PATH.")

def ensure_repo():
    if not os.path.isdir(os.path.join(SOURCE_DIR, ".git")):
        logger.info("No git repository found in this folder. Initializing.")
        run(["git", "init"])
        run(["git", "checkout", "-b", "main"])
    else:
        logger.info("Existing git repository detected.")

def get_remotes():
    result = run(["git", "remote", "-v"])
    remotes = {}
    for line in result.stdout.splitlines():
        parts = line.split()
        if len(parts) >= 2:
            remotes[parts[0]] = parts[1]
    return remotes

def is_reachable_repo(url):
    result = run(["git", "ls-remote", url], check=False)
    return result.returncode == 0

def select_repo():
    remotes = get_remotes()
    if remotes:
        logger.info("Detected remotes:")
        names = list(remotes.keys())
        for i, name in enumerate(names, 1):
            marker = " (default — Enter selects this)" if i == 1 else ""
            logger.info(f"  {i}. {name} -> {remotes[name]}{marker}")
        logger.info(f"  {len(names)+1}. Enter a new repository URL")
        choice = input("Select repository: ").strip()
        if not choice:
            choice = "1"
        if choice.isdigit() and 1 <= int(choice) <= len(names):
            name = names[int(choice) - 1]
            url = remotes[name]
            logger.info("Verifying repository access.")
            if not is_reachable_repo(url):
                fail(f"Could not reach repository: {url}")
            return name, url
    while True:
        url = input("Enter GitHub repository URL: ").strip()
        if not url:
            logger.info("No URL entered. Try again.")
            continue
        logger.info("Verifying repository access.")
        if not is_reachable_repo(url):
            logger.info(f"Could not reach '{url}'. Check the URL and permissions, then try again.")
            continue
        break
    if "origin" in remotes:
        run(["git", "remote", "set-url", "origin", url])
        return "origin", url
    run(["git", "remote", "add", "origin", url])
    return "origin", url

def get_local_branches():
    result = run(["git", "branch", "--list"])
    branches = []
    for line in result.stdout.splitlines():
        name = line.replace("*", "").strip()
        if name:
            branches.append(name)
    return branches

def get_remote_branches(remote_name):
    try:
        result = run(["git", "ls-remote", "--heads", remote_name])
    except Exception as e:
        logger.info(f"Could not list remote branches: {e}")
        return []
    branches = []
    for line in result.stdout.splitlines():
        match = re.search(r"refs/heads/(.+)$", line)
        if match:
            branches.append(match.group(1))
    return branches

def select_branch(remote_name):
    local_branches = get_local_branches()
    remote_branches = get_remote_branches(remote_name)
    all_branches = sorted(set(local_branches) | set(remote_branches))
    while True:
        if all_branches:
            logger.info("Detected branches:")
            for i, name in enumerate(all_branches, 1):
                marker = " (default — Enter selects this)" if i == 1 else ""
                logger.info(f"  {i}. {name}{marker}")
            logger.info(f"  {len(all_branches)+1}. Enter a new branch name")
            choice = input("Select branch: ").strip()
            if not choice:
                choice = "1"
            if choice.isdigit() and 1 <= int(choice) <= len(all_branches):
                return all_branches[int(choice) - 1]
            if choice.isdigit() and int(choice) == len(all_branches) + 1:
                branch = input("Enter new branch name: ").strip()
            else:
                branch = choice
        else:
            branch = input("Enter branch name: ").strip()
        if not branch or not is_valid_branch_name(branch):
            logger.info("Invalid or empty branch name. Try again.")
            continue
        if branch in all_branches:
            return branch
        confirm = input(f"Branch '{branch}' does not exist. Create it? (y/n): ").strip().lower()
        if confirm == "y":
            return branch
        logger.info("Branch creation declined. Choose again.")

def is_valid_branch_name(name):
    result = run(["git", "check-ref-format", "--branch", name], check=False)
    return result.returncode == 0

def check_no_unmerged_paths():
    status = run(["git", "status", "--porcelain"])
    unmerged = [line for line in status.stdout.splitlines() if line.startswith("UU") or line.startswith("AA") or line.startswith("DD")]
    if unmerged:
        logger.error("Unresolved merge conflicts detected in your working directory:")
        for line in unmerged:
            logger.error(f"  - {line.strip()}")
        logger.info("\nHow would you like to handle these unresolved conflicts?")
        logger.info("  1. Abort and resolve manually (default)")
        logger.info("  2. OVERRIDE and keep MY local version (--ours)")
        choice = input("Select option: ").strip()
        if choice == "2":
            run(["git", "checkout", "--ours", "."])
            run(["git", "add", "."])
            logger.info("Conflicts resolved by keeping local versions.")
        else:
            fail("Resolve these files manually, then re-run this script.")


def checkout_branch(branch):
    check_no_unmerged_paths()
    current_branch = run(["git", "branch", "--show-current"], check=False).stdout.strip()
    
    if current_branch == branch:
        return
        
    local_branches = get_local_branches()
    if branch not in local_branches:
        run(["git", "checkout", "-b", branch])
        return
        
    logger.info(f"\nYou are currently on branch '{current_branch}', but selected '{branch}'.")
    logger.info("To guarantee your local files are NEVER modified by other branches,")
    logger.info(f"the local '{branch}' branch will be forcefully set to your exact current state.")
    run(["git", "checkout", "-B", branch])
    logger.info(f"Switched to '{branch}' (Current working directory kept exactly as is).")

def get_changed_files():
    run(["git", "add", "-A"])
    result = run(["git", "diff", "--cached", "--name-status", "--no-renames", "-z"])
    parts = result.stdout.split("\0")
    new_files = []
    modified_files = []
    deleted_files = []
    index = 0
    while index + 1 < len(parts):
        code = parts[index]
        path = parts[index + 1]
        index += 2
        if code.startswith("A"):
            new_files.append(path)
        elif code.startswith("D"):
            deleted_files.append(path)
        else:
            modified_files.append(path)
    return new_files, modified_files, deleted_files


def get_changed_files_legacy():
    run(["git", "add", "-A"])
    status = run(["git", "status", "--porcelain"])
    new_files = []
    modified_files = []
    for line in status.stdout.splitlines():
        if not line.strip():
            continue
        code = line[:2]
        path = line[3:].strip()
        if "->" in path:
            path = path.split("->")[-1].strip()
        if "A" in code:
            new_files.append(path)
        elif "M" in code:
            modified_files.append(path)
    return new_files, modified_files

def stage_and_commit(message):
    status = run(["git", "status", "--porcelain"])
    if not status.stdout.strip():
        logger.info("No changes to commit.")
        return False
    fd, msg_path = tempfile.mkstemp(prefix="commit_msg_", suffix=".txt", text=True)
    os.close(fd)
    try:
        with open(msg_path, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(message)
        logger.debug(f"Commit message written to {msg_path} ({len(message)} chars)")
        run(["git", "commit", "--cleanup=whitespace", "-F", msg_path])
    finally:
        try:
            os.remove(msg_path)
        except OSError as e:
            logger.debug(f"Could not remove temp commit message file: {e}")
    return True

def sync_with_remote(remote_name, branch):
    logger.info("Checking for remote changes before pushing.")
    fetch_result = run(["git", "fetch", remote_name], check=False)
    if fetch_result.returncode != 0:
        logger.info("Could not fetch remote — skipping pre-push sync check.")
        return False

    remote_ref = f"{remote_name}/{branch}"
    verify = run(["git", "rev-parse", "--verify", "--quiet", remote_ref], check=False)
    if verify.returncode != 0:
        logger.info("Remote branch does not exist yet — nothing to sync.")
        return False

    local_sha = run(["git", "rev-parse", branch]).stdout.strip()
    remote_sha = run(["git", "rev-parse", remote_ref]).stdout.strip()
    if local_sha == remote_sha:
        return False

    behind = run(["git", "rev-list", "--count", f"{branch}..{remote_ref}"]).stdout.strip()
    if behind == "0":
        return False

    logger.info(f"Remote has {behind} commit(s) you don't have locally.")
    logger.info("How would you like to proceed?")
    logger.info("  1. Rebase local commits on top of remote changes (default)")
    logger.info("  2. OVERRIDE remote branch with my local code (Force Push)")
    logger.info("  3. Abort")
    choice = input("Select option: ").strip()
    if choice == "2":
        logger.info("Will force push to override remote branch.")
        return True
    elif choice == "3":
        fail("Aborted by user.")
        
    logger.info("Rebasing before push...")
    result = run(["git", "rebase", remote_ref], check=False)
    if result.returncode != 0:
        rebase_output = (result.stdout or "") + (result.stderr or "")
        run(["git", "rebase", "--abort"], check=False)
        if "CONFLICT" not in rebase_output:
            fail("Rebase failed for a non-conflict reason: " + rebase_output.strip())
        resolve_conflict_interactively(remote_name, branch, remote_ref)
        return False
    logger.info("Rebased local commits on top of remote changes.")
    return False

def merge_unrelated(remote_name, remote_ref, strategy):
    result = run(["git", "merge", "-X", strategy, remote_ref, "-m",
                   f"Merge {remote_ref}, prefer {strategy}", "--allow-unrelated-histories"], check=False)
    if result.returncode != 0:
        fail(f"Merge with -X {strategy} failed unexpectedly: {result.stderr.strip() or result.stdout.strip()}")

def resolve_conflict_interactively(remote_name, branch, remote_ref):
    logger.info("Rebase failed — local and remote history conflict (often because the local")
    logger.info("repo was freshly initialized and shares no commit history with the remote).")
    logger.info("How should conflicting lines be resolved?")
    logger.info("  1. Keep MY local version wherever content conflicts")
    logger.info("  2. Keep the REMOTE version wherever content conflicts")
    logger.info("  3. Abort — I'll resolve manually in a terminal")
    choice = input("Select option: ").strip()
    if choice == "1":
        merge_unrelated(remote_name, remote_ref, "ours")
    elif choice == "2":
        merge_unrelated(remote_name, remote_ref, "theirs")
    else:
        fail(
            "Resolve manually: open a terminal in "
            f"{SOURCE_DIR} and run 'git pull --rebase {remote_name} {branch}', "
            "fix the conflicts, then re-run this script."
        )

def push_with_progress(remote_name, branch, force=False):
    cmd = ["git", "push", "-u", remote_name, branch, "--progress"]
    if force:
        cmd.insert(2, "--force")
    logger.debug(f"Running: {' '.join(cmd)}")
    start_time = datetime.now()
    process = subprocess.Popen(cmd, cwd=SOURCE_DIR, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, bufsize=1)
    last_percent = 0
    last_done = 0
    last_total = 0
    buffer = ""
    captured_lines = []

    def process_line(line):
        nonlocal last_percent, last_done, last_total
        captured_lines.append(line)
        logger.debug(line.strip())
        elapsed = (datetime.now() - start_time).total_seconds()
        match = re.search(r"(\d{1,3})%\s*\((\d+)/(\d+)\)", line)
        if match:
            percent = min(100, int(match.group(1)))
            done = int(match.group(2))
            total = int(match.group(3))
            if percent >= last_percent:
                print_progress(percent, elapsed, done, total, prefix="Pushing: ")
                last_percent = percent
                last_done = done
                last_total = total
        elif re.search(r"\d{1,3}%", line):
            match2 = re.search(r"(\d{1,3})%", line)
            percent = min(100, int(match2.group(1)))
            if percent >= last_percent:
                print_progress(percent, elapsed, last_done, last_total, prefix="Pushing: ")
                last_percent = percent

    while True:
        char = process.stdout.read(1)
        if not char:
            break
        if char in ("\r", "\n"):
            if buffer.strip():
                process_line(buffer)
            buffer = ""
        else:
            buffer += char

    if buffer.strip():
        process_line(buffer)

    process.wait()
    total_elapsed = (datetime.now() - start_time).total_seconds()
    if last_percent < 100:
        print_progress(100, total_elapsed, last_total, last_total, prefix="Pushing: ")
    sys.stdout.write("\n")
    if process.returncode != 0:
        full_output = "\n".join(captured_lines)
        large_files = re.findall(r"error: File (.+?) is ([\d.]+ ?[KMG]?i?B); this exceeds GitHub's file size limit", full_output)
        if large_files:
            logger.error("Push rejected: these files exceed GitHub's 100 MB file size limit:")
            for path, size in large_files:
                logger.error(f"  - {path} ({size})")
            raise RuntimeError(
                "Push rejected — files over GitHub's 100 MB limit (listed above). "
                "Untrack them with 'git rm --cached <file>', add them to .gitignore, "
                "or set up Git LFS with 'git lfs track \"<pattern>\"' before pushing again."
            )
        raise RuntimeError(f"git push exited with code {process.returncode}")
    logger.info(f"Push finished in {total_elapsed:.1f}s. Done.")

ECHO_LIMIT = 50

def echo_commit_message(message):
    logger.info("----------------------------------------")
    lines = message.splitlines()
    shown = 0
    skipped = 0
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("[new]") or stripped.startswith("[modified]") or stripped.startswith("[deleted]"):
            if shown >= ECHO_LIMIT:
                skipped += 1
                continue
            shown += 1
        logger.info(line)
    if skipped:
        logger.info(f"  ... and {skipped} more file entries (full list is in the commit message)")
    logger.info("----------------------------------------")

def reset_instrument():
    logger.info("WARNING: This will delete the local .git repository and all script logs.")
    confirm = input("Are you sure you want to reset? (y/n): ").strip().lower()
    if confirm == "y":
        git_dir = os.path.join(SOURCE_DIR, ".git")
        logs_dir = os.path.join(SOURCE_DIR, "logs")
        import stat
        def on_rm_error(func, path, exc_info):
            os.chmod(path, stat.S_IWRITE)
            func(path)
        if os.path.exists(git_dir):
            shutil.rmtree(git_dir, onerror=on_rm_error)
            logger.info("Deleted .git directory.")
        if os.path.exists(logs_dir):
            shutil.rmtree(logs_dir, onerror=on_rm_error)
            logger.info("Deleted logs directory.")
        logger.info("Instrument data reset successfully.")
        return True
    else:
        logger.info("Reset cancelled.")
        return False

def main():
    logger.info(f"Source folder: {SOURCE_DIR}")
    logger.info(f"Temp log: {TEMP_LOG}")
    
    logger.info("\nOptions:")
    logger.info("  1. Push to GitHub (Default)")
    logger.info("  2. Reset instrument data (delete .git and logs)")
    choice = input("Select option: ").strip()
    if choice == "2":
        if reset_instrument():
            return
            
    check_git_available()
    try:
        ensure_repo()
        run(["git", "config", "core.longpaths", "true"])
        remote_name, remote_url = select_repo()
        branch = select_branch(remote_name)
        checkout_branch(branch)
        new_files, modified_files, deleted_files = get_changed_files()
        message = input("Enter commit message: ").strip()
        if not message:
            lines = [f"(this is automated commit message) {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"]
            if new_files or modified_files or deleted_files:
                lines.append("")
                lines.append(f"Repository: {remote_url}")
                for path in new_files:
                    lines.append(f"  [new] {path}")
                for path in modified_files:
                    lines.append(f"  [modified] {path}")
                for path in deleted_files:
                    lines.append(f"  [deleted] {path}")
            message = "\n".join(lines)
            logger.info("No commit message entered — using automated message:")
            echo_commit_message(message)
        committed = stage_and_commit(message)
        force_push = sync_with_remote(remote_name, branch)
        push_with_progress(remote_name, branch, force=force_push)
    except Exception as e:
        fail(f"Error: {e}")
    dest = finalize_log()
    logger.info(f"Done. Remote: {remote_url} Branch: {branch} Log path: {dest}")

if __name__ == "__main__":
    main()
    input("\nPress Enter to close...")
