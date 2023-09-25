<template lang="pug">
ReplPlayground(
  :title='title',
  :default-value='defaultValue',
  :example-answer='exampleAnswer',
  :on-init='onInit',
  :before-submit='beforeSubmit',
  :check-answer='checkAnswer'
)
  template(#doc)
    NH3 段落
    NP 在 wikitext 中，段落之间以一个空行来分隔。因此，在输入完一段文字后，按下两次回车键就能够开始新的一段文字了。
    NTable
      tr
        th 源代码
        th 显示效果
      tr
        td: pre {{ '第一段文字\n\n第二段文字' }}
        td
          p 第一段文字
          p 第二段文字
    NH3 换行
    NP 另起一个段落是制造换行的好办法，不过有时候你只是想在句子里简单的插入一个换行，而不想在两行字之间产生很大的空隙，那么你可以试试在你希望换行的位置插入一个&lt;br&gt;标签。
    NTable
      tr
        th 源代码
        th 显示效果
      tr
        td: pre {{ '第一行文字<br>第二行文字' }}
        td
          p 第一行文字<br>第二行文字
  template(#quiz)
    NP 你可以改正下面的代码，让它显示出正确的段落和换行效果吗：
</template>

<script setup lang="ts">
const title = `段落和换行`
const defaultValue = `第一段文字
第二段文字

----

第一行文字	第二行文字`
const exampleAnswer = `第一段文字

第二段文字

----

第一行文字<br>第二行文字`
async function onInit() {}
async function beforeSubmit(wikitext: string) {
  return wikitext
}
async function checkAnswer(wikitext: string, html: string) {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  return true
}
</script>

<style scoped lang="sass"></style>
