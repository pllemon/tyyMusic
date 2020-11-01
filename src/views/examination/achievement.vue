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
          <el-table-column label="考生姓名" prop="name" />
          <el-table-column label="报考专业" prop="major" />
          <el-table-column label="报考级别" prop="level" />
          <el-table-column label="考试科目" prop="subject" />
          <el-table-column label="考试结果" prop="result" />
          <el-table-column label="身份证号" prop="peopleid" />
          <el-table-column label="准考证号" prop="ticket" />
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
import { achievementList } from '@/api/examination'

export default {
  mixins: [ListMixin],
  data() {
    return {
      query: {
        examination_id: ''
      },
      api: {
        getList: achievementList
      },
      mes: {}
    }
  },
  created() {
    this.query.examination_id = this.$route.query.id
    this.getList()
  }
}
</script>
