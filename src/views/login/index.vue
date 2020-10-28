<template>
  <div class="login-container">
    <!-- <img class="ch" src='../../assets/image/bg2.png'/> -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">管理平台</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
import { getLoginStorage } from '@/utils/auth'
export default {
  name: 'Login',
  data() {
    return {
      isSaveLoginInfo: '',
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur'}],
        password: [{ required: true, trigger: 'blur'}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.loginForm = getLoginStorage()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(err => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #353535;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #353535;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    border-bottom: 1px solid #999;
    border-radius: 0;
    margin-bottom: 20px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: -webkit-linear-gradient(45deg, #4279de, #1396fa);
  .ch{
    max-width: 50%;
  }
  .login-form {
    position: relative;
    width: 420px;
    max-width: 90%;
    padding: 50px;
    overflow: auto;
    background: #fff;
    border-radius: 10px;
    margin-left: 8%;
    flex-shrink: 0;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 28px;
      color: #161515;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      margin-bottom: 50px;
      margin-top: 20px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.logo{
  position: fixed;
  top: 0px;
  right: 10px;
  width: 80px;
}

.el-button{
  margin-top: 50px;
  border-radius: 30px;
  font-size: 20px;
  background: -webkit-linear-gradient(right, #4279de, #1396fa);
  height: 50px;
  border: none;
}


@media screen and (max-width: 1000px) {
  .login-container{
    flex-direction: column;
    .ch{
      max-width: 400px;
      width: 100%;
    }
    .login-form{
      margin-left: 0;
    }
  }
}

@media screen and (max-width: 500px) {
  .login-container{
    .ch{
      max-width: 300px;
    }
    .login-form{
      margin-bottom: 20px;
      padding: 30px;
    }
    .el-button{
      margin-top: 30px;
    }
    .title-container {
      .title{
        margin-bottom: 30px;
      }
    }
  }
}
</style>
