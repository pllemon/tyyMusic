<template>
    <el-dialog title="配置活动" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="800px">
        <el-form v-loading="loading" ref="ruleForm" size="small" :model="form" :rules="rules" label-width="130px" :validate-on-rule-change="false">
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="课程名称：" prop="title">
                                <el-input type="text" v-model="form.title" placeholder="请输入" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="开展时间：" prop="activity_time">
                                <el-date-picker
                                    style="width:100%"
                                    v-model="timeRange"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd HH:mm"
                                    value-format="yyyy-MM-dd HH:mm"
                                    @change="changeTime"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="教授老师：" prop="tutor">
                                <el-input type="text" v-model="form.tutor" placeholder="请输入" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="原价：" prop="money">
                                <el-input-number style="width:100%" v-model="form.money" placeholder="请输入" :precision="2" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="报名人数：" prop="signupnum">
                                <el-input-number style="width:100%" v-model="form.signupnum" placeholder="请输入" :precision="0" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="排序：" prop="orders">
                                <el-input type="text" v-model="form.orders" placeholder="请输入" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="课程状态：" prop="status">
                                <el-radio-group v-model="form.status">
                                    <el-radio :label="1">开启报名</el-radio>
                                    <el-radio :label="2">关闭报名</el-radio>
                                    <el-radio :label="3">删除课程</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="描述：" prop="desc">
                                <el-input type="textarea" :rows="4" v-model="form.desc" placeholder="请输入" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="封面图：" prop="banner_url">
                                <gd-upload
                                    v-if="!loading"
                                    action='http://120.25.25.90:8082/admin/uploadimg'
                                    type="train"
                                    :file="file"  
                                    :width="345"
                                    :height="160"
                                    @success="uploadSuccess"
                                />
                                <p>图片尺寸为690*320</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="优惠活动：" v-if="finish">
                                <div class="fx-cs">
                                    <el-checkbox v-model="form.rule.age.status" :true-label="1" :false-label="0" style="margin-right: 10px">年龄优惠：</el-checkbox>
                                    <el-select v-model="form.rule.age.only" style="width:100px;margin-right: 10px" placeholder="请选择">
                                        <el-option :key="0" label="不独立" :value="0" />
                                        <el-option :key="1" label="独立" :value="1" />
                                    </el-select>
                                    <div class="fx-cs">
                                        <el-select v-model="form.rule.age.calculation" style="width:100px" placeholder="请选择">
                                            <el-option
                                                v-for="item in ageOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-input-number style="width:100px;margin-left:10px" v-model="form.rule.age.value" placeholder="请输入" :precision="0" />
                                        <span style="margin: 0 10px">岁，优惠￥</span>
                                        <el-input-number style="width:100px" v-model="form.rule.age.discount_money" placeholder="请输入" :precision="2" />
                                    </div>
                                </div>
                                <div class="fx-cs" style="margin: 10px 0">
                                    <el-checkbox v-model="form.rule.number.status" :true-label="1" :false-label="0" style="margin-right: 10px">团购优惠：</el-checkbox>
                                    <el-select v-model="form.rule.number.only" style="width:100px;margin-right:10px" placeholder="请选择">
                                        <el-option :key="0" label="不独立" :value="0" />
                                        <el-option :key="1" label="独立" :value="1" />
                                    </el-select>
                                    <div class="fx-cs">
                                        <el-input-number style="width:140px;" v-model="form.rule.number.value" placeholder="请输入" :precision="0" />
                                        <span style="margin: 0 10px">人，优惠￥</span>
                                        <el-input-number style="width:100px" v-model="form.rule.number.discount_money" placeholder="请输入" :precision="2" />
                                    </div>
                                </div>
                                <div class="fx-cs" style="margin: 10px 0">
                                    <el-checkbox v-model="form.rule.time.status" :true-label="1" :false-label="0" style="margin-right: 10px">早鸟优惠：</el-checkbox>
                                    <el-select v-model="form.rule.time.only" style="width:100px;margin-right:10px" placeholder="请选择">
                                        <el-option :key="0" label="不独立" :value="0" />
                                        <el-option :key="1" label="独立" :value="1" />
                                    </el-select>
                                    <div class="fx-cs">
                                        <el-date-picker value-format="yyyy-MM-dd" style="width:140px" v-model="form.rule.time.value" type="date" placeholder="选择日期" />
                                        <span style="margin: 0 10px">前，优惠￥</span>
                                        <el-input-number style="width:100px" v-model="form.rule.time.discount_money" placeholder="请输入" :precision="2" />
                                    </div>
                                </div>
                                <div class="fx-cs" style="margin: 10px 0">
                                    <el-checkbox v-model="form.rule.vip.status" :true-label="1" :false-label="0" style="margin-right: 10px">会员优惠：</el-checkbox>
                                    <el-select v-model="form.rule.vip.only" style="width:100px;margin-right:10px" placeholder="请选择">
                                        <el-option :key="0" label="不独立" :value="0" />
                                        <el-option :key="1" label="独立" :value="1" />
                                    </el-select>
                                    <div class="fx-cs">
                                        <span style="margin: 0 10px">认证会员可享受优惠￥</span>
                                        <el-input-number style="width:100px" v-model="form.rule.vip.discount_money" placeholder="请输入" :precision="2" />
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="后台配置内容：">
                                <el-button @click="addText" type="success" plain icon="el-icon-plus" size="mini">添加</el-button>
                                <div v-for="(item, index) in form.fields" :key="index" style="margin-top:8px;">
                                    <el-checkbox v-model="item.status" :true-label="1" :false-label="0" style="margin-right: 10px"></el-checkbox>
                                    <el-input type="text" style="width:240px;margin-right:10px" v-model="item.title" placeholder="请输入字段名称"/>
                                    <el-button @click="delText(index)" type="danger" plain icon="el-icon-minus" size="mini">删除</el-button>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
