<template>
    <!-- 组织架构 -->
    <div class='department'></div>
</template>
 
<script>
import { getDepartment,transListToTreeData } from "@/api/department";8
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
            console.log(this.data);
        }
    }
}
</script>
 
<style lang='scss' scoped></style>