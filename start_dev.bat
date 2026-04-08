@echo off
:: 设置字符编码为 UTF-8，解决乱码
chcp 65001 > nul

echo ==========================================
echo    正在启动新能源外贸站前端项目...
echo ==========================================

:: 检查 npm 是否存在（即 Node.js 是否已安装）
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 npm，请先安装 Node.js（包含 npm）后再运行此脚本！
    pause
    exit /b 1
)

:: 检查 node_modules 是否存在，如果不存在则通过镜像源安装依赖
if not exist "node_modules\" (
    echo [系统提示] 检测到未安装依赖，正在通过镜像源快速安装...
    :: 临时使用腾讯云镜像源（也可改为淘宝源：https://registry.npmmirror.com）
    call npm install --registry=https://mirrors.cloud.tencent.com/npm/
)

echo [系统提示] 正在启动预览页面...
:: 启动本地开发服务器
start http://localhost:3000
npm run dev

pause
