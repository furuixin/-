<template>
    <el-dialog :title="getTitle + '部门'" :visible="showDialog" @close="close">
        <el-form ref="deptRef" :model="formData" :rules="rules">
            <el-form-item label="部门名称" prop="name">
                <el-input placeholder="2~10个字符" v-model="formData.name" style="width:80%" size="mini" />
            </el-form-item>
            <el-form-item label="部门编号" prop="code">
                <el-input placeholder="2~10个字符" v-model="formData.code" style="width:80%" size="mini" />
            </el-form-item>
            <el-form-item label="部门负责人" prop="managerId">
                <el-select placeholder="请选择负责人" v-model="formData.managerId" style="width:80%">
                    <el-option v-for="item in managerList" :key="item.id" :label="item.username"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门介绍" prop="introduce">
                <el-input placeholder="2~10个字符" v-model="formData.introduce" type="textarea" style="width:80%"
                    size="mini" />
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button>取 消</el-button>
            <el-button type="primary" @click="btnOk">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getDepartment, getManagerList, addDepartment, getDepartmentDetail, updateDepartment } from '@/api/department'
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        // 接收父级id
        currentnodeid: {
            type: Number,
            default: null
        }
    },
    data() {
        const codeValidate = async (rule, value, callback) => {
            let res = await getDepartment()
            if (this.formData.id) {
                res = res.filter(item => item.id !== this.formData.id)
            }
            if (res.some(item => item.code === value)) {
                callback(new Error("部门中以及由该编码了"))
            } else {
                callback()
            }
        }
        const nameValidate = async (rule, value, callback) => {
            let res = await getDepartment()
            if (this.formData.id) {
                res = res.filter(item => item.id !== this.formData.id)
            }
            if (res.some(item => item.name === value)) {
                callback(new Error("部门中已经由该名称了"))
            } else {
                callback()
            }
        }
        return {
            formData: {
                code: "",
                introduce: "",
                managerId: "",
                name: "",
                pid: "",
            },
            rules: {
                code: [
                    { required: true, message: "部门编号不能为空", trigger: 'blur' },
                    { min: 2, max: 10, message: "部门编号的长度为2~10位", trigger: 'blur' },
                    {
                        validator: codeValidate
                    }
                ],
                introduce: [
                    { required: true, message: "部门介绍不能为空", trigger: 'blur' },
                    { min: 1, max: 100, message: "部门介绍的长度为1~100位", trigger: 'blur' }
                ],
                managerId: [
                    { required: true, message: "部门负责人不能为空", trigger: 'blur' }
                ],
                name: [
                    { required: true, message: "部门名称不能为空", trigger: 'blur' },
                    { min: 2, max: 10, message: "部门介绍的长度为2~10", trigger: 'blur' },
                    {
                        validator: nameValidate
                    }
                ]
            },
            managerList: []
        }
    },
    computed: {
        getTitle() {
            return this.formData.id ? '编辑' : '新增'
        }
    },
    created() {
        this.getManagerList()
    },
    methods: {
        close() {
            this.formData = {
                code: "",
                introduce: "",
                managerId: "",
                name: "",
                pid: "",
            }
            this.$refs.deptRef.resetFields()
            this.$emit('update:showDialog', false)
        },
        async getManagerList() {
            let res = await getManagerList()
            this.managerList = res
        },
        btnOk() {
            this.$refs.deptRef.validate(async isOk => {
                if (isOk) {
                    if (this.formData.id) {
                        await updateDepartment({ ...this.formData })

                    } else {
                        await addDepartment({ ...this.formData, pid: this.currentnodeid })
                    }
                    this.$emit('updatedeptment')
                    // 2.提示
                    this.$message.success("新增部门成功")
                    // 3.关闭弹框
                    this.close()
                }
            })
        },
        async getDepartmentDetail() {
            console.log(this.currentnodeid)
            let res = await getDepartmentDetail(this.currentnodeid)
            console.log(res, "详情")
            this.formData = res
        }
    }
}
</script>

<style lang="scss" scoped></style>