<template>
  <el-dialog :visible="showPermisonDialog">
    <el-tree :data="list" :props="defaultProps" show-checkbox default-expand-all :default-checked-keys="permIds"
      ref="permRef">
    </el-tree>
  </el-dialog>
</template>
<script>
import { getPermission } from '@/api/permisson'
import { transListToTreeData } from '@/utils/index'
export default {
  props: {
    showPermisonDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permIds: [],
      list: [],
      defaultProps: {
        label: 'name',
        children: "children"
      }
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    async getPermission() {
      let res = await getPermission()
      this.list = transListToTreeData(res, 0)
    }
  }
}
</script>