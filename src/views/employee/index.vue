<template>
    <!-- 员工管理 -->
    <div class='employee'>
        <div class="employee_content">
            <div class="left">
                <el-input style="margin-bottom:10px" placeholder="请输入员工姓名全员搜索" size="small" prefix-icon="el-icon-search"
                    v-model="queryParams.keyword" @change="searchValue"></el-input>
                <el-tree node-key="id" ref="deptTree" :data="dept" :props="defaultProps" default-expand-all
                    :expand-on-click-node="false" :highlight-current="true" @current-change="selNode"></el-tree>
            </div>
            <div class="right">
                <el-row class="buttons" type="flex" justify="end">
                    <el-button type="primary" size="small">添加员工</el-button>
                    <el-button size="small" @click="importExcel">excel导入</el-button>
                    <el-button size="small" @click="downloadExcel">excel导出</el-button>
                </el-row>
                <el-table :data="list" :header-cell-style="{ 'background-color': '#f5f6f8' }">
                    <el-table-column label="头像">
                        <template #default="scope">
                            <el-avatar v-if="scope.row.staffPhoto" :src="scope.row.staffPhoto"
                                style="width: 30px;height: 30px;line-height: 30px;"></el-avatar>
                            <div v-else class="username">{{ scope.row.username.charAt(0) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="姓名"></el-table-column>
                    <el-table-column prop="mobile" label="手机号" sortable></el-table-column>
                    <el-table-column prop="workNumber" label="工号" sortable></el-table-column>
                    <el-table-column label="聘用形式">
                        <template #default="scope">
                            <span v-if="scope.row.formOfEmployment == 1">正式</span>
                            <span v-else>非正式</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="部门"></el-table-column>
                    <el-table-column prop="timeOfEntry" label="入职时间" sortable></el-table-column>

                    <el-table-column label="操作" fixed="right" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="$router.push(`/employee/detail/${scope.row.id}`)">查看</el-button>
                            <el-button type="text">角色</el-button>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row type="flex" justify="end" align="middle" style="height: 60px;">
                    <el-pagination @current-change="getEmployeeList" :current-page.sync="queryParams.page"
                        :page-size="queryParams.pagesize" layout="total, prev, pager, next" :total="queryParams.total">
                    </el-pagination>
                </el-row>
            </div>
        </div>
        <importExcel :dialogVisible.sync="dialogVisible" @uploadExcel="getEmployeeList()"></importExcel>
    </div>
</template>
 
<script>
import { getDepartment } from "@/api/department";
import { transListToTreeData } from '@/utils/transListToTreeData'
import { getEmployeeList, downloadExcel } from "@/api/employee";
import { saveAs } from 'file-saver'
import importExcel from "./components/importExcel.vue";
export default {
    components: {
        importExcel
    },
    data() {
        return {
            dept: [],
            defaultProps: {
                label: 'name',
                children: 'children'
            },
            queryParams: {
                departmentId: null,
                page: 1,
                pagesize: 10,
                total: 0,
                keyword: ''
            },
            list: [],
            dialogVisible: false,
        }
    },
    created() {
        this.getDepartment()
        this.getEmployeeList()
    },
    methods: {
        async getDepartment() {
            let res = await getDepartment()
            this.dept = transListToTreeData(res.data, 0)
            this.queryParams.departmentId = this.dept[0].id
            this.$nextTick(() => {
                this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
            })
        },
        selNode(node) {
            this.queryParams = {
                departmentId: null,
                page: 1,
                pagesize: 10,
                total: 0
            }
            this.queryParams.departmentId = node.id
            this.getEmployeeList()
        },
        async getEmployeeList() {
            let res = await getEmployeeList(this.queryParams)
            this.list = res.data.rows
            this.queryParams.total = res.data.total
        },
        searchValue() {
            this.queryParams.page = 1
            this.getEmployeeList()
        },
        async downloadExcel() {
            const res = await downloadExcel()
            saveAs(res, '员工信息标.xlsx')
        },
        importExcel() {
            this.dialogVisible = true
        }
    },
}
</script>
 
<style lang='scss' scoped>
.employee {
    padding: 20px;
    min-height: calc(100vh - 80px);

    .employee_content {
        display: flex;
        background-color: white;

        .left {
            width: 280px;
            padding: 20px;
            border-right: 1px solid #eaeef4;
        }

        .right {
            flex: 1;
            padding: 20px;

            .buttons {
                margin: 10px;
            }

            .username {
                height: 30px;
                width: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 50%;
                color: #fff;
                background: #04c9be;
                font-size: 12px;
                display: inline-block;
            }
        }
    }
}
</style>