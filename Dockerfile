
# 使用 Node.js v16.14 的镜像
FROM node:16.14-alpine

# 设置工作目录
WORKDIR /app

# 设置 pnpm 使用淘宝镜像
RUN pnpm config set registry https://registry.npmmirror.com/

# 复制 package.json 和 pnpm-lock.yaml
COPY ./service/package.json ./service/pnpm-lock.yaml /app/

# 安装 pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --production && rm -rf /root/.npm /root/.pnpm-store /usr/local/share/.cache /tmp/*

# 复制项目文件
COPY ./service /app

# 其他设置和命令
