<!-- 导入表单组件 -->
<template>
    <el-dialog :visible="dialogVisible" width="500px" title="员工导入" @close="close">
        <el-row type="flex" justify="center">
            <div class="upload-excel">
                <input type="file" accept=".xlsx,.xls" ref="excel-upload-input" class="excel-upload-input"
                    @change="uploadChang">
                <div class="drop">
                    <i class="el-icon-upload"></i>
                    <el-button type="text" @click="">下载导入模板</el-button>
                    <span>
                        将文件拖到此处或<el-button type="text" @click="handleImport">点击上传</el-button>
                    </span>
                </div>
            </div>
        </el-row>
        <el-row type="flex" justify="end">
            <el-button @click="close()" size="small" type="primary">取消</el-button>
        </el-row>
    </el-dialog>
</template>

<script>
import { importEmployee } from "@/api/employee";
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
            require: true,
        }
    },
    methods: {
        handleImport() {
            this.$refs['excel-upload-input'].click()
        },
        close() {
            this.$emit('update:dialogVisible', false)
        },
        async uploadChang(event) {
            console.log(event);
            let file = event.target.files
            event.target
            if (file.length > 0) {
                const data = new FormData()
                data.append('file', file[0])
                importEmployee(data)
                this.$emit('uploadExcel')
                this.close()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.upload-excel {
    margin: 20px;
    width: 360px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;

    .excel-upload-input {
        display: none;
        z-index: -9999;
    }

    .drop {
        width: 100%;
        height: 100%;
        display: flex;
        color: #bbbbbb;
        line-height: 40px;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        border: 1px dashed #dcdfe6;

        .el-icon-upload {
            font-size: 60px;
            display: block;
            color: #c0c4cc;
        }
    }
}
</style>