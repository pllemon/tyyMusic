<template>
  <div class="list-content">
    <list-layout>
      <template slot="search">
        <div class="fx-cs">
          <el-input size="small" v-model="query.keyword" clearable style="width:300px" tpye="text" placeholder="请输入关键字进行搜索" />
          <el-button size="small" @click="search">搜索</el-button>
        </div>
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
          <el-table-column label="分享时间" prop="time" />
          <el-table-column label="分享人" fixed prop="nickname" />
          <el-table-column label="手机号码" prop="phone" />
          <el-table-column label="分享内容" prop="desc" />
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
import { shareLoglist } from '@/api/common'

export default {
  mixins: [ListMixin],
  data() {
    return {
      api: {
        getList: shareLoglist
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
