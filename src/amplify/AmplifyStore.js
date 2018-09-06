import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    userId: null,
    userVerification: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setUserVerification(state, data) {
      state.userVerification = data
    }
  }
});

export default store
