import { defineConfig, presetUno, presetAttributify } from 'unocss'
import extractorPug from '@unocss/extractor-pug'

const PROD =
  process.env.NODE_ENV === 'production' &&
  process.env.BUILD_ENV !== 'development'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'uno:',
    }),
  ],
  extractors: [extractorPug()],
  rules: [['dev-only', PROD ? {} : { display: 'none' }]],
})
