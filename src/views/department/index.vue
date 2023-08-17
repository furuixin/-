<template>
    <div>
        <el-tree :data="data" :props="defaultProps" :default-expand-all="true">
            <template v-slot="{ data }">
                <el-row style="width:100%;height:100%;" type="flex" align="center" justify="space-between">
                    <el-col>{{ data.name }}</el-col>
                    <el-col :span="6">
                        <span class="tree-manager">{{ data.managerName }}</span>
                        <el-dropdown @command="operateDept($event, data.id)">
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                                <el-dropdown-item command="del">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </template>
        </el-tree>
        <addDept ref="addDept" :showDialog.sync="showDialog" @updatedeptment="getDepartment" :currentnodeid="currentNodeId">
        </addDept>
    </div>
</template>
<script>

import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index.js'
import addDept from './components/add-dept.vue'
export default {
    components: {
        addDept
    },
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            showDialog: false,
            currentNodeId: null
        }
    },
    created() {
        this.getDepartment()
    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            this.data = transListToTreeData(res, 0)
        },
        operateDept(type, id) {
            if (type === 'add') {
                this.showDialog = true
                this.currentNodeId = id
            } else if (type === 'edit') {
                this.showDialog = true
                this.currentNodeId = id
                this.$nextTick(() => {
                    this.$refs.addDept.getDepartmentDetail()
                })


            }
        },
    }
}
</script>

<style lang="scss" scoped>
.tree-manager {
    width: 80px;
    display: inline-block;
    margin: 10px;
}

.el-dropdown-link {
    cursor: pointer;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>