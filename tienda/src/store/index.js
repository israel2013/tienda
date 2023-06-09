import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:localStorage.getItem('token'),
    user:localStorage.getItem('user_data'),
  },
  getters: {
  },
  mutations: {
    //es como el metodo set
    //actualizar el valor del state
    setToken(state,token){
      state.token=token;
    },
    setUser(state,user){
      state.user=user;
    },

  },
  actions: {
    //actualiza un token
    saveToken({commit},token){
      commit('setToken',token);
      localStorage.setItem('token',token)
    },
       //actualiza un token
       saveUser({commit},user){
        commit('setUser',user);
        localStorage.setItem('user_data',user)
      },
    logout({commit}){
      commit('setToken',null);
      localStorage.clear();
    }
  },
  modules: {
  }
})
