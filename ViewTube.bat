@echo off
title ViewTube Launcher

:: Instant bypass if already initialized past the first launch
if exist .installed goto :launch

:: First-Time Check Setup Logic
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python not found. Please install Python.
    pause
    exit /b
)

python -c "import webview" >nul 2>nul
if %errorlevel% neq 0 (
    pip install pywebview --quiet
)

:: Create the persistent flag to skip all checks forever next time
echo true > .installed

:launch
:: Fire up ViewTube directly with absolutely zero check overhead
start "" /b pythonw app.py
exit
