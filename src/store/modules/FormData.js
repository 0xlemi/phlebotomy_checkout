
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
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',

  // ***** Form4 *******
  payFull: false,
  billingName: '',
  billingNumber: '',
  exp: '',
  code: '',
  // type is in getter
  sameBilling: "true", // Is easier to use a string for radio buttons
  // nationalExamId: null,
  billingAddress1: '',
  billingAddress2: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
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
};

// getters
const getters = {

  formatedNumber: state => {
    let result = false;
    if(state.number.length == 10){
      result = state.number.match(/(\d{3})(\d{3})(\d{4})/);
    }
    return result ? `(${result[1]}) ${result[2]}-${result[3]}` : '';
  },
  formatedDob: state => {
    let result = false;
    if(state.dob.length == 8){
      result = state.dob.match(/(\d{2})(\d{2})(\d{4})/);
    }
      return result ? `${result[1]}/${result[2]}/${result[3]}` : '';
  },
  // formatedExp: state => {
  //   if(state.exp.length == 4){
  //     return state.exp.match(/(\d{2})(\d{2})/);
  //   }
  //   return false;
  // },
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

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
