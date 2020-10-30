<template>
  <div class="navbar fx-cb">
    <div class="fx-cs">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <p class="page-title">{{$route.meta.title}}</p>
    </div>
    <div>
      <el-button type="text" @click="back" v-show="$route.meta.inlinePage"><i class="el-icon-back"></i>返回</el-button>
      <el-button type="text" @click="refresh" ><i class="el-icon-refresh-left"></i>刷新</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    back() {
      this.$router.go(-1)
    },
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title{
  font-size: 18px;
  font-weight: bold;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding-right: 10px;
}
</style>
