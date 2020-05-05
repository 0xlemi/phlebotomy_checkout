// initial state
const state = {
  link: '',
  enrollmentId: '',
  studentId: '',
  dateStart: '',
  dateEnd: '',
  timeStart: '',
  timeEnd: '',
  city: ''
}

// getters
const getters = {

  // formatedStartDate: (state, getters) => {
  //   let date = new Date(state.dateStart);
  // },
  // formatedEndDate: (state, getters) => {
  //
  // }

}

// actions
const actions = {

}

// mutations
const mutations = {

  updateLink(state, payload) {
    state.link = payload;
  },
  updateEnrollmentId(state, payload) {
    state.enrollmentId = payload;
  },
  updateStudentId(state, payload) {
    state.studentId = payload;
  },
  updateDateStart(state, payload) {
    state.dateStart = payload;
  },
  updateDateEnd(state, payload) {
    state.dateEnd = payload;
  },
  updateTimeStart(state, payload) {
    state.timeStart = payload;
  },
  updateTimeEnd(state, payload) {
    state.timeEnd = payload;
  },
  updateCity(state, payload) {
    state.city = payload;
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
