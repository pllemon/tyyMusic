<template>
    <el-dialog title="配置活动" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="700px">
        <el-form v-loading="loading" ref="ruleForm" size="small" :model="form" :rules="rules" label-width="100px" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="课程名称：" prop="title">
                        <el-input type="text" v-model="form.title" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="开展时间：" prop="activity_time">
                        <el-input type="text" v-model="form.activity_time" placeholder="请输入" clearable />
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
                    <el-form-item label="排序：" prop="orders">
                        <el-input type="text" v-model="form.orders" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="课程状态：" prop="status">
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
                <el-col :span="24">
                    <el-form-item label="优惠活动：">
                      <el-checkbox-group v-model="activeType">
                        <div class="fx-cs">
                            <!-- <el-checkbox label="age" style="margin-right: 10px">年龄</el-checkbox> -->
                            <div>年龄：</div>
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
                            <!-- <el-checkbox label="number" style="margin-right: 10px">团购</el-checkbox> -->
                            <div>团购：</div>
                            <div class="fx-cs">
                                <el-input-number style="width:140px;" v-model="form.rule.number.value" placeholder="请输入" :precision="0" />
                                <span style="margin: 0 10px">人，优惠￥</span>
                                <el-input-number style="width:100px" v-model="form.rule.number.discount_money" placeholder="请输入" :precision="2" />
                            </div>
                        </div>
                        <div class="fx-cs">
                            <!-- <el-checkbox label="time" style="margin-right: 10px">早鸟价</el-checkbox> -->
                            <div>早鸟价：</div>
                            <div class="fx-cs">
                                <el-date-picker value-format="yyyy-MM-dd" style="width:140px" v-model="form.rule.time.value" type="date" placeholder="选择日期" />
                                <span style="margin: 0 10px">前，优惠￥</span>
                                <el-input-number style="width:100px" v-model="form.rule.time.discount_money" placeholder="请输入" :precision="2" />
                            </div>
                        </div>
                      </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="封面图：" prop="banner_url">
                        <gd-upload
                            v-if="!loading"
                            action='https://music.eqask.com/admin/uploadimg'
                            type="train"
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
                rule: {
                    age: {
                        id: '',
                        calculation: '',
                        value: undefined,
                        discount_money: undefined,
                        rule_type: 'age'
                    },
                    time: {
                        id: '',
                        calculation: '',
                        value: '',
                        discount_money: undefined,
                        rule_type: 'time'
                    },
                    number: {
                        id: '',
                        calculation: '',
                        value: undefined,
                        discount_money: undefined,
                        rule_type: 'number'
                    }
                }
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
            }]
        }
    },
    created() {
        if (this.mes.id) {
            this.form.train_id = this.mes.id
            this.getDetails()
        } else {
            this.loading = false
        }
    },
    methods: {
        uploadSuccess(data) {
            this.form.banner_url = data
        },

        getDetails() {
            let that = this
            that.loading = true
            traininfo({
                train_id: that.mes.id
            }).then(response => {
                const { data } = response
                let formObj = Object.assign(that.form, data.info)
                let rule = data.rule
                formObj.rule = {
                    age: {
                        id: rule.age.id,
                        calculation: rule.age.rule.calculation,
                        value: rule.age.rule.value,
                        discount_money: rule.age.discount_money,
                        rule_type: 'age'
                    },
                    time: {
                        id: rule.time.id,
                        calculation: rule.time.rule.calculation,
                        value: rule.time.rule.value,
                        discount_money: rule.time.discount_money,
                        rule_type: 'time'
                    },
                    number: {
                        id: rule.number.id,
                        calculation: rule.number.rule.calculation,
                        value: rule.number.rule.value,
                        discount_money: rule.number.discount_money,
                        rule_type: 'number'
                    }
                }
                that.form = formObj
                if (data.info.banner_url) {
                    that.$set(that.file, 'url', this.$common.ip + data.info.banner_url)
                } else {
                    that.$set(that.file, 'url', '')
                }
            }).finally(() => {
                that.loading = false
            })
        }
    }
}
</script>

<style scoped>
</style>
