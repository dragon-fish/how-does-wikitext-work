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
  checkIsEntryPage() {
    return (
      this.mwConfig.wgCanonicalSpecialPageName === 'Blankpage' &&
      this.mwConfig.wgTitle.endsWith('/WikitextMagicBook')
    )
  }

  static autoMount(options: MagicBookOptions) {
    return new Promise((resolve, reject) => {
      options.mw.hook('wikipage.content').add(($container) => {
        const root = $container.get(0)
        const book = new WikitextMagicBook(root, options)
        if (book.checkIsEntryPage()) {
          book.mount()
          resolve(book)
        } else {
          reject(new Error('Not entry page'))
        }
      })
    })
  }
}

WikitextMagicBook.autoMount({
  mw: window.mw,
})
