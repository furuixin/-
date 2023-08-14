<template>
    <div class="detail">
        <el-form :model="form" label-width="220px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="form.username" size="mini" class="inputW"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="工号">
                        <el-input v-model="form.workNumber" size="mini" class="inputW" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号">
                        <el-input v-model="form.mobile" size="mini" class="inputW"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="部门">
                        <selectTree></selectTree>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="聘用形式">
                        <el-select v-model="form.formOfEmployment" placeholder="请选择" class="inputW" size="small">
                            <el-option label="正式" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="入职时间">
                        <el-date-picker v-model="form.timeOfEntry" type="date" class="inputW" size="small"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="转正时间">
                        <el-date-picker v-model="form.correctionTime" type="date" class="inputW"
                            size="small"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import selectTree from './components/select-tree.vue';
export default {
    components: {
        selectTree
    },
    data() {
        return {
            form: {
                username: '',
                workNumber: '',
                mobile: '',
                formOfEmployment: null,
                departmentName: '',
                timeOfEntry: '',
                correctionTime: '',
            }
        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
.detail {
    padding: 20px;
    background-color: white;

    .inputW {
        width: 300px !important;
    }
}
</style>