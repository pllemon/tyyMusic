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
        <el-button size="small" type="primary" @click="exportExcel()">导出报表</el-button>
      </template>

      <template>
        <!-- 导出 -->
        <form ref="exportForm" action="/admin/financelog" method="get" style="display:none">
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
          <el-table-column label="日期" fixed prop="date" />
          <el-table-column label="总单数" prop="sumnumber" />
          <el-table-column label="总收入" prop="summoney" />
          <el-table-column label="客单价" prop="avgsummoney" />
          <el-table-column label="培训总单数" prop="train_number" />
          <el-table-column label="培训总收入" prop="train_summoney" />
          <el-table-column label="客单价" prop="train_avgmoney" />
          <el-table-column label="比赛总单数" prop="examination_number" />
          <el-table-column label="比赛总收入" prop="examination_summoney" />
          <el-table-column label="客单价" prop="examination_avgmoney" />
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
