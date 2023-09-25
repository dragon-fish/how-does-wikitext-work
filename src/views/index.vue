<template lang="pug">
ul
  li(v-for='route in router.options.routes', :key='route.path')
    RouterLink(:to='route') {{ route.path }}
</template>

<script setup lang="ts">
const router = useRouter()
</script>

<style scoped lang="sass"></style>
