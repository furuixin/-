<template>
    <!-- 组织架构 -->
    <div class='department'>
        <div class="department_content">
            <el-tree :data="data" :props="defaultProps"></el-tree>
            <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
                <template slot-scope="{ node, data }">
                    <span>{{ data }}</span>
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
 
<style lang='scss' scoped>
.department {
    min-height: calc(100vh - 50px);
    padding: 20px;
    background-color: #f0f2f5;

    .department_content {
        padding: 30px 140px;
        background-color: #ffffff;
    }
}
</style>