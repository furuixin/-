<template>
    <el-dialog :title="this.formData.id ? '更新' : '新增'" :visible="showDialog" @close="close">
        <el-form :model="formData" :rules="rules" label-width="100px" ref="formRef">
            <el-form-item label="部门名称" prop="name">
                <el-input v-model="formData.name" placeholder="2-10个字符"></el-input>
            </el-form-item>
            <el-form-item label="部门编号" prop="code">
                <el-input v-model="formData.code" placeholder="2-10个字符"></el-input>
            </el-form-item>
            <el-form-item label="部门负责人" prop="managerId">
                <el-select v-model="formData.managerId" placeholder="请选择负责人">
                    <el-option v-for="item in managerList" :label="item.username" :key="item.id"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门介绍" prop="introduce">
                <el-input v-model="formData.introduce" type="textarea" placeholder="1-100个字符"></el-input>
            </el-form-item>
            <el-form-item>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-button @click="btnOk" type="primary">确定</el-button>
                        <el-button @click="close">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { getManagerList, getDepartment, addDepartment, getDepartmentDetail,updateDepartment } from '@/api/department'
export default {
    props: {
        showDialog: {
            type: Boolean, // 类型
            required: true, // 是否必须
            default: false//默认值
        },
        pid: {
            type: Number,
            default: null
        }
    },
    data() {
        const validateName = async (rule, value, callback) => {
            // 查询所有的组织架构数据----判断是否存在  否 校验成功  是 校验失败
            let result = await getDepartment()
            if (result.data.some(item => item.name === value)) {
                callback(new Error("部门中已经有该名称了"))
            } else {
                callback()
            }
        }
        return {
            managerList: [],
            formData: {
                name: "",
                code: "",
                managerId: "",
                introduce: "",
            },
            rules: {
                name: [
                    { required: true, message: "部门名称不能为空", trigger: 'blur' },
                    { min: 2, max: 10, message: "2~10个字符", trigger: 'blur' },
                    {
                        validator: validateName, trigger: 'blur'
                    }
                ],
                code: [
                    { required: true, message: "部门名称不能为空", trigger: 'blur' },
                    { min: 2, max: 10, message: "2~10个字符", trigger: 'blur' }
                ],
                managerId: [
                    { required: true, message: "部门负责人不能为空", trigger: "blur" },
                ],
                introduce: [
                    { required: true, message: "部门介绍不能为空", trigger: 'blur' },
                    { min: 1, max: 100, message: "1~100个字符", trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.getManagerList()
    },
    methods: {
        async getManagerList() {
            let result = await getManagerList()
            this.managerList = result.data
        },
        btnOk() {
            this.$refs.formRef.validate(async (isOk) => {
                let msg = '新增'
                if (this.formData.id) {
                    msg = '更改'
                    await updateDepartment(this.formData)
                } else {
                    await addDepartment({ ...this.formData, pid: this.pid })
                }
                this.$emit('updateDepartment')
                this.$message.success(`${msg}部门成功`)
                this.close()
            })
        },
        async getDepartmentDetail() {
            let res = await getDepartmentDetail(this.pid)
            this.formData = res.data
        },
        close() {
            this.$refs.formRef.resetFields()
            this.formData = {
                name: "",
                code: "",
                managerId: "",
                introduce: ""
            }
            let show = false
            this.$emit('update:showDialog', show)
        }
    }
}
</script>

<style lang="scss" scoped>
.el-select {
    width: 100%;
}
</style>