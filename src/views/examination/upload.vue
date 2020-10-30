<template>
    <el-dialog title="导入" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="500px">
        <div v-loading="loading" loading-text="上传中">
            <el-upload
                ref="upload"
                class="upload-demo"
                drag
                :limit="1"
                action="/admin/exprotachievement"
                :data="{examination_id:examination_id}"
                :multiple="false"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :show-file-list="false"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </div>
        <!-- <span slot="footer" class="dialog-footer" v-show="!loading">
            <el-button size="small" @click="close">取 消</el-button>
            <el-button type="primary" :loading="loading" size="small" @click="updateSingle">确 定</el-button>
        </span> -->
    </el-dialog>
</template>
<script>
import UpdateMixin from '@/mixin/update'
import { upDateExamination, examinationinfo } from '@/api/examination'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
           examination_id: '',
           loading: false
        }
    },
    created() {
        this.examination_id = this.mes.id
    },
    methods: {
        beforeUpload(file) {
            this.loading = true
        },

        handleSuccess(res, file) {
            this.loading = false
            console.log(res, file)
            if (res.success) {
                this.$emit('close', {
                    'notify': true,
                    'reload': true
                })
            } else {
                this.$message.error(res.message)
            }
            this.$refs.upload.clearFiles()
        }
    }
}
</script>
<style lang="scss">
.group{
    margin-bottom: 18px;
    .el-form-item{
        margin: 0 10px;
        width: 150px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 0;
    }
}
.el-upload-dragger{
    width: 440px;
}
</style>
