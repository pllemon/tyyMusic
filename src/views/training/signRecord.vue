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
          <el-table-column label="姓名" prop="signup_name" />
          <el-table-column label="身份证信息" prop="peopleid" />
          <el-table-column label="联系方式" prop="phone" />
          <el-table-column label="原价格" prop="money" />
          <el-table-column label="购买类型" prop="type" />
          <el-table-column label="价格" prop="should_pay_money" />
          <el-table-column label="付费时间" prop="pay_time" />
          <el-table-column label="付款状态" prop="pay_status">
            <template slot-scope="scope">
              {{scope.row.pay_status == 1 ? '已付款' : '未付款'}}
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
import { signUpList } from '@/api/training'

export default {
  mixins: [ListMixin],
  data() {
    return {
      query: {
        train_id: ''
      },
      api: {
        getList: signUpList
      },
      mes: {}
    }
  },
  created() {
    this.query.train_id = this.$route.query.id
    this.getList()
  },
  methods: {
    afterGetList(data) {
      console.log(data)
      this.list = data.list.data
      this.mes = data.info
    }
  }
}
</script>
