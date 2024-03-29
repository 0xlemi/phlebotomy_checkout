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
  depositAmount: null,
  // Success Page
  formattedTimes: null,
  // TN Specific
  availableForPayment: false,
  examDates: {
  },
}

// mutations
const mutations = {

}

// getters
const getters = {


  totalPrice: (state, getters, rootState) => {
    if (state.state == 'CA') {
      return state.courseCost + state.examFeeCost + state.insuranceCost;
    }else if (state.state == 'TN') {
      return state.courseCost + state.examFeeCost + state.insuranceCost;
    }else {
      return state.courseCost + state.examFeeCost + state.insuranceCost;
      // return state.courseCost + state.examFeeCost + state.insuranceCost +  (rootState.formData.hasNationalExam ? 100 : 0);
    }
  },
  remainingBalance:(state, getters) => {
    return getters.totalPrice - state.depositAmount;
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

  loadData: async function (context, courseId) {

    if (courseId) {
      axios.get(process.env.VUE_APP_API_URL+'api/course/'+ courseId)
        .then((response) => {
          if(response.data.success == true){
            // Set all the information to
            var data = response.data.course;
            state.id = courseId;
            state.valid = "finished";
            state.name = data.formatted_name;
            state.state = data.city.state.abbreviation;
            state.termsOfServiceLink = data.enrollment_agreement;
            state.courseCost = data.cost;
            state.examFeeCost = data.exam_cost;
            state.insuranceCost = data.insurance_cost;
            state.depositAmount = data.deposit;

            state.formattedTimes = data.formatted_times;


            if (state.state == 'TN') {
              state.availableForPayment = data.available_for_payment;
              context.dispatch('loadExamDates', courseId);
            }else if (state.state == 'CA') {

            }else {
              // if there is anything else we need one less step for the form
              context.commit('checkoutData/updateNumForm', 4, {root:true} );
            }

            // ***************** Comented out for testing ***************88
            // If is anything other than CA or TN skip the first step
            // let currentForm = (state.state == 'CA' || state.state == 'TN') ? 1 : 2;
            // context.commit('checkoutData/updateCurrentForm', currentForm, {root:true} );

          }
          else{
            // The course does not exist
            state.valid = false;
          }
        })
        .catch((error) => {
          state.valid = false;
          // Generice error telling to call and try again later
          context.commit('errorMessage/updateStatus', true, {root:true} );
          context.commit('errorMessage/updateType', 'Not Found', {root:true} );
          context.commit('errorMessage/updateMessage', 'There was an error, please call 888-531-8378 or try again another course.', {root:true} );

          // go to the top of the screen so the user can see the error
          window.scroll(0,0);
          console.log(error);
        });

      }
      else {
        state.valid = false;
      }

  },

  loadExamDates: async function(context, courseId) {

    axios.get(process.env.VUE_APP_API_URL+'api/course/'+ courseId +'/national_exams')
      .then((response) => {
        let nationalExams = response.data.national_exams.map(function(object) {
          return {
            id: object.id,
            date: object.start_date,
            dayOfTheWeek: object.formatted_days,
            formattedDate: object.formatted_dates+' '+object.start_date.slice(0,4),
            time: object.formatted_times
          };
        });
        context.commit('formData/updateNationalExamId', nationalExams[0].id, {root:true} );
        state.examDates = nationalExams;
      })
      .catch((error) => {
        state.valid = false;
        // Generice error telling to call and try again later
        context.commit('errorMessage/updateStatus', true, {root:true} );
        context.commit('errorMessage/updateType', 'Exam List Not Found', {root:true} );
        context.commit('errorMessage/updateMessage', 'There was an error, please call 888-531-8378 or try again another course.', {root:true} );

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
