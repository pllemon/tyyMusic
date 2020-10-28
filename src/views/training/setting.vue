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
                        <el-input type="text" v-model="form.money" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="排序：" prop="orders">
                        <el-input type="text" v-model="form.orders" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="描述：" prop="desc">
                        <el-input type="text" v-model="form.desc" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="优惠活动：">
                      <el-checkbox-group v-model="activeType">
                        <div class="fx-cs">
                            <el-checkbox label="age" style="margin-right: 10px">年龄</el-checkbox>
                            <div class="fx-cs">
                                <el-select v-model="form.age.calculation" style="width:100px" placeholder="请选择">
                                <el-option
                                    v-for="item in ageOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                                </el-select>
                                <el-input type="text" style="width:100px;margin-left:10px" v-model="form.age.value" placeholder="请输入" clearable />
                                <span style="margin: 0 10px">岁，优惠￥</span>
                                <el-input type="text" style="width:100px" v-model="form.age.discount_money" placeholder="请输入" clearable />
                            </div>
                        </div>
                        <div class="fx-cs" style="margin: 10px 0">
                            <el-checkbox label="number" style="margin-right: 10px">团购</el-checkbox>
                            <div class="fx-cs">
                                <el-input type="text" style="width:140px" v-model="form.number.value" placeholder="请输入" clearable />
                                <span style="margin: 0 10px">人，优惠￥</span>
                                <el-input type="text" style="width:100px" v-model="form.number.discount_money" placeholder="请输入" clearable />
                            </div>
                        </div>
                        <div class="fx-cs">
                            <el-checkbox label="time" style="margin-right: 10px">早鸟价</el-checkbox>
                            <div class="fx-cs">
                                <el-date-picker style="width:140px" v-model="form.time.value" type="date" placeholder="选择日期" />
                                <span style="margin: 0 10px">前，优惠￥</span>
                                <el-input type="text" style="width:100px" v-model="form.time.discount_money" placeholder="请输入" clearable />
                            </div>
                        </div>
                      </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="封面图：" prop="cover">
                        <UploadPic2
                            v-if="!loading"
                            :file="file" 
                            :autoUpload="false" 
                            width="320" 
                            height="180"  
                            action="#"
                            @change="changeFile"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="close">取 消</el-button>
            <el-button type="primary" :loading="loading" size="small" @click="updateSingle">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import UpdateMixin from '@/mixin/update'
import { upDateTrain } from '@/api/training'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
            activeType: [],
            rules: {},
            form: {
                train_id: '',
                title: '',
                activity_time: '',
                tutor: '',
                money: '',
                cover: '',
                orders: '',
                desc: '',
                age: {
                    calculation: '',
                    value: '',
                    discount_money: '',
                    rule_type: 'age'
                },
                time: {
                    calculation: '',
                    value: '',
                    discount_money: '',
                    rule_type: 'time'
                },
                number: {
                    calculation: '',
                    value: '',
                    discount_money: '',
                    rule_type: 'number'
                },
            },
            file: {},
            api: {
                updateSingle: upDateTrain
            },
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
        console.log(this.mes)
        console.log(this.form)
    },
    methods: {
        changeFile(file) {
            this.file = file
        },

        submitForm() {
            const that = this
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let formData = new FormData()
                    if (this.form.type == 0) {
                        this.form.url = ''
                    }
                    for (let i in this.form) {
                        formData.append(i, this.form[i])
                    }
                    if (this.file.raw) {
                        formData.append('file', this.file.raw)
                    } else if (!this.file.url) {
                        this.$message.error('请上传图片')
                        return false
                    }
                    
                    let type = this.form.id ? '2' : '1'
                    this.loading = true
                    updateRecord(formData, type).then(response => {
                        this.common.closeComponent(this)
                    }).finally(() => {
                        this.loading = false
                    })
                }
            })
            }
    }
}
</script>

<style scoped>
.el-checkbox-group{
    font-size: 14px !important;
}
</style>
