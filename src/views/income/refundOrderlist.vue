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
        <el-button size="small" type="primary" @click="exportExcel()">导出退款记录</el-button>
      </template>

      <template>
        <!-- 导出 -->
        <form ref="exportForm" action="/admin/refundOrderlist" method="get" style="display:none">
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
          <el-table-column label="单号" fixed prop="ordersn" />
          <el-table-column label="退款操作人" prop="refund_admin_name" />
          <el-table-column label="退款时间" prop="refund_time" />
          <el-table-column label="类型" prop="type">
            <template slot-scope="scope">
              {{scope.row.type == 1 ? '考级' : '培训'}}
            </template>
          </el-table-column>
          <el-table-column label="退款名称" prop="body" />
          <el-table-column label="退款金额" prop="refund_money" />
          <el-table-column label="支付人手机号码" prop="phone" />
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
import { refundOrderlist } from '@/api/common'

export default {
  mixins: [ListMixin],
  data() {
    return {
      api: {
        getList: refundOrderlist
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>
