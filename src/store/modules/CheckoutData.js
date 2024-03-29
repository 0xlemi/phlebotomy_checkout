// initial state
const state = {
  currentForm: 1,
  numForms: 5,
  loading: false
}

// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {

  incrementCurrentForm(state, payload){
    state.currentForm = state.currentForm + 1;
  },
  decrementCurrentForm(state, payload){
    state.currentForm = state.currentForm - 1;
  },

  updateCurrentForm(state, payload) {
    state.currentForm = payload;
  },
  updateLoading(state, payload) {
    state.loading = payload;
  },
  updateNumForm(state, payload) {
    state.numForms = payload;
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
