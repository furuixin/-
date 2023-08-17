<template>
    <el-cascader :value="value" size="mini" :options="treeData" :props="props" separator="-"
        @change="changeValue"></el-cascader>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index.js'
export default {
    props: {
        value: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            treeData: [],
            props: {
                label: "name",
                value: "id"
            }
        }
    },
    created() {
        this.getDepartment()
    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            this.treeData = transListToTreeData(res, 0)
        },
        changeValue(v) {
            if (v.length > 0) {
                this.$emit('input', v[v.length - 1])
            } else {
                this.$emit('input', null)
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>