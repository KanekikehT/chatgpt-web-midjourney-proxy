import path from 'path'
import type { PluginOption } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'

function setupPlugins(env: ImportMetaEnv): PluginOption[] {
  return [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: `${path.resolve(__dirname, './src/static/mitf')}/[!.]*`,
          dest: './mitf/',
        },
      ],
    }),
    VitePWA({
      injectRegister: 'auto',
      manifest: {
        name: 'chatGPT-MJ',
        short_name: 'chatGPT-MJ',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ]
}

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

  const version = new Date().getTime() // 获取当前时间戳作为版本号

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: setupPlugins(viteEnv),
    server: {
      host: '0.0.0.0',
      port: 1002,
      open: false,
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace('/api/', '/'),
        },
        '/mjapi': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true,
        },
        '/uploads': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true,
        },
        '/openapi': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
      },
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
    define: {
      __VERSION__: JSON.stringify(version), // 定义全局版本号变量，可以在项目中任何位置使用
    },
  }
})
