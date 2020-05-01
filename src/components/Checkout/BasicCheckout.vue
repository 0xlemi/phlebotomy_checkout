<template>
<div class="flex">

  <!-- Left side of checkout -->
  <div class="w-full lg:w-3/5 border-r-2 bg-red-100 border-red-200">

    <error-message></error-message>

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

        <div>
          <form-payment v-if="currentForm == 4" :loading="loading" v-on:next="submit" v-on:back="back" ></form-payment>
        </div>


        <success-message v-if="currentForm == 5"></success-message>

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
import ErrorMessage from './Elements/ErrorMessage.vue'

import FormEnglish from './Forms/FormEnglish.vue'
import FormTranscripts from './Forms/FormTranscripts.vue'
import FormBasic from './Forms/FormBasic.vue'
import FormAddress from './Forms/FormAddress.vue'
import FormPayment from './Forms/FormPayment.vue'
import SuccessMessage from './Forms/SuccessMessage.vue'

import DefaultSideBar from './SideBar/DefaultSideBar.vue'

export default {
  components: {
    'progress-bar' : ProgressBar,
    'error-message' : ErrorMessage,
    'form-english' : FormEnglish,
    'form-transcripts' : FormTranscripts,
    'form-basic' : FormBasic,
    'form-address' : FormAddress,
    'form-payment' : FormPayment,
    'success-message' : SuccessMessage,

    'default-side-bar': DefaultSideBar
  },
  methods: {
    next: function(event) {
      if(this.currentForm <= 4){
        this.$store.commit('checkoutData/incrementCurrentForm');
        this.$emit('changeForm', this.currentForm);
      }
    },
    back: function(event) {
      if(this.currentForm > 1){
        this.$store.commit('checkoutData/decrementCurrentForm');
        this.$emit('changeForm', this.currentForm);
      }
    },
    submit: function(event) {
      this.$store.commit('checkoutData/updateLoading', true);
      this.$store.dispatch('formData/submitData');
    }
  },
  computed: {
    ...mapState('checkoutData', [
      'loading',
      'currentForm'
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
    // Get Curse Information From Server
    this.$store.dispatch('courseInformation/loadData', this.$route.query.c);
  }
}
</script>
