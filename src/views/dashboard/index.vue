<template>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'sidebar',
      // 读取头像
      'avatar',
      //读取用户名
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>  .username {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    background-color: yellow;
    color: pink;
    margin-right: 5px;
  }
</style>
