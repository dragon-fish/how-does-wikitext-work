<template lang="pug">
NCard(:title='title')
  .playground
    .documentation
      slot(name='doc')
    NSpin.editor(:show='isLoading')
      .flex.flex-column
        NH3 小练习
        slot(name='quiz')
        NInput.w-full.h-24vh(v-model:value='userInput', type='textarea')
        NButtonGroup(style='width: 100%')
          NButton.flex-1(@click='handleSubmit', type='primary') 提交答案
          NButton.flex-1(@click='handleReset', type='warning') 重置
          NButton.flex-1(@click='handleHelpMe', type='info') 帮帮我！
    NSpin.preview(:show='isLoading')
      h3 测验结果：
        NTag(size='large', :type='resultType') {{ statusText }}
      iframe.w-full.h-40vh(frameborder='0', :srcdoc='resultHTML')
</template>

<script setup lang="ts">
import {} from 'vue'

type ResultType = 'default' | 'success' | 'error'

const props = defineProps<{
  title: string
  exampleAnswer: string
  defaultValue: string
  onInit?: () => Awaitable<any>
  beforeSubmit?: (wikitext: string) => Awaitable<string>
  checkAnswer?: (wikitext: string, html: string) => Awaitable<boolean>
}>()
const emit = defineEmits<{}>()

const userInput = ref('')
const resultHTML = ref('')
const lastSubmit = ref('')
const isLoading = ref(false)
const resultType = ref<ResultType>('default' as ResultType)
const statusText = computed(() => {
  switch (resultType.value) {
    case 'default':
      return '等待提交……'
    case 'success':
      return '太棒了！'
    case 'error':
      return '啊哦，好像不太对哦~'
  }
})

async function handleHelpMe() {
  if (!props.exampleAnswer) return
  userInput.value = props.exampleAnswer
  return handleSubmit()
}
async function handleSubmit() {
  if (
    lastSubmit.value === userInput.value ||
    isLoading.value ||
    !userInput.value
  ) {
    return
  }
  isLoading.value = true
  try {
    const wikitext =
      (await props?.beforeSubmit?.(userInput.value)) || userInput.value
    const data = await mwApi.post({
      action: 'parse',
      title: 'API',
      text: wikitext,
      pst: 1,
      disablelimitreport: 1,
      disableeditsection: 1,
      preview: 1,
      disabletoc: 1,
    })
    lastSubmit.value = userInput.value
    const html = data.parse.text
    resultHTML.value = html
    const good = await props?.checkAnswer?.(wikitext, html)
    resultType.value = good ? 'success' : 'error'
  } finally {
    isLoading.value = false
  }
}

async function handleReset() {
  isLoading.value = true
  userInput.value = props.defaultValue || ''
  resultHTML.value = ''
  resultType.value = 'default'
  try {
    await props?.onInit?.()
  } finally {
    isLoading.value = false
  }
}

handleReset()
</script>

<style scoped lang="sass">
.playground
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: auto auto
  grid-template-areas: "documentation editor" "documentation preview"
  grid-gap: 1rem
  // padding: 1rem

.documentation
  grid-area: documentation
  background-color: #f8f8f8
  padding: 1rem

.editor
  grid-area: editor

.preview
  grid-area: preview

.status-label
  &[data-status='0']
    opacity: 0.75
  &[data-status='1']
    color: green !important
  &[data-status='2']
    color: red !important
</style>
