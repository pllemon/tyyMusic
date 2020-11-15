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
        <el-button size="small" type="primary" @click="uploadExcel()">导入用户</el-button>
        <el-button size="small" type="primary" @click="exportExcel()">导出用户</el-button>
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
          <el-table-column label="用户名" prop="username" />
          <el-table-column label="联系方式" prop="phone" />
          <el-table-column label="身份证" prop="peopleid" />
          <el-table-column label="机构" prop="mechanism" />
          <el-table-column label="注册时间" prop="time" />
          <el-table-column label="最后登录时间" prop="login_time" />
          <el-table-column label="是否vip" prop="is_vip">
            <template slot-scope="scope">
              {{scope.row.is_vip == 1 ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="action">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.is_vip == 0" @click="setVip(scope.row.peopleid, 1)">设置vip</el-button>
              <el-button type="text" v-if="scope.row.is_vip == 1" @click="setVip(scope.row.peopleid, 0)">取消vip</el-button>
            </template>
          </el-table-column>
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
import { getList, setvipuser } from '@/api/user'
import UploadDialog from '@/views/userlist/upload'

export default {
  mixins: [ListMixin],
  components: {
    UploadDialog,
  },
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
    uploadExcel() {
      this.loadComponent('UploadDialog', {})
    },

    setVip(peopleid, is_vip) {
      setvipuser({
        peopleid,
        is_vip
      }).then(res => {
        this.$common.successNotify()
        this.getList()
      })
    },

    afterGetList(data) {
      this.list = data.data
      this.total = data.total
    }
  }
}
</script>
