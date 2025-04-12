import subprocess
import sys
import os

MAIN_SCRIPT = "C:\Users\harshada\Downloads\XenZify\model\ocr_process\main.py"
CLASSIFY_SCRIPT = "C:\Users\harshada\Downloads\XenZify\model\ocr_process\classify.py"

def run_script(script_path):
    print(f"\n--- Running {script_path} ---")
    try:
        result = subprocess.run(
            [sys.executable, script_path],
            check=True,
            text=True
        )
        print(f" {script_path} completed successfully.")
    except subprocess.CalledProcessError as e:
        print(f" Error running {script_path}:\n{e}")
        sys.exit(1)

def main():
    run_script(MAIN_SCRIPT)
    run_script(CLASSIFY_SCRIPT)
    print("All steps completed!")

if __name__ == "__main__":
    main()
