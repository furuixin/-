import {setToken,getToken,removeToken} from '@/utils/auth'
import {login,getUserInfo} from '@/api/user'


const state = ()=>{
  return {
     token:getToken(),
     userInfo:{}
  }
}

const mutations={
  setToken(state,token){
    console.log(token)
    state.token=token
    setToken(token)
  },
  removeToken(state){
    state.token = null
    removeToken()
  },
  setUserInfo(state,user){
    state.userInfo = user
  }
}

const actions = {
 async login({commit},data){
   let res = await login(data)
    commit('setToken',res)
  } ,
  async getUserInfo({commit}) {
    const result = await getUserInfo()
    commit('setUserInfo',result)
    return result
  },
   logout({commit}){
    commit('removeToken')
    commit('setUserInfo',{})
     
  }
}


export default {
  namespaced:true,
  state,
  mutations,
  actions
}