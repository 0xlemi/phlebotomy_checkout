
// initial state
const state = {

  // ***** Form1 *******
  firstTest: true,

  // ***** Form2 *******
  name: 'pepe',
  lastName: 'Gonzales',
  email: 'pepe@gmail.com',
  number: '2340982348',
  dob: '03221993',
  ssn: '1234',

  // ***** Form3 *******
  address: '1234 Santa Monica',
  address2: 'Santa M. Condo',
  city: 'San Antonio',
  state: 'TX',
  zip: '78201',

  // ***** Form4 *******
  payFull: false,
  billingName: '',
  billingNumber: '',
  exp: '',
  code: '',
  // type is in getter
  sameBilling: "true", // Is easier to use a string for radio buttons
  billingAddress1: '',
  billingAddress2: '',
  billingCity: '',
  billingState: '',
  billingZip: '',

  // TN Form Data Extra
  hasNationalExam: true,
  nationalExamId: null
}

// mutations
const mutations = {
  // ***** Form1 *******
  updateFirstTest(state, payload) {
    state.firstTest = payload;
  },

  // ***** Form2 *******
  updateEmail(state, payload) {
    state.email = payload;
  },
  updateName(state, payload) {
    state.name = payload;
  },
  updateLastName(state, payload) {
    state.lastName = payload;
  },
  updateNumber(state, payload) {
    state.number = payload;
  },
  updateDob(state, payload) {
    state.dob = payload;
  },
  updateSsn(state, payload) {
    state.ssn = payload;
  },

  // ***** Form3 *******
  updateAddress(state, payload) {
    state.address = payload;
  },
  updateAddress2(state, payload) {
    state.address2 = payload;
  },
  updateCity(state, payload) {
    state.city = payload;
  },
  updateState(state, payload) {
    state.state = payload;
  },
  updateZip(zip, payload) {
    state.zip = payload;
  },

  // ***** Form4 *******
  updatePayFull(state, payload) {
    state.payFull = payload;
  },
  updateBillingName(state, payload) {
    state.billingName = payload;
  },
  updateBillingNumber(state, payload) {
    state.billingNumber = payload;
  },
  updateExp(state, payload) {
    state.exp = payload;
  },
  updateCode(state, payload) {
    state.code = payload;
  },
  updateSameBilling(state, payload) {
    state.sameBilling = payload;
  },
  updateBillingAddress1(state, payload) {
    state.billingAddress1 = payload;
  },
  updateBillingAddress2(state, payload) {
    state.billingAddress2 = payload;
  },
  updateBillingCity(state, payload) {
    state.billingCity = payload;
  },
  updateBillingState(state, payload) {
    state.billingState = payload;
  },
  updateBillingZip(state, payload) {
    state.billingZip = payload;
  },

  // TN Specific
  updateHasNationalExam(state, payload) {
    state.hasNationalExam = payload;
  },
  updateNationalExamId(state, payload) {
    state.nationalExamId = payload;
  },
};

// getters
const getters = {

  formatedNumber: (state, getters) => {
    let value = getters.explodedNumber;
    return value ? `(${value[1]}) ${value[2]}-${value[3]}` : '';
  },
  formatedDob: (state, getters) => {
    let value = getters.explodedDob;
    return value ? `${value[1]}/${value[2]}/${value[3]}` : '';
  },
  explodedNumber: state => {
    if(state.number.length == 10){
      return state.number.match(/(\d{3})(\d{3})(\d{4})/);
    }
    return false;
  },
  explodedDob: state => {
    if(state.dob.length == 8){
      return state.dob.match(/(\d{2})(\d{2})(\d{4})/);
    }
    return false;
  },
  explodedExp: state => {
    if(state.exp.length == 4){
      return state.exp.match(/(\d{2})(\d{2})/);
    }
    return false;
  },
  cardType: state => {
    let visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let mastercard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    let discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    let amex = /^3[47][0-9]{13}$/;

    let result = {
      name:'other',
      icon: 'default'
    };
    if (visa.test(state.billingNumber)){
      result = {
        name:'visa',
        icon: 'visa'
      };
    }
    else if (mastercard.test(state.billingNumber)) {
      result = {
        name:'mastercard',
        icon: 'mastercard-old'
      };
    }
    else if (discover.test(state.billingNumber)) {
      result = {
        name:'discover',
        icon: 'discover'
      };
    }
    else if (amex.test(state.billingNumber)) {
      result = {
        name:'amex',
        icon: 'amex'
      };
    }
    return result;
  }

};


