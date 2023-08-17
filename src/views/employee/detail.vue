<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="userForm" :model="userInfo" label-width="220px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input size="mini" v-model="userInfo.username" class="inputW" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <el-input size="mini" disabled v-model="userInfo.workNumber" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input size="mini" class="inputW" v-model="userInfo.mobile" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <selectTree v-model="userInfo.departmentId"></selectTree>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select size="mini" class="inputW" v-model="userInfo.formOfEmployment">
                  <el-option label="正式" :value="1"></el-option>
                  <el-option label="非正式" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="userInfo.timeOfEntry"
                  class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker v-model="userInfo.correctionTime" size="mini" type="date" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <imageUpload v-model="userInfo.staffPhoto"></imageUpload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="12" style="margin-left:220px">
              <el-button size="mini" type="primary" @click="btnOk">保存更新</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>
  
<script>
import selectTree from './components/select-tree.vue'
import { addEmployee, getEmployeeDetail } from '@/api/employee'
import imageUpload from './components/image-upload.vue'
export default {
  components: { selectTree, imageUpload },
  data() {
    const timeValidate = (rule, value, callback) => {
      if (this.userInfo.timeOfEntry) {
        if (new Date(this.userInfo.timeOfEntry) > new Date(value)) {
          callback(new Error("转正时间不能小于入职时间"))
          return
        }
      }
      callback()
    }
    return {
      userInfo: {
        correctionTime: "",
        departmentId: null,
        formOfEmployment: "",
        mobile: "",
        staffPhoto: "",
        timeOfEntry: "",
        username: "",
        workNumber: ""
      },
      rules: {
        correctionTime: [
          { required: true, message: "不能位空", trigger: "blur" },
          {
            validator: timeValidate
          }

        ], 
        formOfEmployment: [{ required: true, message: "不能位空", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确", trigger: "blur" }
        ],//
        timeOfEntry: [{ required: true, message: "不能位空", trigger: "blur" }],
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 6, message: "姓名是1~6位" }
        ]
      }
    }
  },
  created() {
    this.$route.params.id && this.getEmployeeDetail()
  },
  methods: {
    async btnOk() {
      await addEmployee(this.userInfo)
      this.$message.success("新增员工成功")
      this.$router.push('/employee')
    },
    async getEmployeeDetail() {
      let res = await getEmployeeDetail(this.$route.params.id)
      console.log(res)
      this.userInfo = res
    }
  }
}
</script>
  
<style scoped lang="scss">
.edit-form {
  background: #fff;
  padding: 20px;

  .inputW {
    width: 380px
  }
}
</style>