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
        <el-button size="small" type="primary" @click="setting()">新建课程</el-button>
        <el-button size="small" type="primary" @click="exportExcel()">导出课程信息</el-button>
      </template>

      <template>
        <!-- 导出 -->
        <form ref="exportForm" action="/admin/craftsmanlist" method="post" style="display:none">
          <input name="model" value="exportToExcel" />
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
          <el-table-column label="课程名称" fixed prop="title" />
          <el-table-column label="开展时间" prop="activity_time" />
          <el-table-column label="教授老师" prop="tutor" />
          <el-table-column label="原价格" prop="money" />
          <el-table-column label="早鸟价格" prop="time" />
          <el-table-column label="团购价格" prop="number" />
          <el-table-column label="优惠价格" prop="age" />
          <el-table-column label="报名人数" prop="sumper" />
          <el-table-column label="已收费用" prop="summoney" />
          <el-table-column label="操作"  fixed="right" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="signRecord(scope.row.train_id)">查看报名</el-button>
              <el-button type="text" @click="setting(scope.row.train_id)">配置活动</el-button>
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
import SettingDialog from '@/views/training/setting'
import { trainList } from '@/api/training'

export default {
  mixins: [ListMixin],
  components: {
    SettingDialog
  },
  data() {
    return {
      api: {
        getList: trainList
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    signRecord(id) {
      this.$router.push('signRecord?id=' + id)
    },

    setting(id) {
      this.loadComponent('SettingDialog', {id})
    }
  }
}
</script>
