// initial state
const state = {
    status: false,
    type: '',
    message: ''
}

// getters
const getters = {

}

// actions
const actions = {

  clear: function (context) {
    context.commit('updateStatus', false);
    context.commit('updateType', '');
    context.commit('updateMessage', '');
  }

}

// mutations
const mutations = {

  updateStatus(state, payload) {
    state.status = payload;
  },
  updateType(state, payload) {
    state.type = payload;
  },
  updateMessage(state, payload) {
    state.message = payload;
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
