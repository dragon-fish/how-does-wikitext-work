<template lang="pug">
NConfigProvider(preflight-style-disabled)
  NMessageProvider(:max='5')
    NNotificationProvider(:max='5')
      slot
</template>

<script setup lang="ts">
import {} from 'vue'
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  darkTheme,
} from 'naive-ui'
</script>

<style scoped lang="sass"></style>
