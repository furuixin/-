<template>
  <div id="app">
    123 {{ $store.state.ArrM.num }}---123
    <button @click="fn">按钮</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    fn() {
      this.$store.dispatch('ArrM/changeNumAsync')
    }
  }
}
</script>
