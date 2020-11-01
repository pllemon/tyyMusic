<template>
    <el-dialog title="查看曲目" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="700px">
        <el-form v-loading="loading" ref="ruleForm" size="small" label-width="140px" :model="form" :rules="rules" :validate-on-rule-change="false">
            <el-row v-for="(item, index) in list" :key="index">
                <el-col :span="24">
                    <el-form-item label="曲目名称：" prop="activity_time">
                        <el-input type="text" disabled v-model="item.song" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="作品号、序号：" prop="activity_time">
                        <el-input type="text" disabled v-model="item.song_number" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="作者：" prop="activity_time">
                        <el-input type="text" disabled v-model="item.song_authod" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer" v-show="!loading">
            <el-button size="small" @click="close">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import UpdateMixin from '@/mixin/update'
import { songlist } from '@/api/common'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
            form: {
            },
            list: [],
            loading: true
        }
    },
    created() {
        this.getDetails()
    },
    methods: {
        uploadSuccess(data) {
            this.form.banner_url = data
        },

        getDetails() {
            let that = this
            that.loading = true
            songlist({
                examination_id: that.mes.id
            }).then(response => {
                console.log(response)
                this.list = response.data.list
            }).finally(() => {
                that.loading = false
            })
        }
    }
}
</script>
