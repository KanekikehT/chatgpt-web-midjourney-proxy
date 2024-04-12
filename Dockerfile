FROM node:lts-alpine

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 假设你的后端服务文件在本地的 service 目录中
# 并且前端构建产物在本地的 dist 目录中

# 复制后端服务目录到容器中
COPY ./service ./

# 从前端构建阶段复制构建产物到 public 目录
COPY ./dist ./public

EXPOSE 3002

# 假设你的启动脚本在 package.json 中定义，并且位于 service 目录
CMD ["pnpm", "run", "prod"]
