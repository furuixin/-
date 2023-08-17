<template>
    <div>
       <Myb>
          <template v-slot:two ="scope">
              <a href="">two的内容{{ scope }}</a>
          </template>
             <template #default="obj">
              <p>one的内容{{ obj }}</p>
          </template>
       </Myb>
       <Myb>
         <template slot="two" slot-scope="scope">
            {{ scope }}
         </template>
       </Myb>
    </div>
</template>

<script>
import Myb from './Myb.vue';
    export default {
         components:{Myb},
         data(){
            return {
                num:10
            }
         }
    }
</script>

<style lang="scss" scoped>

</style>