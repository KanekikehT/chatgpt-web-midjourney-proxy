# # 使用具体的 Node.js 版本
# FROM node:18.19-alpine

# # 安装 pnpm，这里可以选择不指定版本，如果 Node.js 已经是兼容版本
# RUN npm install -g pnpm

# WORKDIR /app

# # 假设你的后端服务文件在本地的 service 目录中
# # 并且前端构建产物在本地的 dist 目录中

# # 复制后端服务目录到容器中
# COPY ./service ./

# # 从前端构建阶段复制构建产物到 public 目录
# COPY ./dist ./public

# EXPOSE 3002

# # 假设你的启动脚本在 package.json 中定义，并且位于 service 目录
# CMD ["pnpm", "run", "prod"]

# build front-end
FROM node:lts-alpine AS frontend

RUN npm install pnpm -g

WORKDIR /app

COPY ./package.json /app

COPY ./pnpm-lock.yaml /app

RUN pnpm install

COPY . /app

RUN pnpm run build

# build backend
FROM node:lts-alpine as backend

RUN npm install pnpm -g

WORKDIR /app

COPY /service/package.json /app

COPY /service/pnpm-lock.yaml /app

RUN pnpm install

COPY /service /app

RUN pnpm build

# service
FROM node:lts-alpine

RUN npm install pnpm -g

WORKDIR /app

COPY /service/package.json /app

COPY /service/pnpm-lock.yaml /app

RUN pnpm install --production && rm -rf /root/.npm /root/.pnpm-store /usr/local/share/.cache /tmp/*

COPY /service /app

COPY --from=frontend /app/dist /app/public

COPY --from=backend /app/build /app/build

EXPOSE 3002

CMD ["pnpm", "run", "prod"]
