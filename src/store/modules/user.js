import { login, outlogin } from '@/api/common'
import { getDetails } from '@/api/common'
import { getToken, setToken, removeToken, setLoginStorage, removeLoginStorage, setAccountId, getAccountId, removeAccountId } from '@/utils/auth'

const state = {
  userInfo: null
}

const mutations = {
  SET_USERINFO: (state, info) => {
    state.userInfo = info
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password, remember } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username, password: password }).then(response => {
        const { data } = response
        // 记住密码
        if (!remember) {
          setLoginStorage(userInfo)
        } else {
          removeLoginStorage()
        }
        setToken(data.session)
        // setAccountId(data.admininfo.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 个人信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getDetails({
        admin_id: getAccountId()
      }).then(response => {
        const { data } = response
        commit('SET_USERINFO', data)
        resolve(data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      outlogin({}).then(response => {
        removeToken()
        removeAccountId()
        resolve()
        resolve(data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