import { upDateTrain, traininfo } from '@/api/training'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
            activeType: [],
            rules: {
                title: [{ required: true, message: '请输入', trigger: 'change' }],
                activity_time: [{ required: true, message: '请输入', trigger: 'change' }],
                tutor: [{ required: true, message: '请输入', trigger: 'change' }],
                money: [{ required: true, message: '请输入', trigger: 'change' }],
            },
            timeRange: null,
            form: {
                train_id: '',
                title: '',
                activity_time: '',
                tutor: '',
                money: undefined,
                banner_url: '',
                orders: '',
                desc: '',
                status: 1,
                signupnum: undefined,
                rule: {
                    age: {
                        id: '',
                        calculation: '',
                        value: undefined,
                        discount_money: undefined,
                        rule_type: 'age',
                        status: 0,
                        only: 0
                    },
                    time: {
                        id: '',
                        calculation: '',
                        value: '',
                        discount_money: undefined,
                        rule_type: 'time',
                        status: 0,
                        only: 0
                    },
                    number: {
                        id: '',
                        calculation: '',
                        value: undefined,
                        discount_money: undefined,
                        rule_type: 'number',
                        status: 0,
                        only: 0
                    },
                    vip: {
                        id: '',
                        calculation: '',
                        value: undefined,
                        discount_money: undefined,
                        rule_type: 'vip',
                        status: 0,
                        only: 0
                    }
                },
                fields: []
            },
            file: {},
            api: {
                updateSingle: upDateTrain
            },
            loading: true,
            ageOptions: [{
              value: '>',
              label: '大于'
            },{
              value: '<',
              label: '小于'
            }],
            finish: false
        }
    },
    created() {
        if (this.mes.id) {
            this.form.train_id = this.mes.id
            this.getDetails()
        } else {
            this.loading = false
            this.finish = true
        }
    },
    methods: { 
        addText() {
            this.form.fields.push({
                title: '',
                status: 1
            })
        },
        delText(idx) {
            this.form.fields.splice(idx, 1)
        },

        uploadSuccess(data) {
            this.form.banner_url = data
        },

        changeTime() {
            if (this.timeRange && this.timeRange.length == 2) {
                this.form.activity_time = this.timeRange[0] + '至' + this.timeRange[1]
            } else {
                this.form.activity_time = ''
            }
        },

        getDetails() {
            let that = this
            that.loading = true
            traininfo({
                train_id: that.mes.id
            }).then(response => {
                const { data } = response
                let formObj = Object.assign(that.form, data.info)
                formObj.fields = data.fields
                let rule = data.rule
                formObj.rule = {
                    age: {
                        id: rule.age.id,
                        calculation: rule.age.rule.calculation,
                        value: rule.age.rule.value,
                        discount_money: rule.age.discount_money,
                        rule_type: 'age',
                        status: rule.age.status,
                        only: rule.age.rule.only
                    },
                    time: {
                        id: rule.time.id,
                        calculation: rule.time.rule.calculation,
                        value: rule.time.rule.value,
                        discount_money: rule.time.discount_money,
                        rule_type: 'time',
                        status: rule.time.status,
                        only: rule.time.rule.only
                    },
                    number: {
                        id: rule.number.id,
                        calculation: rule.number.rule.calculation,
                        value: rule.number.rule.value,
                        discount_money: rule.number.discount_money,
                        rule_type: 'number',
                        status: rule.number.status,
                        only: rule.number.rule.only
                    },
                    vip: {
                        id: rule.vip.id,
                        calculation: rule.vip.rule.calculation,
                        value: rule.vip.rule.value,
                        discount_money: rule.vip.discount_money,
                        rule_type: 'vip',
                        status: rule.vip.status,
                        only: rule.vip.rule.only
                    }
                }
                that.form = formObj
                if (data.info.banner_url) {
                    that.$set(that.file, 'url', this.$common.ip + data.info.banner_url)
                } else {
                    that.$set(that.file, 'url', '')
                }
                if (that.form.activity_time) {
                    that.timeRange = that.form.activity_time.split('至')
                }

                that.finish = true
            }).finally(() => {
                that.loading = false
                that.finish = true
            })
        }
    }
}
</script>

<style scoped>
</style>
