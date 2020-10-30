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
        <el-button size="small" type="primary">导出报表</el-button>
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
          <el-table-column label="日期" fixed prop="ordersn" />
          <el-table-column label="总单数" prop="pay_time" />
          <el-table-column label="总收入" prop="" />
          <el-table-column label="客单价" prop="signup_name" />
          <el-table-column label="培训总单数" prop="phone" />
          <el-table-column label="培训总收入" prop="" />
          <el-table-column label="客单价" prop="" />
          <el-table-column label="比赛总单数" prop="should_pay_money" />
          <el-table-column label="比赛总收入" prop="should_pay_money" />
          <el-table-column label="客单价" prop="should_pay_money" />
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
import { financelog } from '@/api/common'

export default {
  mixins: [ListMixin],
  data() {
    return {
      api: {
        getList: financelog
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>
