// initial state
const state = {
  valid: "loading",
  id: null,
  name: null,
  state: null,
  termsOfServiceLink: null,
  courseCost: null,
  examFeeCost: null,
  insuranceCost: null,
  depositAmount: null
}

// mutations
const mutations = {

}

// getters
const getters = {
  hasSecondQuestion: state => {
      return (state.state == 'CA' || state.state == 'OH');
  }
}

// actions
const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
