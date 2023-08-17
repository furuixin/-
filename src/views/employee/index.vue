<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input v-model="queryparams.keyword" @input="changeValue" style="margin-bottom:10px" type="text"
          prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <el-tree ref="deptTree" :data="dept" node-key="id" :props="defaultProps" default-expand-all
          :expand-on-click-node="false" highlight-current @current-change="selectNode">
        </el-tree>
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button v-permission="'employee'" size="mini" type="primary"
            @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportExcelEmploy">excel导出</el-button>
        </el-row>
        <el-table :data="list">
          <el-table-column prop="staffPhoto" label="头像" align="center">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto"></el-avatar>
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" align="center"></el-table-column>
          <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
          <el-table-column prop="workNumber" label="工号" align="center"></el-table-column>
          <el-table-column prop="formOfEmployment" label="聘用形式" align="center">
            <template v-slot="{ row }">
              <span>{{ row.formOfEmployment === 1 ? '正式' : '非正式' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" align="center"></el-table-column>
          <el-table-column prop="timeOfEntry" label="入职事件" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template v-slot="{ row }">
              <el-button @click="$router.push(`/employee/detail/${row.id}`)">查看</el-button>
              <el-button @click="btnRole(row)">角色</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <importExcel :showExcelDialog.sync="showExcelDialog" @uploadSuccess="getEmployeeList"></importExcel>
    <addRole :showRoleDialog.sync="showRoleDialog" :currentEmployeeId="currentEmployeeId" ref="roleRef"></addRole>
  </div>
</template>
  
<script>
import addRole from './components/addRole.vue'
import { getDepartment } from '@/api/department'
import { getEmployeeList, exportEmployee } from '@/api/employee'
import { transListToTreeData } from '@/utils/index'
import { saveAs } from 'file-saver';
import importExcel from './components/import-excel.vue'
export default {
  name: 'Employee',
  components: { importExcel, addRole },
  data() {
    return {
      currentEmployeeId: null,
      showRoleDialog: false,
      showExcelDialog: false,
      dept: [],
      defaultProps: {
        'label': "name",
        "children": "children"
      },
      list: [],
      queryparams: {
        departmentId: null,
        page: 1,
        pagesize: 10,
        keyword: "",
      },
      timer: null

    }
  },
  created() {
    this.getDepartment()
    this.getEmployeeList()
  },
  methods: {
    async btnRole(row) {
      this.showRoleDialog = true
      this.currentEmployeeId = row.id
      await this.$nextTick()
      this.$refs.roleRef.getEmployeeDetail()
    },
    async getDepartment() {
      let res = await getDepartment()
      this.dept = transListToTreeData(res, 0)
      this.queryparams.departmentId = this.dept[0].id
      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.queryparams.departmentId)
      })
    },
    selectNode(node) {
      console.log(node, "node")
      this.queryparams.departmentId = node.id
      this.getEmployeeList()
    },
    async getEmployeeList() {
      let res = await getEmployeeList(this.queryparams)
      let { rows, total } = res
      this.list = rows
    },
    changeValue() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.queryparams.page = 1
        this.getEmployeeList()
      }, 300)

    },
    async exportExcelEmploy() {
      let res = await exportEmployee()
      console.log(res, "excel")
      saveAs(res, '员工信息表.xlsx')
    }
  }
}
</script>
  
<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;

  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }

  .right {
    flex: 1;
    padding: 20px;

    .opeate-tools {
      margin: 10px;
    }

    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>