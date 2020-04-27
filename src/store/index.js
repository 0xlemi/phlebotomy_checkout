import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import FormData from './modules/FormData';
import CourseInformation from './modules/CourseInformation';
import ErrorMessage from './modules/ErrorMessage';

export default new Vuex.Store({
  modules: {
    formData:  FormData,
    courseInformation:  CourseInformation,
    errorMessage:  ErrorMessage
  }
})
