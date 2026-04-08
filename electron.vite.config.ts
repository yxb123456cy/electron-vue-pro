import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any,
      Components({
        resolvers: [ElementPlusResolver()]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    ],
    css: {
      preprocessorOptions: {
        scss: {}
      }
    }
  }
})
