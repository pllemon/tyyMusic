<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" type="index" width="50"/>
      <el-table-column label="微信名" prop="title" />
      <el-table-column label="姓名" prop="title" />
      <el-table-column label="身份证信息" prop="title" />
      <el-table-column label="联系方式" prop="title" />
      <el-table-column label="原价格" prop="title" />
      <el-table-column label="购买类型" prop="title" />
      <el-table-column label="价格" prop="title" />
      <el-table-column label="付费时间" prop="title" />
      <el-table-column label="付款状态" prop="title" />
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      loading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getList().then(response => {
        this.list = response.data.items
        this.loading = false
      })
    },

    signRecord(id) {
      
    },

    setting(id) {

    }
  }
}
</script>
