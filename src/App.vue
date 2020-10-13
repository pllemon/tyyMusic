<template>
  <div id="app">
    <div class="header"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.header{
  height: 50px;
  background-color: #477bf6;
  color: #fff;
  padding: 0 50px;
  display: flex;
  align-items: center;
}
</style>
