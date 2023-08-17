<template>
  <div>
    <MyTable :data="list" :tableColumns="tableColumns"></MyTable>

    <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total"
      layout="prev, pager, next" @current-change="changePage" />
    <addPermission :showPermisonDialog.sync="showPermisonDialog"></addPermission>

  </div>
</template>

<script>
import { getRoleList, updateRole } from '@/api/role'
import addPermission from './components/add-permission.vue'
import MyTable from '@/components/MyTable/index'
export default {
  name: 'Role',
  components: { addPermission, MyTable },
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
            label: "启用",
            type: "state"
          },
          {
            prop: "description",
            label: "描述"
          },
        ],
        caozuo: [
          {
            label: "分配权限",
            fn: (id) => { console.log("分配权限", id) }
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