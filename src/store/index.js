import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import CheckoutData from './modules/CheckoutData';
import CourseInformation from './modules/CourseInformation';
import ErrorMessage from './modules/ErrorMessage';
import FormData from './modules/FormData';
import ResponseData from './modules/ResponseData';

export default new Vuex.Store({
  modules: {
    checkoutData:  CheckoutData,
    courseInformation:  CourseInformation,
    errorMessage:  ErrorMessage,
    formData:  FormData,
    responseData:  ResponseData
  }
})
