<template lang="pug">
div
  ReplPlayground(
    :title='title',
    :default-value='defaultValue',
    :example-answer='exampleAnswer',
    :on-init='onInit',
    :before-submit='beforeSubmit',
    :check-answer='checkAnswer'
  )
    template(#doc)
      NH3 关于字体样式
      NP 在 wikitext 中，可以用两个单引号 '' 包裹文字来表示斜体，三个单引号 ''' 包裹文字来表示粗体，五个单引号 ''''' 包裹文字来表示粗斜体。
      NH3 代码示例
      NTable
        tr
          th 源代码
          th 显示效果
        tr
          td: code ''斜体''
          td: i 斜体
        tr
          td: code '''粗体'''
          td: b 粗体
        tr
          td: code '''''粗斜体'''''
          td: i: b 粗斜体
    template(#quiz)
      NP 请使用 wikitext，让输入框中的文字拥有相对应三种样式：
      NP
        i 斜体
        | 、
        b 粗体
        | 、
        i: b 粗斜体
</template>

<script setup lang="ts">
const title = `第一节：基本文字样式`
const defaultValue = `斜体\n\n粗体\n\n粗斜体`
const exampleAnswer = `''斜体''\n\n'''粗体'''\n\n'''''粗斜体'''''`
async function onInit() {}
async function beforeSubmit(wikitext: string) {
  return wikitext
}
async function checkAnswer(wikitext: string, html: string) {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const bold = dom.querySelector('b')
  const italic = dom.querySelector('i')
  const boldItalic = dom.querySelector<HTMLElement>('i b, b i')
  const isGood = !!(
    bold &&
    italic &&
    boldItalic &&
    bold.innerText === '粗体' &&
    italic.innerText === '斜体' &&
    boldItalic.innerText === '粗斜体'
  )
  const isHacker = /<[bi]/.test(wikitext)
  if (isGood && isHacker) {
    return '嗯？没有审题哟~'
  }
  return isGood
}
</script>

<style scoped lang="sass"></style>
