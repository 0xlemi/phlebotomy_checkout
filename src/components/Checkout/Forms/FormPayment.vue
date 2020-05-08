<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    National Exam Dates
  </h3>

  <hr class="hidden lg:block border-red-300 mt-5">

    <!-- Payment Fields -->

    <mobile-price-table class="mt-6 lg:hidden"></mobile-price-table>

    <validation-observer v-slot="{ handleSubmit}">

      <national-exam-registration-select v-if="state == 'TN'">
      </national-exam-registration-select>

      <div v-if="!(state == 'TN') || availableForPayment">

        <deposit-full-select></deposit-full-select>

        <billing-fields></billing-fields>

        <billing-address-fields></billing-address-fields>

      </div>
    <!-- End Payment Fields -->


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


      <next-back-buttons :next-blocked="!ready" :loading="loading" next-text="Pay Now" v-on:next="handleSubmit(onSubmit)" v-on:back="back">
      </next-back-buttons>

  </validation-observer>

</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import { ValidationObserver } from 'vee-validate';

import MobilePriceTable from '@/components/Checkout/SideBar/Elements/MobilePriceTable.vue'
import DepositFullSelect from './Elements/DepositFullSelect.vue'
import BillingFields from './Elements/BillingFields.vue'
import BillingAddressFields from './Elements/BillingAddressFields.vue'
import NextBackButtons from './Elements/NextBackButtons.vue'
import NationalExamRegistrationSelect from './Elements/NationalExamRegistrationSelect.vue'

export default {
  props: ['loading'],
  components:{
    'validation-observer' : ValidationObserver,
    'mobile-price-table' : MobilePriceTable,
    'deposit-full-select': DepositFullSelect,
    'billing-fields': BillingFields,
    'billing-address-fields': BillingAddressFields,
    'next-back-buttons': NextBackButtons,
    'national-exam-registration-select': NationalExamRegistrationSelect,
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
    ready: function() {
      return ((this.secondQuestion || !this.hasSecondQuestion) && this.termsOfService && !this.loading)
    }
  },
  methods: {
    onSubmit: function () {
      if (this.ready){
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
      secondQuestion: false
    }
  }
}
</script>
