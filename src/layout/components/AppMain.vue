<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view  v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view  v-if="!$route.meta.keepAlive"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  width: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
  height: 0;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
