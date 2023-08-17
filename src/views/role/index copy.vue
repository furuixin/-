<template>
  <div>
    <el-table :data="list">
      <el-table-column prop="name" align="center" width="200" label="角色">
        <template v-slot="{ row }">
          <el-input v-model="row.editRow.name" v-if="row.isEdit" />
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" align="center" width="200" label="启用">
        <template v-slot="{ row }">
          <el-switch v-if="row.isEdit" v-model="row.editRow.state" :inactive-value="0" :active-value="1"></el-switch>
          <span v-else> {{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="description" align="center" label="描述">
        <template v-slot="{ row }">
          <el-input v-if="row.isEdit" v-model="row.editRow.description" />
          <span v-else>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="{ row }">
          <template v-if="row.isEdit">
            <el-button size="mini" type="text" @click="btnEditOk(row)"> 确定</el-button>
            <el-button size="mini" type="text" @click="row.isEdit = false">取消</el-button>
          </template>
          <template v-else>
            <el-button size="mini" type="text" @click="btnPermission(row.id)">分配权限</el-button>
            <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total"
      layout="prev, pager, next" @current-change="changePage" />
    <addPermission :showPermisonDialog.sync="showPermisonDialog"></addPermission>

  </div>
</template>

<script>
import { getRoleList, updateRole } from '@/api/role'
import addPermission from './components/add-permission.vue'
export default {
  name: 'Role',
  components: { addPermission },
  data() {
    return {
      tableColumns: {
        ind: true,
        columns: [
          {
            prop: "name",
            label: "角色"
          },
          {
            prop: "state",
            label: "启用"
          },
          {
            prop: "description",
            label: "描述"
          },
        ],
        caozuo: [
          {
            label: "分配权限",
            fn: () => { console.log("分配权限") }
          },
          {
            label: "编辑",
            fn: () => { console.log("编辑") }
          },
          {
            label: "删除",
            fn: () => { console.log("删除") }
          }
        ]
      },
      showPermisonDialog: false,
      currentRoleId: null,
      list: [],
      pageParams: {
        page: 1,
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    btnPermission(id) {
      this.showPermisonDialog = true
      this.currentRoleId = id
    },
    async getRoleList() {
      const res = await getRoleList(this.pageParams)
      this.list = res.rows
      this.pageParams.total = res.total
      this.list.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditOk(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateRole({ ...row.editRow, id: row.id })
        this.$message.success("更新角色成功")
        Object.assign(row, { ...row.editRow, isEdit: false })
      } else {
        this.$message.warning("角色名称和描述不能为空")
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>