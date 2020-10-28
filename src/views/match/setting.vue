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
                    <el-form-item label="金额：" prop="money">
                        <el-input-number style="width:100%" v-model="form.money" placeholder="请输入" :precision="2" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="排序：" prop="orders">
                        <el-input type="text" v-model="form.orders" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="状态：" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="2">禁用</el-radio>
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
                    <el-form-item label="比赛组别：" prop="price">
                        <div class="fx-cs group" v-for="(item,index) in form.group" :key="index">
                            <span>名称</span>
                            <el-input type="text" v-model="item.name" placeholder="请输入" clearable />
                            <span>费用</span>
                            <el-input type="text" v-model="item.price" placeholder="请输入" clearable />
                            <el-button @click="addGroup" type="success" plain icon="el-icon-plus" size="mini" v-if="index == 0">添加</el-button>
                            <el-button @click="delGroup(index)" type="danger" plain icon="el-icon-minus" size="mini" v-if="index != 0">删除</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="封面图：" prop="cover">
                        <upload-pic v-model="form.cover" :disabled="readonly" />
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
import { upDateExamination, examinationinfo } from '@/api/examination'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
            rules: {},
            form: {
                title: '',
                activity_time: '',
                money: '',
                orders: '',
                desc: '',
                status: 1,
                group: []
            },
            api: {
                updateSingle: upDateExamination
            }
        }
    },
    created() {
        // this.form.ids = this.mes.data.ids
    },
    methods: {
        addGroup() {
            this.form.group.push('')
        },
        delGroup(idx) {
            this.form.group.splice(idx, 1)
        }
    }
}
</script>
<style scoped lang="scss">
.group{
    margin-bottom: 10px;
    .el-input{
        margin: 0 10px;
        width: 150px;
    }
    .el-button{
    }
}
</style>
