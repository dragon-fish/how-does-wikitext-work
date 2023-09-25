<template lang="pug">
div
  ReplPlayground(
    title='模板',
    :on-init='onInit',
    :check-answer='checkAnswer',
    :example-answer='exampleAnswer',
    :default-value='""'
  )
    template(#doc)
      h3 模板是什么
      p(v-text='whatIs')
    template(#quiz)
      p 请在输入框中使用 wikitext 来实现下面的效果，文字颜色为 red：
      p: span(style='color: red') 红颜色
</template>

<script setup lang="ts">
import {} from 'vue'

const whatIs = `简单来说，如果某一段内容或代码需要被大量使用（比如页顶提示、人物信息等），为了方便这些内容被引用和编修，模板就应运而生了。给这段内容取一个名字，然后需要用到这些内容的时候直接调用这个模板即可。当需要这些内容的时候，也只需要在这个模板里改动，那些调用了模板的条目也会随着模板变更，这样就省下了大量的维护时间。如果你在实战一中对某个条目进行了内容扩充或者笔误修正，那么你可能会注意到形如“{{内容}}”的代码，这一段代码这就是模板，在条目源代码中“{{模板名字|模板参数}}”（用一对双大括号将模板的标题括起来，并用管道符“|”分隔模板名称和模板参数）就是模板的基本形式。`

const userName = mw.config.get('wgUserName')
const exampleAnswer = `{{Color|red|红颜色}}`
async function onInit() {
  // await mwApi.postWithEditToken({
  //   action: 'edit',
  //   title: `User:${userName}/wmb/template/Echo`,
  //   text: 'hello, {{{name}}}',
  // })
  // return true
}
function checkAnswer(wikitext: string, html: string) {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const colorSpan = dom.querySelector<HTMLSpanElement>('span[style]')
  console.info('checkAnswer', wikitext, html, colorSpan?.style.color)
  return !!(
    colorSpan &&
    colorSpan.style.color === 'red' &&
    /\{\{color/gi.test(wikitext)
  )
}
</script>

<style scoped lang="sass"></style>
