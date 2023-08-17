<template>
    <el-dialog title="分配角色" :visible="showRoleDialog" @close="$emit('update:showRoleDialog',false)">
        <el-checkbox-group v-model="roleIds">
            <el-checkbox
         
             v-for="item in roleList"
             :key="item.id"
            :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
            <el-button >取 消</el-button>
            <el-button type="primary" @click="btnOk">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import {getEnabledRoles,assignRole} from '@/api/role'
import {getEmployeeDetail} from '@/api/employee'
export default{
    props:{
        showRoleDialog:{
            type:Boolean,
            default:false
        },
        currentEmployeeId:{
            type:Number,
            default:null
        }
    },
    data() {
        return {
            roleList: [],
            roleIds:[]
        }
    },
    created(){
     this.getEnableList()
    },
    methods:{
      async getEmployeeDetail(){
       let res= await getEmployeeDetail(this.currentEmployeeId)
       console.log(res)
       this.roleIds=res.roleIds
       console.log(this.roleIds,"roleisd")
      },
      async getEnableList(){
         let res=await getEnabledRoles()
         console.log(res)
         this.roleList = res
        },
     async btnOk(){
           await assignRole({
             id:this.currentEmployeeId,
             roleIds:this.roleIds
           })
           this.$message.success("分配角色成功")
           this.$emit('update:showRoleDialog',false)
     }
    }
}
</script>