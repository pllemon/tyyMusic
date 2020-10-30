<template>
    <el-dialog title="配置比赛" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="700px">
        <el-form v-loading="loading" ref="ruleForm" size="small" :model="form" :rules="rules" label-width="100px" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="比赛名称：" prop="title">
                        <el-input type="text" v-model="form.title" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="开展时间：" prop="activity_time">
                        <el-input type="text" v-model="form.activity_time" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="排序：" prop="orders">
                        <el-input type="text" v-model="form.orders" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="比赛状态：" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="1">开启报名</el-radio>
                            <el-radio :label="2">关闭报名</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="描述：" prop="desc">
                        <el-input type="textarea" :rows="4" v-model="form.desc" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="比赛组别：">
                        <div class="fx-cs group" v-for="(item,index) in form.group" :key="index">
                            <span>名称</span>
                            <el-form-item :prop="'group.'+index+'.group_name'" :rules="rules.group_name">
                                <el-input type="text" v-model="item.group_name" placeholder="请输入" clearable />
                            </el-form-item>
                            <span>费用</span>
                            <el-form-item :prop="'group.'+index+'.money'" :rules="rules.money">
                                <el-input-number v-model="item.money" placeholder="请输入" :precision="2" />
                            </el-form-item>
                            <el-button @click="addGroup" type="success" plain icon="el-icon-plus" size="mini" v-if="index == 0">添加</el-button>
                            <el-button @click="delGroup(index)" type="danger" plain icon="el-icon-minus" size="mini" v-if="index != 0">删除</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="封面图：" prop="banner_url">
                        <gd-upload
                            v-if="finish"
                            action='admin/uploadimg'
                            type="examination"
                            :file="file"  
                            @success="uploadSuccess"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer" v-show="!loading">
            <el-button size="small" @click="close">取 消</el-button>
            <el-button type="primary" :loading="loading" size="small" @click="updateSingle">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import UpdateMixin from '@/mixin/update'
import { upDateExamination, examinationinfo } from '@/api/examination'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
            rules: {
                title: [{ required: true, message: '请输入', trigger: 'change' }],
                activity_time: [{ required: true, message: '请输入', trigger: 'change' }],
                group_name: [{ required: true, message: '请输入', trigger: 'change' }],
                money: [{ required: true, message: '请输入', trigger: 'change' }],
            },
            form: {
                examination_id: '',
                title: '',
                activity_time: '',
                orders: '',
                desc: '',
                status: 1,
                group: [{
                    group_name: '',
                    money: undefined
                }]
            },
            file: {},
            api: {
                updateSingle: upDateExamination
            },
            loading: true,
            finish: false
        }
    },
    created() {
        if (this.mes.id) {
            this.form.examination_id = this.mes.id
            this.getDetails()
        } else {
            this.loading = false
            this.finish = true
        }
    },
    methods: {
        uploadSuccess(data) {
            this.form.banner_url = data
        },

        getDetails() {
            let that = this
            that.loading = true
            examinationinfo({
                examination_id: that.mes.id
            }).then(response => {
                const { data } = response
                let formObj = Object.assign(that.form, data.info)
                if (data.group && data.group.length) {
                    formObj.group = data.group
                } else {
                    formObj.group = [{
                        group_name: '',
                        money: undefined
                    }]
                }
                that.form = formObj
                if (data.info.banner_url) {
                    that.$set(that.file, 'url', this.$common.ip + data.info.banner_url)
                } else {
                    that.$set(that.file, 'url', '')
                }
            }).finally(() => {
                that.loading = false
                that.finish = true
            })
        },

        addGroup() {
            this.form.group.push({
                group_name: '',
                money: undefined
            })
        },
        delGroup(idx) {
            this.form.group.splice(idx, 1)
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
</style>
