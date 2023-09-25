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
    NH3 模板是什么
    NP 简单来说，如果某一段内容或代码需要被大量使用（比如页顶提示、人物信息等），为了方便这些内容被引用和编修，模板就应运而生了。给这段内容取一个名字，然后需要用到这些内容的时候直接调用这个模板即可。当需要这些内容的时候，也只需要在这个模板里改动，那些调用了模板的条目也会随着模板变更，这样就省下了大量的维护时间。如果你在实战一中对某个条目进行了内容扩充或者笔误修正，那么你可能会注意到形如“<code>{{ tl('模板名称') }}</code>”的代码，这一段代码这就是模板，在条目源代码中“<code>{{ tl('模板名称', '模板参数') }}</code>”（用一对双大括号将模板的标题括起来，并用管道符“<code>|</code>”分隔模板名称和模板参数）就是模板的基本形式。
  template(#quiz)
    NP 下面的 wikitext 使用了一个叫 {{ tl('Color') }} 的模板，让文字变成了红色（red）：
    NP: span(style='color: red') 红颜色
    NP 你可以试着使用这个模板让文字变成蓝色（blue）吗？就像这样：
    NP: span(style='color: blue') 蓝颜色
    NP 提示：使用 {{ tl('Color') }} 模板的第一个参数来指定颜色，第二个参数来指定文字内容。
</template>

<script setup lang="ts">
import { tl } from '@/utils/tl'

const title = `使用简单的模板`
const defaultValue = `{{Color|red|红颜色}}`
const exampleAnswer = `{{Color|blue|蓝颜色}}`
async function onInit() {}
async function beforeSubmit(wikitext: string) {
  return wikitext
}
async function checkAnswer(wikitext: string, html: string) {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const colorSpan = dom.querySelector<HTMLSpanElement>('span[style]')
  const isGood = !!(
    colorSpan &&
    colorSpan.style.color === 'blue' &&
    !!colorSpan.innerText.trim()
  )
  const isHacker = !/\{\{color/gi.test(wikitext) || /style=/gi.test(wikitext)
  if (isGood && isHacker) {
    return '嗯？没有审题哟~'
  }
  return isGood
}
</script>

<style scoped lang="sass"></style>
