import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { renderEnIndex } from './build/en-index'
import { messages } from './src/i18n/messages'

// Emite en/index.html con la vista previa en inglés a partir del index.html ya procesado
const enIndex = (): Plugin => ({
  name: 'en-index',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const index = bundle['index.html']
    if (index?.type !== 'asset') this.error('en-index: falta index.html en el bundle')
    this.emitFile({ type: 'asset', fileName: 'en/index.html', source: renderEnIndex(String(index.source), messages.en.meta) })
  },
})

export default defineConfig({
  plugins: [vue(), enIndex()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
