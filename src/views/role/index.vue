<template>
    <div class="container">
        <div class="app-container">
            <div class="tab">
                <el-button type="primary" size="mini">新增</el-button>
            </div>
            <el-table :data="list">
                <el-table-column prop="name" align="center" width="200" label="角色">
                    <template v-slot="{ row }">
                        <el-input type="text" size="mini" v-model="row.editRow.name" v-if="row.isEdit" />
                        <span v-else>{{ row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="state" align="center" width="200" label="启用">
                    <template v-slot="{ row }">
                        <el-switch v-model="row.editRow.state" v-if="row.isEdit" :active-value="0" :inactive-value="1" />
                        <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" align="center" label="描述">
                    <template v-slot="{ row }">
                        <el-input type="text" size="mini" v-model="row.editRow.description" v-if="row.isEdit" />
                        <span v-else>{{ row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template v-slot="{ row }">
                        <template v-if="row.isEdit">
                            <el-button size="mini" type="primary" @click="btnEditOk(row)">确定</el-button>
                            <el-button size="mini" @click="row.isEdit = false">取消</el-button>
                        </template>
                        <template v-else>
                            <el-button size="mini" type="text" @click="btnRole(row.id)">分配权限</el-button>
                            <el-button size="mini" type="text" @click=" bindEdit(row)">编辑</el-button>
                            <el-button size="mini" type="text">删除</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row type="flex" style="height:60px" align="middle" justify="end">
                <!-- 放置分页组件 -->
                <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.page" :total="pageParams.total"
                    layout="prev, pager, next" @current-change="changePage" />
            </el-row>
        </div>
        <!-- 角色弹出层 -->
        <el-dialog :visible.sync="showRoleDialog" title="分配角色">
            <el-checkbox-group v-model="roleIds">
                <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
            <el-row slot="footer" type="flex" justify="center">
                <el-button @click="btnRoleOk">确定</el-button>
                <el-button>取消</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>
  
<script>
import { updateRole, getRoleList, getEnabledRoles, assignRole } from '@/api/role'
export default {
    data() {
        return {
            showRoleDialog: false,//控制弹出层的显示隐藏
            roleIds: [],//双向绑定数据的
            roleList: [],//角色列表数据
            list: [],
            pageParams: {
                page: 1, // 第几页
                pagesize: 5, // 每页多少条
                total: 0
            }
        }
    },
    created() {
        this.getRoleList()
    },
    methods: {
        // 获取数据
        async getRoleList() {
            const res = await getRoleList(this.pageParams)
            console.log(res);
            this.list = res.data.rows // 赋值数据
            this.pageParams.total=res.data.total
            // console.log(this.list,"list")
            // 获取数据之后针对每个数据定义编辑标记
            this.list.forEach(item => {
                // item.isEdit = false
                // 问题:数据变化，视图不更新
                // 添加的是动态数据，不具备响应式特点
                this.$set(item, 'isEdit', false)
                // 备份数据
                this.$set(item, 'editRow', {
                    name: item.name,
                    state: item.state,
                    description: item.description
                })
            })
        },
        // 切换分页时 请求新的数据
        changePage(newPage) {
            this.pageParams.page = newPage // 赋值当前页码
            this.getRoleList()
        },
        // 点击编辑行
        bindEdit(row) {
            row.isEdit = true  //改变行的编辑状态
            console.log(row, "row")
            row.editRow.name = row.name
            row.editRow.state = row.state
            row.editRow.description = row.description
        },
        // 点击行编辑的确定
        async btnEditOk(row) {
            // 检查必填
            if (row.editRow.name && row.editRow.description) {
                await updateRole({ ...row.editRow, id: row.id })
                // 提示
                this.$message.success("更新成功")
                // 退出编辑状态
                // row.isEdit=false
                // row.editRow={name,description,status}
                // row={name,description,states}
                // row.name =row.editRow.name
                Object.assign(row, {
                    ...row.editRow,
                    isEdit: false
                })
            }
        },
        // 点击角色  
        async btnRole(id) {
            // 弹框显示
            this.showRoleDialog = true
            // 获取所有角色列表数据
            let res = await getEnabledRoles()
            this.roleList = res.data
            //  记录员工id
            this.currentUserId = id
            // 根据id查找员工详情
            let roleRes = await getRoleList(id)
            console.log(roleRes)
            this.roleIds = roleRes.data.roleIds

        },
        // 点击确定
        async btnRoleOk() {
            await assignRole({
                id: this.currentUserId,
                roleIds: this.roleIds
            })
            this.$message.success("分配角色成功")
            this.showRoleDialog = false
        },
    }
}
</script>
  
<style lang="scss" scoped></style>