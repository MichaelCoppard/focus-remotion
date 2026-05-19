@echo off
echo ================================================
echo  Restoring Claude settings and memory files...
echo ================================================
echo.

:: Create the .claude folders if they don't exist
mkdir "%USERPROFILE%\.claude\projects\C--Users-mcopp\memory" 2>nul

:: Restore memory files
echo Copying memory files...
xcopy /E /Y /I "%~dp0claude-backup\projects" "%USERPROFILE%\.claude\projects"

:: Restore settings
echo Copying settings...
copy /Y "%~dp0claude-backup\settings.json" "%USERPROFILE%\.claude\settings.json"
copy /Y "%~dp0claude-backup\settings.local.json" "%USERPROFILE%\.claude\settings.local.json"

echo.
echo ================================================
echo  Done! Claude memory and settings restored.
echo  You can now open Claude Code.
echo ================================================
echo.
pause
