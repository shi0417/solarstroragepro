# SolarStoragePro 服务器部署脚本（PowerShell）
# 在服务器 C:\solarstoragepro 下执行

param(
  [string]$Branch = "main"
)

$ErrorActionPreference = "Continue"
$APP_DIR = "C:\solarstoragepro"
$PORT = 3100
$LOG_FILE = "$APP_DIR\deploy.log"

# 开始记录日志
"===== 部署开始 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') =====" | Tee-Object -FilePath $LOG_FILE -Append

# 1. 清理占用 3000 端口的进程
Write-Host "===== 1. 清理端口 $PORT 占用 ====="
$portLine = netstat -ano | findstr ":$PORT " | findstr LISTENING | Select-Object -First 1
if ($portLine) {
  $tokens = $portLine -split '\s+'
  $targetPid = $tokens[-1]
  if ($targetPid -and $targetPid -match '^\d+$') {
    Write-Host "发现端口 $PORT 被 PID $targetPid 占用，准备停止..."
    try {
      Stop-Process -Id $targetPid -Force -ErrorAction Stop
      Write-Host "已停止 PID $targetPid"
    } catch {
      Write-Host "停止 PID $targetPid 失败: $_"
    }
  }
} else {
  Write-Host "端口 $PORT 未被占用"
}

# 2. 停止 Apache 并启动 Nginx（80 端口 → 反代 3100）
Write-Host "===== 2. 停止 Apache 并启动 Nginx (80 -> 3100) ====="
$apacheService = Get-Service -Name "Apache2.4" -ErrorAction SilentlyContinue
if ($apacheService) {
  try {
    Stop-Service -Name "Apache2.4" -Force -ErrorAction Stop
    Write-Host "Apache2.4 已停止"
  } catch {
    Write-Host "Apache2.4 停止失败: $_"
  }
} else {
  Write-Host "Apache2.4 服务未找到"
}

if (Test-Path "C:\nginx-1.26.3\nginx.exe") {
  & "C:\nginx-1.26.3\nginx.exe" -s stop 2>&1 | Out-Null
  Start-Sleep -Seconds 2
  & "C:\nginx-1.26.3\nginx.exe"
  Write-Host "Nginx 已启动（80 端口反代 3100）"
} else {
  Write-Host "Nginx 未找到，跳过"
}

# 3. 拉取代码
Write-Host "===== 3. 拉取代码 ====="
if (Test-Path "$APP_DIR\.git") {
  Set-Location $APP_DIR
  git fetch origin $Branch
  git reset --hard origin/$Branch
} else {
  if (Test-Path $APP_DIR) {
    Remove-Item -Recurse -Force $APP_DIR
  }
  git clone -b $Branch https://github.com/shi0417/solarstroragepro.git $APP_DIR
  Set-Location $APP_DIR
}

# 4. 确认 .env.local
Write-Host "===== 4. 确认 .env.local ====="
if (-not (Test-Path "$APP_DIR\.env.local")) {
  Write-Host "错误：$APP_DIR\.env.local 不存在，请手动放置！" -ForegroundColor Red
  exit 1
} else {
  Write-Host ".env.local 已存在"
}

# 5. 安装依赖（国内镜像）
Write-Host "===== 5. 安装依赖 ====="
npm config set registry https://registry.npmmirror.com
npm ci --no-audit --no-fund 2>&1 | Tee-Object -FilePath $LOG_FILE -Append | Select-Object -Last 20

# 6. 构建（限制内存）
Write-Host "===== 6. 构建 ====="
$env:NODE_OPTIONS = "--max-old-space-size=1536"
npm run build 2>&1 | Tee-Object -FilePath $LOG_FILE -Append | Select-Object -Last 40

if (-not (Test-Path "$APP_DIR\.next\standalone\server.js")) {
  Write-Host "构建失败：未找到 $APP_DIR\.next\standalone\server.js" -ForegroundColor Red
  exit 1
}

# 7. 复制静态资源到 standalone
Write-Host "===== 7. 复制 standalone 资源 ====="
if (Test-Path "$APP_DIR\.next\standalone") {
  Copy-Item -Recurse -Force "$APP_DIR\public" "$APP_DIR\.next\standalone\public"
  New-Item -ItemType Directory -Force "$APP_DIR\.next\standalone\.next" | Out-Null
  Copy-Item -Recurse -Force "$APP_DIR\.next\static" "$APP_DIR\.next\standalone\.next\static"
  Write-Host "standalone 资源复制完成"
}

# 8. PM2 启动
Write-Host "===== 8. PM2 启动 ====="
$PM2_CMD = "C:\Users\Administrator\AppData\Roaming\npm\pm2.cmd"
if (-not (Test-Path $PM2_CMD)) {
  Write-Host "PM2 未找到: $PM2_CMD" -ForegroundColor Red
  exit 1
}

Set-Location "$APP_DIR\.next\standalone"
$env:PORT = "$PORT"

# 先删除旧的 PM2 进程（如果存在）
& $PM2_CMD delete solarstoragepro 2>&1 | Out-Null

# 启动
& $PM2_CMD start server.js --name solarstoragepro -- --port $PORT
& $PM2_CMD save

Write-Host "PM2 已启动，端口 $PORT"

Write-Host "===== 完成 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ====="
