<template>
    <el-table :data="data">
        <el-table-column v-if="tableColumns.ind" type="index" label="序号" width="180">
        </el-table-column>
        <el-table-column v-for="(item, index) in tableColumns.columns" :prop="item.prop" :label="item.label" width="180">
            <template v-slot="{ row }">
                <div v-if="item.type === 'state'">
                    {{ row[item.prop] === 1 ? '启用' : "未启用" }}
                </div>
                <span v-else>{{ row[item.prop] }}</span>

            </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
            <template v-slot="{ row }">
                <el-button size="mini" type="text" v-for="item in tableColumns.caozuo"
                    @click="item.fn(row.id)">{{ item.label }}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: []
        },
        tableColumns: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style lang="scss" scoped></style>