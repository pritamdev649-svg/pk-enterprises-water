@echo off
cd /d "%~dp0"
set "PATH=E:\Ruby33-x64\bin;E:\Ruby33-x64\msys64\ucrt64\bin;E:\Ruby33-x64\msys64\usr\bin;%PATH%"
echo ========================================================
echo  PK Enterprises Water - Rails 8 Development Server
echo ========================================================
start "" http://localhost:3000
ruby bin/rails server -p 3000 -b 0.0.0.0
pause
