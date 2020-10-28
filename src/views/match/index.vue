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
        <el-button size="small" type="primary" @click="setting()">新建比赛</el-button>
        <el-button size="small" type="primary">导出比赛信息</el-button>
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
          <el-table-column label="比赛名称" prop="title" />
          <el-table-column label="开展时间" prop="activity_time" />
          <el-table-column label="比赛状态" prop="status">
            <template slot-scope="scope">
              {{scope.row.status == 1 ? '启用' : '禁用'}}
            </template>
          </el-table-column>
          <el-table-column label="比赛费用" prop="money" />
          <el-table-column label="报名人数" prop="sumper" />
          <el-table-column label="已收费用" prop="summoney" />
          <el-table-column label="操作"  fixed="right" width="250">
            <template slot-scope="scope">
              <el-button type="text" @click="signRecord(scope.row.id)">查看报名</el-button>
              <el-button type="text" @click="setting(scope.row.id)">查看成绩</el-button>
              <el-button type="text" @click="setting(scope.row.id)">配置比赛</el-button>
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
import { examinationList } from '@/api/examination'
import SettingDialog from '@/views/match/setting'

export default {
  mixins: [ListMixin],
  components: {
    SettingDialog
  },
  data() {
    return {
      api: {
        getList: examinationList
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
