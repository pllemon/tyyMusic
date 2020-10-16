<template>
    <el-dialog title="配置比赛" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="700px">
        <el-form v-loading="loading" ref="ruleForm" size="small" :model="form" :rules="rules" label-width="100px" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="比赛名称：" prop="name">
                        <el-input type="text" v-model="form.name" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="开展时间：" prop="time">
                        <el-input type="text" v-model="form.time" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="比赛状态：" prop="teacher">
                        <el-input type="text" v-model="form.teacher" placeholder="请输入" clearable />
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
// import { checkRecord } from '@/api/householdManager/householdExamine'

export default {
    mixins: [UpdateMixin],
    data() {
        return {
            rules: {},
            form: {
                name: '',
                time: '',
                teacher: '',
                price: '',
                cover: '',
                birdPrice: '',
                group: [{
                    name: '',
                    group: ''
                }]
            },
            api: {
                // updateSingle: checkRecord
            },
            ageOptions: [{
              value: '1',
              label: '大于'
            },{
              value: '2',
              label: '大于等于'
            }]
        }
    },
    created() {
        // this.form.ids = this.mes.data.ids
    },
    methods: {
        addGroup() {
            this.form.group.push({
                name: '',
                price: ''
            })
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
