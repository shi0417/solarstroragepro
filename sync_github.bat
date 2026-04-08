@echo off
chcp 65001 > nul
setlocal EnableExtensions EnableDelayedExpansion

echo.
echo ================================
echo  SolarStoragePro 一键同步 GitHub
echo ================================
echo.

set "REMOTE_URL=https://github.com/shi0417/solarstroragepro.git"

REM 1) 初始化仓库（如未初始化）
if exist ".git\" (
  echo [信息] 已检测到 Git 仓库：.git
) else (
  echo [信息] 未检测到 .git，开始初始化仓库...
  git init
  if errorlevel 1 (
    echo [错误] git init 失败，请确认已安装 Git 且已加入 PATH。
    goto :END
  )
)

REM 2) 确保主分支为 main
echo [信息] 设置主分支为 main...
git branch -M main
if errorlevel 1 (
  echo [错误] 设置 main 分支失败。
  goto :END
)

REM 3) 关联远程 origin（如已存在则更新 URL）
echo [信息] 配置远程仓库 origin...
git remote get-url origin > nul 2>&1
if errorlevel 1 (
  git remote add origin "%REMOTE_URL%"
  if errorlevel 1 (
    echo [错误] 添加远程 origin 失败。
    goto :END
  )
) else (
  git remote set-url origin "%REMOTE_URL%"
  if errorlevel 1 (
    echo [错误] 更新远程 origin URL 失败。
    goto :END
  )
)
echo [信息] origin 已指向：%REMOTE_URL%

REM 4) 提示输入提交备注（为空则使用时间戳）
echo.
set "COMMIT_MSG="
set /p COMMIT_MSG=请输入提交备注（直接回车则使用时间戳）^> 

if "%COMMIT_MSG%"=="" (
  for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "Get-Date -Format 'yyyyMMdd-HHmmss'"`) do set "COMMIT_MSG=%%i"
  echo [信息] 未输入备注，使用时间戳：!COMMIT_MSG!
)

REM 5) 检查是否有变更
git status --porcelain > nul 2>&1
for /f %%A in ('git status --porcelain ^| find /c /v ""') do set "CHANGES=%%A"
if "!CHANGES!"=="0" (
  echo.
  echo [信息] 当前没有需要提交的变更（工作区干净）。
  echo [信息] 将直接尝试推送 main（如远端需要首次推送可继续）。
  goto :PUSH_ONLY
)

REM 6) add / commit
echo.
echo [信息] 正在执行：git add .
git add .
if errorlevel 1 (
  echo [错误] git add 失败。
  goto :END
)

echo [信息] 正在执行：git commit -m "!COMMIT_MSG!"
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
  echo [错误] git commit 失败。常见原因：未配置 user.name/user.email 或无可提交内容。
  goto :END
)

:PUSH_ONLY
REM 7) push
echo.
echo [信息] 正在执行：git push -u origin main
git push -u origin main
if errorlevel 1 (
  echo [错误] git push 失败。请检查：
  echo         - 是否已登录/有权限访问仓库
  echo         - 远程仓库是否存在
  echo         - 网络是否可用
  goto :END
)

echo.
echo [成功] 同步完成：已推送到 origin/main

:END
echo.
pause
endlocal

