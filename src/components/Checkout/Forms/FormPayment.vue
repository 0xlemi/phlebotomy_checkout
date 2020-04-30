<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    National Exam Dates
  </h3>

  <hr class="border-red-300 mt-5">

    <!-- Payment -->
    <div class="flex mt-8">
    </div>
    <!-- End Payment -->

    <national-exam-registration-select v-if="state == 'TN'">
    </national-exam-registration-select>

    <div v-if="!(state == 'TN') || availableForPayment">

      <deposit-full-select></deposit-full-select>

      <billing-fields></billing-fields>

      <billing-address-fields></billing-address-fields>

    </div>


      <hr class="border-red-300 mt-8">

      <!-- Terms of Service -->
      <div class="mt-6">
        <label class="inline-flex">
          <input type="checkbox" v-model="termsOfService" class="focus:outline-red-100 form-checkbox text-red-700 h-5 w-5">
          <span class="ml-2 text-red-900">I have read the <a class="hover:text-blue-700 text-blue-500 underline" target="_blank" :href="termsOfServiceLink">enrollment agreement and privacy policy</a> and agree to the terms listed therein.</span>
        </label>
      </div>
      <div class="mt-4" v-if="hasSecondQuestion">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="secondQuestion" class="focus:outline-red-100 form-checkbox text-red-700 h-5 w-5">
          <span v-if="state == 'CA'" class="ml-2 text-red-900">I am proficient in reading and writing the English Language.</span>
          <span v-else-if="state == 'OH'" class="ml-2 text-red-900">I Understand that the State of Ohio requires that I watch a 5 minute Student Consumer video before I attend class. This link along with instructions will be emailed upon registration</span>
        </label>
      </div>
      <!-- End Terms of Service -->

      <!-- Buttons -->
      <div class="flex mt-10 mb-10">
        <div class="flex-1">
          <button @click="back" type="button" class="underline focus:outline-none  text-red-800 font-semibold hover:text-red-600 py-2 px-4">
             Go Back
          </button>
        </div>
        <div class="flex-1">
          <div class="flex justify-end">
            <button @click="onSubmit" type="submit" :class="{ 'opacity-50 cursor-not-allowed' : !(secondQuestion && termsOfService && !loading) }" class=" focus:outline-none bg-red-800 hover:bg-red-900 text-white font-bold rounded">
              <moon-loader class="px-12 py-4" :loading="loading" color="#FFF5F5" size="25px"></moon-loader>
              <p class="px-8 py-4" v-if="!loading">Pay Now</p>
            </button>
          </div>
        </div>
      </div>
      <!-- End Buttons -->

</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import DepositFullSelect from './Elements/DepositFullSelect.vue'
import BillingFields from './Elements/BillingFields.vue'
import BillingAddressFields from './Elements/BillingAddressFields.vue'
import NationalExamRegistrationSelect from './Elements/NationalExamRegistrationSelect.vue'

import { MoonLoader } from 'vue-spinner/dist/vue-spinner.min.js'

export default {
  props: ['loading'],
  components:{
    'deposit-full-select': DepositFullSelect,
    'billing-fields': BillingFields,
    'billing-address-fields': BillingAddressFields,
    'national-exam-registration-select': NationalExamRegistrationSelect,
    'moon-loader' : MoonLoader
  },
  computed: {
    ...mapState('courseInformation', [
      'state',
      'termsOfServiceLink',
      'availableForPayment',
      'examDates'
    ]),
    ...mapGetters('courseInformation', [
      'hasSecondQuestion',
    ]),
    ...mapGetters('formData', [
      'cardType'
    ]),
      },
  methods: {
    onSubmit: function () {
      if (this.secondQuestion && this.termsOfService && !this.loading){
        this.$emit('next');
      }
    },
    back: function (){
      this.$emit('back');
    },
  },
  data: function(){
    return {
      termsOfService: false,
      secondQuestion: !this.hasSecondQuestion
    }
  }
}
</script>
