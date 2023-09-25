import type { Plugin, ResolvedConfig } from 'vite'

let viteConfigs!: ResolvedConfig
export function viteLibAutoload(): Plugin {
  return {
    apply: 'build',
    enforce: 'post',
    name: 'vite-lib-autoload',
    configResolved(config) {
      viteConfigs = config
    },
    async generateBundle(_, bundle) {
      // Utils
      const getFileUrl = (file = '') =>
        `${viteConfigs.base.replace(/\/$/, '')}/${file.replace(/^\//, '')}`
      const loaders = {
        js: {
          loaded: false,
          name: 'loadScript',
          loader: function loadScript(src = '') {
            const s = document.createElement('script')
            s.type = 'module'
            s.src = src
            document.body.append(s)
          }
            .toString()
            .replace(/\n(\s*)?/g, ' '),
        },
        css: {
          loaded: false,
          name: 'loadStyle',
          loader: function loadStyle(href = '') {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = href
            document.head.append(link)
          }
            .toString()
            .replace(/\n(\s*)?/g, ' '),
        },
      }
      function generateLoaderCode(type: keyof typeof loaders, file: string) {
        const url = new URL(import.meta.url)
        const filePath = getFileUrl(file)
        url.pathname = filePath
        const helper = loaders[type]
        let code = `/** @file ${type} ${file} */ ${helper.name}(new URL('${filePath}', import.meta.url).href);`
        if (!helper.loaded) {
          code = `/** @loader ${type} */ ${helper.loader}\n${code}`
          helper.loaded = true
        }
        return '\n' + code
      }

      // @ts-ignore
      const entry = Object.values(bundle).find((item) => item?.isEntry)!
      const entryFileName = entry.fileName
      // @ts-ignore
      // prettier-ignore
      const cssEntries = Array.from(entry.viteMetadata?.importedCss || []).map((i) => bundle[i])
      const cssEntryFileNames = cssEntries.map((i) => i.fileName)

      console.info(entry.fileName, cssEntryFileNames)

      const entrySource = `/**
 * Vite bundle assets autoloader
 * @author Dragon-Fish <xiaoyujundesu@outlook.com>
 */
;(function () {
${generateLoaderCode('js', entry.fileName)}
${cssEntryFileNames.map((i) => generateLoaderCode('css', i)).join('')}
})()
`

      // Add new entry file
      bundle[Math.random().toString(32).substring(2) + '.js'] = {
        name: 'main.js',
        fileName: 'main.js',
        source: entrySource,
        type: 'asset',
        needsCodeReference: false,
      }

      // Remove index.html
      delete bundle['index.html']
    },
  }
}
