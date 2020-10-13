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
      <el-table-column label="课程名称" prop="title" />
      <el-table-column label="开展时间" prop="title" />
      <el-table-column label="教授老师" prop="title" />
      <el-table-column label="原价格" prop="title" />
      <el-table-column label="早鸟价格" prop="title" />
      <el-table-column label="团购价格" prop="title" />
      <el-table-column label="优惠价格" prop="title" />
      <el-table-column label="报名人数" prop="title" />
      <el-table-column label="已收费用" prop="title" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="signRecord(scope.row.id)">查看报名</el-button>
          <el-button type="text" @click="setting(scope.row.id)">配置活动</el-button>
        </template>
      </el-table-column>
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
