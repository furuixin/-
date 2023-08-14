<!-- 详情页的部门选择器 -->
<template>
    <el-cascader :options="treeData" :props="defaultProps" separator="-">
    </el-cascader>
</template>
<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/transListToTreeData'
export default {
    data() {
        return {
            treeData: [],
            defaultProps: {
                label: 'name',
                value: 'id'
            }
        }
    },
    created() {
        this.getDepartment()
    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            console.log(res);
            this.treeData = transListToTreeData(res.data, 0)
        }
    }
}
</script>