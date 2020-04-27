<template>
<div class="flex">
  <!-- Left side of checkout -->
  <div class="w-full lg:w-3/5 border-r-2 bg-red-100 border-red-200">

    <!-- Error -->
    <div v-if="status" class="p-4">
      <div class="flex bg-red-200 border-2 border-red-500 text-red-800 px-4 py-3 rounded relative" role="alert">
        <div>
          <strong class="font-bold mr-2">Error with {{ type }}!</strong>
          <span class="block">{{ message }}</span>
        </div>
        <div>
          <span @click="clearError" class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      </div>
    </div>
    <!-- End Error -->



    <!-- <div v-if="valid == 'loading'">
      <h2 class="p-10 mb-40 text-2xl text-red-900">
      We are Loading Your Checkout
      </h2>
    </div>
    <div v-else-if="valid == 'finished'"> -->
    <div v-if="valid">

      <progress-bar :step="currentForm" :number-steps="4" class="mx-8 my-6"></progress-bar>


      <div class="mx-8 mt-8">

        <form-english v-if="currentForm == 1 && state == 'CA'" v-on:next="next"></form-english>

        <form-transcripts v-if="currentForm == 1 && state == 'TN'" v-on:next="next"></form-transcripts>

        <div class="hidden lg:block h-56" v-if="currentForm == 1">
        </div>

        <form-basic v-if="currentForm == 2" :has-intro-question="this.hasIntroQuestion" v-on:next="next" v-on:back="back" ></form-basic>

        <form-address v-if="currentForm == 3"v-on:next="next" v-on:back="back" ></form-address>

        <div v-if="state == 'TN'">
          <form-registration v-if="currentForm == 4" :loading="loading" v-on:next="submit" :courseList="examDates" :termsOfServiceLink="termsOfServiceLink" :state="state" v-on:back="back" ></form-registration>
        </div>
        <div v-else>
          <form-payment v-if="currentForm == 4" :loading="loading" v-on:next="submit" :termsOfServiceLink="termsOfServiceLink" :state="state" v-on:back="back" ></form-payment>
        </div>


        <success-message v-if="currentForm == 5" :values="responseData" ></success-message>

      </div>

    </div>
    <div v-else class="p-10 mb-32 text-2xl text-red-900">
      <h2 class="mb-6">
        We couldn't find that course.
      </h2>
      <h3 class="text-xl">
        Please try another one <a href="https://www.phlebotomyusa.com/phlebotomy-school-locations/" class="hover:text-blue-700 text-blue-500 underline font-bold">HERE</a>. Or call 888-531-8378</h3>
    </div>

  </div>
  <!-- End left side of checkout -->

  <!-- Right side of checkout -->
  <div class="hidden lg:block w-2/5">

    <default-side-bar :current-form="currentForm"></default-side-bar>

  </div>
  <!-- End right side of checkout -->
</div>

</template>


<script>
import { mapState, mapMutations, mapGetters } from 'vuex'


import ProgressBar from './Elements/ProgressBar.vue'
import FormEnglish from './Forms/FormEnglish.vue'
import FormTranscripts from './Forms/FormTranscripts.vue'
import FormBasic from './Forms/FormBasic.vue'
import FormAddress from './Forms/FormAddress.vue'
import FormPayment from './Forms/FormPayment.vue'
import FormRegistration from './Forms/FormRegistration.vue'
import SuccessMessage from './Forms/SuccessMessage.vue'

import DefaultSideBar from './SideBar/DefaultSideBar.vue'

export default {
  components: {
    'progress-bar' : ProgressBar,
    'form-english' : FormEnglish,
    'form-transcripts' : FormTranscripts,
    'form-basic' : FormBasic,
    'form-address' : FormAddress,
    'form-payment' : FormPayment,
    'form-registration' : FormRegistration,
    'success-message' : SuccessMessage,

    'default-side-bar': DefaultSideBar
  },
  methods: {
    next: function(event) {
      if(this.currentForm <= 4){
        this.currentForm++;
        this.$emit('changeForm', this.currentForm);
      }
    },
    back: function(event) {
      if(this.currentForm > 1){
        this.currentForm--;
        this.$emit('changeForm', this.currentForm);
      }
    },
    submit: function(event) {
      this.loading = true;
      // Call sumbint request
    },
    clearError: function () {
      this.error = {
        status: false,
        type: '',
        message: ''
      };
    }
  },
  computed: {
    ...mapState('errorMessage', [
      'status',
      'type',
      'message'
    ]),
    ...mapState('courseInformation', [
      'valid',
      'id',
      'name',
      'state',
      'termsOfServiceLink',
      'courseCost',
      'examFeeCost',
      'insuranceCost',
      'depositAmount'
    ]),
    ...mapGetters('formData', [
      'formatedNumber',
      'formatedDob'
      // 'formatedExp'
    ]),
    ...mapGetters('courseInformation', [
      'totalPrice',
      'hasIntroQuestion'
    ]),
    // exp: function() {
    //   if(this.values.form4.exp.length == 4){
    //     return this.values.form2.dob.match(/(\d{2})(\d{2})/);
    //   }
    //   return false;
    // },
  },
mounted: function() {
    // get the course id from the url
    this.$store.dispatch('courseInformation/loadData', this.$route.query.c);
    //
    // // get counse info here ************8
    //
    // // Make the request to get course information
    // if (this.courseId ) {
    //     }else {
    //   this.valid = false;
    // }
  },
  data: function() {
    return {
      currentForm: 1,
      loading: false,
      // errorData
      examDates: null,
      // formData
      responseData: {
        link: '',
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        city: ''
      }
    }
  }
  }
</script>

<style scoped>
</style>