// actions
const actions = {

  submitData: async function(context) {
    let isTN = context.rootState.courseInformation.state == 'TN';
    if(isTN){
      context.dispatch('basicRequest', process.env.VUE_APP_API_URL+'api/tn_registration_payment/process');
    }else{
      context.dispatch('basicRequest', process.env.VUE_APP_API_URL+'api/registration/process');
    }
  },

  basicRequest: async function(context, payload) {

    axios.post(payload, {
      payment: {
        amount: state.payFull ? context.rootGetters['courseInformation/totalPrice'] : context.rootState.courseInformation.depositAmount,
        payment_type: "card",
        exam_payment: state.hasNationalExam, // TN If they are going to pay the national exam
        course_id: context.rootState.courseInformation.id,
        type: state.payFull ? "full" : "deposit",
        national_exam_id: (state.hasNationalExam) ? state.nationalExamId : null,
        website: "tmp.localhost"
      },
      student: {
        email: state.email,
        name: state.name,
        last_name: state.lastName,
        phone1: context.getters.explodedNumber ? context.getters.explodedNumber[1] : '',
        phone2: context.getters.explodedNumber ? context.getters.explodedNumber[2] : '',
        phone3: context.getters.explodedNumber ? context.getters.explodedNumber[3] : '',
        address: state.address,
        address2: state.address2,
        city: state.city,
        state: state.state,
        zip: state.zip,
        ssn: state.ssn,
        birthMonth: context.getters.explodedDob ? context.getters.explodedDob[1] : '',
        birthDay: context.getters.explodedDob ? context.getters.explodedDob[2] : '',
        birthYear: context.getters.explodedDob ? context.getters.explodedDob[3] : '',
        tos: true
      },
      credit_card: {
        name: state.billingName,
        number: state.billingNumber,
        expiration_month: context.getters.explodedExp ? context.getters.explodedExp[1] : '',
        expiration_year: context.getters.explodedExp ? '20'+context.getters.explodedExp[2] : '',
        code: state.code,
        type: state.type,
        same_billing: state.sameBilling,
      },
      billing_address: {
        address: state.billingAddress1,
        address2: state.billingAddress2,
        city: state.billingCity,
        state: state.billingState,
        zip: state.billingZip
      }
    })
    .then(response => {
      if(response.data.success == true){
        // Set information for the successMessage page
        let data = response.data.enrollment.course;

        context.commit('responseData/updateLink', "https://students.phlebotomyusa.com/account/student/" + data.city.token, {root:true} );
        context.commit('responseData/updateDateStart', data.modules.distribution[0], {root:true} );
        context.commit('responseData/updateDateEnd', data.modules.distribution[data.modules.distribution.length - 1], {root:true} );
        context.commit('responseData/updateTimeStart', data.modules.distribution[0], {root:true} );
        context.commit('responseData/updateTimeEnd', data.hours_end, {root:true} );
        context.commit('responseData/updateCity', data.city.map_city, {root:true} );

        context.commit('checkoutData/incrementCurrentForm', null, {root:true} );
      }
      else{
        // Showing error coming from the server
        context.commit('errorMessage/updateStatus', true, {root:true} );
        context.commit('errorMessage/updateType', response.data.type, {root:true} );
        context.commit('errorMessage/updateMessage', response.data.error, {root:true} );
        window.scroll(0,0);
      }

      context.commit('checkoutData/updateLoading', false, {root:true} );
    })
    .catch(error => {
      // Generice error telling to call and try again later
      context.commit('errorMessage/updateStatus', true, {root:true} );
      context.commit('errorMessage/updateType', 'Server', {root:true} );
      context.commit('errorMessage/updateMessage', 'You are not subscribed, please call 888-531-8378 or try again later.', {root:true} );
      // go to the top of the screen so the user can see the error
      window.scroll(0,0);
      console.log(error);

      context.commit('checkoutData/updateLoading', false, {root:true} );
    });
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
