<template>
  <div class="list-content">
    <list-layout>
      <template slot="search">
        <div class="fx-cs">
          <el-input size="small" style="width:300px" tpye="text" placeholder="请输入关键字进行搜索" />
          <el-button size="small">搜索</el-button>
        </div>
      </template>

      <template slot="action">
        <el-button size="small" type="primary">新建课程</el-button>
        <el-button size="small" type="primary">导出课程信息</el-button>
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
          <el-table-column label="微信名" fixed prop="status" />
          <el-table-column label="姓名" prop="status" />
          <el-table-column label="身份证信息" prop="status" />
          <el-table-column label="联系方式" prop="status" />
          <el-table-column label="原价格" prop="status" />
          <el-table-column label="购买类型" prop="status" />
          <el-table-column label="价格" prop="status" />
          <el-table-column label="付费时间" prop="status" />
          <el-table-column label="付款状态" prop="status" />
          <el-table-column label="操作"  fixed="right" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="signRecord(scope.row.id)">查看报名</el-button>
              <el-button type="text" @click="setting(scope.row.id)">配置活动</el-button>
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
import { getList } from '@/api/training'
import SettingDialog from '@/views/course/setting'

export default {
  mixins: [ListMixin],
  components: {
    SettingDialog
  },
  data() {
    return {
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
      this.$router.push('signRecord?id=' + id)
    },

    setting(id) {
      this.loadComponent('SettingDialog', {id})
    }
  }
}
</script>
