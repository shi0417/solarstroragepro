# SolarStoragePro 阿里云 ECS 部署方案
# 服务器: i-f8zf5nm5p2d1byyb28mb (8.155.40.233, Windows Server 2025, 2C2G)

## 架构
访问者 → DNS (备案后) → 8.155.40.233:443 → Nginx 反代 → 127.0.0.1:3000 → Next.js standalone + PM2

## 部署步骤
1. 安装 Node.js 20 LTS + npm
2. 安装 Git for Windows
3. 安装 PM2 (npm i -g pm2)
4. 安装 Nginx (Windows zip 版)
5. 拉取 GitHub 仓库到 C:\solarstoragepro
6. 配置 .env.local
7. npm ci && npm run build (standalone 输出)
8. PM2 启动 standalone server (port 3000)
9. Nginx 配置反代 80/443
10. 验证 http://8.155.40.233:3000

## 注意
- 域名未备案，先用 IP:3000 验证
- 备案通过后再配置 DNS + SSL
- 2GB 内存紧张：需要设置 NODE_OPTIONS=--max-old-space-size=1536 控制构建内存
- 构建在服务器上进行需要内存充足，备选方案：本地构建后上传 .next 目录
