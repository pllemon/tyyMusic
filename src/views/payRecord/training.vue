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
        <el-button size="small" type="primary" @click="exportExcel()">导出购买记录</el-button>
      </template>

      <template>
        <!-- 导出 -->
        <form ref="exportForm" action="/admin/trainlistpaylog" method="get" style="display:none">
          <input name="exportToExcel" value="1" />
          <div></div>
        </form>

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
          <el-table-column label="报名人姓名" prop="signup_name" />
          <el-table-column label="联系信息" prop="phone" />
          <el-table-column label="课程名称" prop="title" width="200"/>
          <el-table-column label="原价格" prop="money" />
          <el-table-column label="实际支付" prop="should_pay_money" />
          <el-table-column label="支付状态" prop="pay_status">
            <template slot-scope="scope">
              {{scope.row.pay_status == 1 ? '已付款' : '未付款'}}
            </template>
          </el-table-column>
          <el-table-column label="退款状态" prop="refund_status">
            <template slot-scope="scope">
              {{scope.row.refund_status == 0 ? '未退款' : ''}}
              {{scope.row.refund_status == 1 ? '已退款' : ''}}
              {{scope.row.refund_status == 2 ? '已退部分' : ''}}
            </template>
          </el-table-column>
          <el-table-column label="优惠情况" prop="discount_type" />
          <el-table-column label="操作"  fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.pay_status == 1 && scope.row.refund_status != 1" @click="refund(scope.row)">退款</el-button>
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
import { trainlistpaylog, refundorder } from '@/api/common'
import refundDialog from '@/views/payRecord/refund'

export default {
  mixins: [ListMixin],
  components: {
    refundDialog
  },
  data() {
    return {
      api: {
        getList: trainlistpaylog
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    refund(row) {

      this.loadComponent('refundDialog', row)
      return false

      this.$confirm('确定退款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        refundorder({ordersn: id}).then(res => {
          this.$common.successNotify(res.message)
        })
      }).catch(() => {
              
      })
    }
  }
}
</script>
