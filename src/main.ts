import 'virtual:uno.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

interface MagicBookOptions {
  mw: typeof mw
}

export class WikitextMagicBook {
  app = createApp(App)
  pinia = createPinia()
  router = router

  constructor(
    public root: HTMLElement,
    public options: MagicBookOptions
  ) {
    this.app.use(this.pinia)
    this.app.use(this.router)
  }
  get mwConfig() {
    return this.options.mw.config.get()
  }

  mount() {
    const title = 'Wikitext Magic Book'
    document.title = title
    document.querySelector('h1')!.innerText = title
    return this.app.mount(this.root)
  }
}

if (import.meta.env.DEV) {
  const root = document.getElementById('mw-content-text')!
  const mw = window.mw
  const conf = mw.config.get()

  if (
    conf.wgCanonicalSpecialPageName === 'Blankpage' &&
    conf.wgTitle.endsWith('/WikitextMagicBook')
  ) {
    const book = new WikitextMagicBook(root, {
      mw: window.mw,
    })
    book.mount()
  } else {
    console.warn('Wikitext Magic Book is not enabled.')
  }
} else {
  mw.hook('wikipage.content').add(($container) => {
    const root = $container[0]
    const book = new WikitextMagicBook(root, {
      mw: window.mw,
    })
    book.mount()
  })
}
