<template>
    <!-- 组织架构 -->
    <div class='department'>
        <div class="department_content">
            <el-tree :data="data" node-key="id" default-expand-all>
                <template slot-scope="{ node, data }">
                    <el-row type="flex" align="middle" justify="space-around" style="width: 100%;height: 40px">
                        <el-col :span="24">
                            <div>{{ data.name }}</div>
                        </el-col>
                        <el-col :span="24" style="width: 200px;">
                            <el-row type="flex" align="middle" justify="space-around">
                                <span class="tree-manager">{{ data.managerName }}</span>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>添加子部门</el-dropdown-item>
                                        <el-dropdown-item>编辑部门</el-dropdown-item>
                                        <el-dropdown-item>删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-tree>
        </div>
    </div>
</template>
 
<script>
import { getDepartment, transListToTreeData } from "@/api/department";
export default {
    data() {
        return {
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
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
            this.data = transListToTreeData(res.data, 0)
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