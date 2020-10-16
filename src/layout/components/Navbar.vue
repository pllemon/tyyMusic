<template>
  <div class="navbar fx-cb">
    <div class="fx-cs">
      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <p class="page-title">{{$route.meta.title}}</p>
    </div>

    <el-button type="text" @click="back" v-show="$route.meta.inlinePage">返回</el-button>
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
