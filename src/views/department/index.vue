<template>
    <!-- 组织架构 -->
    <div class='department'>
        <div class="department_content">
            <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
                <template slot-scope="{ node, data }">
                    <el-row type="flex" align="middle" justify="space-around" style="width: 100%;height: 40px">
                        <el-col :span="24">
                            <div>{{ data.name }}</div>
                        </el-col>
                        <el-col :span="24" style="width: 200px;">
                            <el-row type="flex" align="middle" justify="space-around">
                                <span class="tree-manager">{{ data.managerName }}</span>
                                <el-dropdown @command="addDept($event, data.id)">
                                    <span class="el-dropdown-link">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                                        <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                                        <el-dropdown-item command="del">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-tree>
        </div>
        <addDept :showDialog.sync="showDialog" :pid="currentNodeId" @updateDepartment="getDepartment()" ref="dialog">
        </addDept>
    </div>
</template>
 
<script>
import { getDepartment, delDepartment } from "@/api/department";
import {transListToTreeData} from '@/utils/transListToTreeData'
import addDept from './components/addDept.vue'
export default {
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            showDialog: false,//控制模态框开关
            currentNodeId: null,//记录父id
        }
    },
    components: {
        addDept
    },
    created() {
        this.getDepartment()
    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            console.log(res);
            this.data = transListToTreeData(res.data, 0)
        },
        async addDept(command, id) {
            if (command === 'add') {
                // 模态框显示
                this.showDialog = true
                this.currentNodeId = id
            } else if (command === 'edit') {
                // 打开模态框
                this.showDialog = true
                // 将行数据的id通过属性传给子组件
                this.currentNodeId = id
                // 因为prop接收是异步的，也就是这个函数还没结束时子组件是拿不到父id的
                this.$nextTick(() => {
                    this.$refs.dialog.getDepartmentDetail()
                })
                this.$nextTick
            } else {
                await delDepartment(id)
                this.getDepartment()
            }
        }
    }
}
</script>
 
<style lang="scss" scoped>
.department {
    min-height: calc(100vh - 80px);
    padding: 20px;
}

.department_content {
    padding: 30px 140px;
    font-size: 14px;
    background-color: #ffffff;
}

.tree-manager {
    width: 50px;
    margin: 10px;
    display: inline - block;
}
</style>