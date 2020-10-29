<template>
  <div class="list-content">
    <list-layout>
      <template slot="search">
        <div class="fx-cs">
          <el-input size="small" v-model="query.keyword" clearable style="width:300px" tpye="text" placeholder="请输入关键字进行搜索" />
          <el-button size="small" @click="search">搜索</el-button>
        </div>
      </template>

      <template slot="action">
        <el-button size="small" type="primary">导出购买记录</el-button>
      </template>

      <template>
        <el-table
          v-loading="loading"
          :data="list"
          height="100%"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" fixed label="序号" type="index" width="50"/>
          <el-table-column label="订单号" fixed prop="ordersn" />
          <el-table-column label="支付时间" prop="pay_time" />
          <el-table-column label="付款人姓名" prop="" />
          <el-table-column label="报名人姓名" prop="signup_name" />
          <el-table-column label="联系信息" prop="phone" />
          <el-table-column label="比赛名称" prop="" />
          <el-table-column label="组别" prop="" />
          <el-table-column label="实际支付" prop="should_pay_money" />
          <el-table-column label="支付状态" prop="pay_status">
            <template slot-scope="scope">
              {{scope.row.pay_status == 1 ? '已付款' : '未付款'}}
            </template>
          </el-table-column>
          <el-table-column label="操作"  fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="refund(scope.row.id)">退款</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pagination">
        <pagination
          :total="total"
          :page-size="query.limit"
          :current-page="query.page"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        />
      </template>
    </list-layout>
    <component :is="currentComponent" :mes="componentMes" @close="closeComponent" />
  </div>
</template>

<script>
import ListMixin from '@/mixin/list'
import { examinationpaylog } from '@/api/common'

export default {
  mixins: [ListMixin],
  data() {
    return {
      api: {
        getList: examinationpaylog
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    refund(id) {}
  }
}
</script>
