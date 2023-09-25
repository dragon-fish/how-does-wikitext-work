'use strict'
;(() => {
  const mw = window.mw
  if (!mw) return console.warn('mw is not defined')
  const conf = mw.config.get()
  if (
    conf.wgCanonicalSpecialPageName === 'Blankpage' &&
    conf.wgTitle.endsWith('/WikitextMagicBook')
  ) {
    import('./main.js')
  }
})()
