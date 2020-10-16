<template>
    <el-dialog title="配置活动" :visible="true" :before-close="close"  :modal-append-to-body='false' :close-on-click-modal="false" width="700px">
        <el-form v-loading="loading" ref="ruleForm" size="small" :model="form" :rules="rules" label-width="100px" :validate-on-rule-change="false">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="课程名称：" prop="name">
                        <el-input type="text" v-model="form.name" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="开展时间：" prop="time">
                        <el-input type="text" v-model="form.time" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="教授老师：" prop="teacher">
                        <el-input type="text" v-model="form.teacher" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="原价：" prop="price">
                        <el-input type="text" v-model="form.pricev" placeholder="请输入" clearable />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="优惠活动：" prop="birdPrice">
                      <div class="fx-cs">
                        <el-checkbox v-model="form.birdPrice" style="margin-right: 10px">年龄</el-checkbox>
                        <div class="fx-cs">
                            <el-select v-model="form.birdPrice" style="width:100px" placeholder="请选择">
                              <el-option
                                v-for="item in ageOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                            <el-input type="text" style="width:100px;margin-left:10px" v-model="form.birdPrice" placeholder="请输入" clearable />
                            <span style="margin: 0 10px">岁，优惠价</span>
                            <el-input type="text" style="width:100px" v-model="form.birdPrice" placeholder="请输入" clearable />
                        </div>
                      </div>
                      <div class="fx-cs" style="margin: 10px 0">
                        <el-checkbox v-model="form.birdPrice" style="margin-right: 10px">团购</el-checkbox>
                        <div class="fx-cs">
                            <el-input type="text" style="width:140px" v-model="form.birdPrice" placeholder="请输入" clearable />
                            <span style="margin: 0 10px">人，优惠价</span>
                            <el-input type="text" style="width:100px" v-model="form.birdPrice" placeholder="请输入" clearable />
                        </div>
                      </div>
                      <div class="fx-cs">
                        <el-checkbox v-model="form.birdPrice" style="margin-right: 10px">早鸟价</el-checkbox>
                        <div class="fx-cs">
                            <el-date-picker style="width:140px" v-model="form.birdPrice" type="date" placeholder="选择日期" />
                            <span style="margin: 0 10px">前，优惠价</span>
                            <el-input type="text" style="width:100px" v-model="form.birdPrice" placeholder="请输入" clearable />
                        </div>
                      </div>
                    </el-form-item>
                </el-col>
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
                birdPrice: ''
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
    }
}
</script>
