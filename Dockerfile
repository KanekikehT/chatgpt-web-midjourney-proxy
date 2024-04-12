FROM node:18.19-alpine

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY ./service/package.json ./service/pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制剩余的后端服务文件到容器中
COPY ./service ./

# 从前端构建阶段复制构建产物到 public 目录
COPY ./dist ./public

EXPOSE 3002

CMD ["pnpm", "run", "prod"]
