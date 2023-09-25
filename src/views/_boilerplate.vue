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
    NH3 关于 wikitext
  template(#quiz)
    NP 请使用 wikitext 完成以下小测验：
</template>

<script setup lang="ts">
const title = ``
const defaultValue = ``
const exampleAnswer = ``
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
