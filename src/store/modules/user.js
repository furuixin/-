import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
const getDefaultState = () => {
  return {
    //  token:null
    token: getToken(),
    userInfo: {}
  }
}
const state = getDefaultState()
const mutations = {
  // 存token
  setToken(state, token) {
    state.token = token
    // 本地存储
    setToken(token)
  },
  // 删token
  removeToken(state) {
    state.token = null
    // 删除本地
    removeToken()
  },
  // 存储用户资料
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  // 登录的请求的方法
  async login(state, data) {

    let res = await login(data)
    console.log(res.data)
    //  提交commit 存储token
    state.commit('setToken', res.data)
  },
  // 异步获取用户资料
  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    commit('setUserInfo', result.data)
  },
  logout({commit}){
    //  删除token
    commit('removeToken')
    // 删除用户资料
    commit('setUserInfo',{})
}
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}