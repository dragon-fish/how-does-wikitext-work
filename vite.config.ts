import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { viteLibAutoload } from './plugins/viteLibAutoload'

const PROD =
  process.env.NODE_ENV === 'production' &&
  process.env.BUILD_ENV !== 'development'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    UnoCSS(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      dirs: [
        'src/stores',
        'src/utils/**',
        'src/components/**',
        'src/models/**',
      ],
    }),
    Components({
      extensions: ['js', 'jsx', 'ts', 'tsx', 'vue', 'md'],
      dts: 'src/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
    Vue({}),
    viteLibAutoload(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    drop: PROD ? ['console'] : [],
  },
  server: {
    host: true,
    port: 1005,
  },
})
