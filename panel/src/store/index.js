import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token'),
  },
  getters: {
  },
  mutations: {
    //es como el metodo set
    //actualizar el valor del state
    setToken(state,token){
      state.token=token;
    }

  },
  actions: {
    //actualiza un token
    saveToken({commit},token){
      commit('setToken',token);

      localStorage.setItem('token',token)
    }
  },
  modules: {
  }
})
