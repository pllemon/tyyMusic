<template>
    <el-dialog title="退款" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="700px">
        <el-form v-loading="loading" ref="ruleForm" size="small" :model="form" :rules="rules" label-width="120px" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="订单号：" prop="ordersn">
                        <span>{{form.ordersn}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="报名人姓名：" prop="signup_name">
                        <span>{{info.signup_name}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="联系方式：" prop="phone">
                        <span>{{info.phone}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="支付金额：" prop="pay_money">
                        <span>{{info.pay_money}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="已退款金额：" prop="refund_money">
                        <span>{{info.refund_money}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="本次退款金额：" prop="refund_fee">
                        <el-input-number style="width:100%" v-model="form.refund_fee" placeholder="请输入" :precision="2" />
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
import { orderPayInfo, refundorder } from '@/api/common'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
            info: {},
            rules: {
                refund_fee: [{ required: true, message: '请输入', trigger: 'change' }]
            },
            form: {
                ordersn: '',
                refund_fee: undefined,

            },
            api: {
                updateSingle: refundorder
            },
            loading: true,
            finish: false
        }
    },
    created() {
        this.form.ordersn = this.mes.ordersn
        this.getDetails()
    },
    methods: {
        getDetails() {
            orderPayInfo({
                ordersn: this.mes.ordersn
            }).then(res => {
                this.info = res.data
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
<style lang="scss">
</style>
