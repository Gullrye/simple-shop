import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 10086, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据项目实际情况配置
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api/', '/')
      }
    }
  }
})
