<template>
    <div>
       <h2 >匿名插槽</h2>
       <slot :n="name" :str="str" ></slot>
       <p>slot组件 是内容分发出口(占位符)</p>
       <slot name="two" :row="{name,str,n:8}"></slot>
    </div>
</template>

<script>
    export default {
        data(){
            return {
               name:"zs",
               str:"hello"
            }
         }
    }
</script>

<style lang="scss" scoped>

</style>