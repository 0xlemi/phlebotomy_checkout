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

  totalPrice: state => {
    return state.courseCost + state.examFeeCost + state.insuranceCost;
  },
  hasIntroQuestion: state => {
    return (state.state == 'CA' || state.state == 'TN');
  },
  hasSecondQuestion: state => {
      return (state.state == 'CA' || state.state == 'OH');
  }

}

// actions
const actions = {

  loadData: async function (context) {

    axios.get(process.env.VUE_APP_API_URL+'api/course/4584')
      .then((response) => {
        if(response.data.success == true){
          // Set all the information to
          var data = response.data.course;
          state.valid = "finished";
          state.name = data.formatted_name;
          state.state = data.city.state.abbreviation;
          state.termsOfServiceLink = data.enrollment_agreement;
          state.courseCost = data.cost;
          state.examFeeCost = data.exam_cost;
          state.insuranceCost = data.insurance_cost;
          state.depositAmount = data.deposit;

          // if (this.courseInfo.state == 'TN') {
          //   this.getExamDates(data.end_date);
          // }

          // this.currentForm = (this.courseInfo.state == 'CA' || this.courseInfo.state == 'TN') ? 1 : 2;
        }
        else{
          // The course does not exist
          state.valid = false;
        }
      })
      .catch((error) => {
        state.valid = false;
        // Generice error telling to call and try again later
          // this.error = {
          //   status: true,
          //   type: 'Not Found',
          //   message: 'There was an error, please call 888-531-8378 or try again another course.'
          // };
          // go to the top of the screen so the user can see the error
          window.scroll(0,0);
          console.log(error);
      });

  }

}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
