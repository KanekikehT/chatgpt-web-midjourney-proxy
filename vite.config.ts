import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// 设置插件，包括静态文件复制和 PWA 配置
function setupPlugins(env) {
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
    // VitePWA({
    //   injectRegister: 'auto',
    //   manifest: {
    //     name: '',
    //     short_name: '',
    //     icons: [
    //       { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
    //       { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
    //     ],
    //   },
    // }),
  ]
}

// 配置文件主体
export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd())

  const version = new Date().getTime() // 使用时间戳作为版本号

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: setupPlugins(viteEnv),
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js', // 使用 hash 来管理静态资源
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
      __VERSION__: JSON.stringify(version), // 将版本号作为全局变量定义
    },
  }
})
