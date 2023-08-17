import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user'
import app from './modules/app'
import settings from './modules/settings'
import routersMol from './modules/myrouter'
import getters from './getters'

const store = new Vuex.Store({
    modules:{
      user,
      settings,
      app,
      routersMol
    },
    getters
})

export default store
