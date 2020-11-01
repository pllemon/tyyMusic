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
        <el-button size="small" type="primary" @click="exportExcel()">导出用户信息</el-button>
      </template>

      <template>
        <!-- 导出 -->
        <form ref="exportForm" action="/admin/userlist" method="get" style="display:none">
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
          <el-table-column label="联系方式" prop="phone" />
          <el-table-column label="注册时间" prop="time" />
          <el-table-column label="最后登录时间" prop="login_time" />
        </el-table>
      </template>

      <template slot="page">
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
import { getList } from '@/api/user'

export default {
  mixins: [ListMixin],
  data() {
    return {
      api: {
        getList
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    afterGetList(data) {
      this.list = data.data
      this.total = data.total
    }
  }
}
</script>
