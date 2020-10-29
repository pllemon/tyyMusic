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
        <el-button size="small" type="primary">导出用户信息</el-button>
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
          <el-table-column label="报名人" prop="guardian" />
          <el-table-column label="联系方式" prop="phone" />
          <el-table-column label="出生年月日" prop="birthday" />
          <el-table-column label="身份证号码" prop="peopleid" />
          <el-table-column label="参数组别" prop="" />
          <el-table-column label="奖项" prop="" />
          <el-table-column label="指导老师" prop="instructor" />
          <el-table-column label="联系方式" prop="instructor_phone" />
          <el-table-column label="操作" prop="action" width="200">
            <template slot-scope="scope">
              <el-button type="text" >查看更多</el-button>
              <el-button type="text" >查看曲目</el-button>
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
import { signUpList } from '@/api/examination'

export default {
  mixins: [ListMixin],
  data() {
    return {
      query: {
        examination_id: ''
      },
      api: {
        getList: signUpList
      },
      mes: {}
    }
  },
  created() {
    this.query.examination_id = this.$route.query.id
    this.getList()
  },
  methods: {
    afterGetList(data) {
      this.list = data.list
      this.mes = data.info
    }
  }
}
</script>
