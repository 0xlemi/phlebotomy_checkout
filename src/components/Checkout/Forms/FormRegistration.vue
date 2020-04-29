<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    National Exam Dates
  </h3>

  <hr class="border-red-300 mt-5">

    <div class="flex mt-8">
      <!-- Deposit Button -->
        <card-button @click.native="toggleButton(1)" :selected="!payFull">
          <template v-slot:title>Register</template>
          <template v-slot:header>National Exam Fee</template>
          <template v-slot:text>
            This fee is optional. Only required if you choose to challenge the exam.
          </template>
        </card-button>
        <!-- End Deposit Button -->
      </div>

      <div v-if="!payFull" class="mt-4 block text-red-900 ">
        <span class="font-bold">Select a Date</span>
        <div class="mt-4">
          <div class="mt-2" v-for="(item, index) in examDates">
            <label class="inline-flex items-center">
              <input type="radio" class="form-radio h-5 w-5 text-red-700" name="radio" v-model="nationalExam" :value="item.id" checked>
              <span class="ml-2">{{item.dayOfTheWeek}} <span class="font-bold">{{item.formattedDate}}</span> at {{item.time}} </span>
            </label>
          </div>
        </div>
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

import { mapState, mapMutations, mapGetters } from 'vuex'

import { InputFacade } from 'vue-input-facade'
import CardButton from '../Elements/CardButton.vue'

import { ValidationProvider, setInteractionMode } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

import { MoonLoader } from 'vue-spinner/dist/vue-spinner.min.js'


setInteractionMode('passive');

export default {
  props: ['loading'],
  components:{
    'input-facade': InputFacade,
    'card-button': CardButton,
    'validation-provider': ValidationProvider,
    'validation-observer' : ValidationObserver,
    'moon-loader' : MoonLoader
  },
  computed: {
    ...mapState('courseInformation', [
      'termsOfServiceLink',
      'hasSecondQuestion',
      'examDates'
    ]),
    ...mapGetters('formData', [
      'cardType'
    ]),
    // TN Specific
    nationalExam: {
      get () {
        return this.$store.state.formData.nationalExam;
      },
      set (value) {
        this.$store.commit('formData/updateNationalExam', value);
      }
    },
    payFull: {
      get () {
        return this.$store.state.formData.payFull;
      },
      set (value) {
        this.$store.commit('formData/updatePayFull', value);
      }
    },
    billingName: {
      get () {
        return this.$store.state.formData.billingName;
      },
      set (value) {
        this.$store.commit('formData/updateBillingName', value);
      }
    },
    billingNumber: {
      get () {
        return this.$store.state.formData.billingNumber;
      },
      set (value) {
        this.$store.commit('formData/updateBillingNumber', value);
      }
    },
    exp: {
      get () {
        return this.$store.state.formData.exp;
      },
      set (value) {
        this.$store.commit('formData/updateExp', value);
      }
    },
    code: {
      get () {
        return this.$store.state.formData.code;
      },
      set (value) {
        this.$store.commit('formData/updateCode', value);
      }
    },
    sameBilling: {
      get () {
        return this.$store.state.formData.sameBilling;
      },
      set (value) {
        this.$store.commit('formData/updateSameBilling', value);
      }
    },
    billingAddress1: {
      get () {
        return this.$store.state.formData.billingAddress1;
      },
      set (value) {
        this.$store.commit('formData/updateBillingAddress1', value);
      }
    },
    billingAddress2: {
      get () {
        return this.$store.state.formData.billingAddress2;
      },
      set (value) {
        this.$store.commit('formData/updateBillingAddress2', value);
      }
    },
    billingCity: {
      get () {
        return this.$store.state.formData.billingCity;
      },
      set (value) {
        this.$store.commit('formData/updateBillingCity', value);
      }
    },
    billingState: {
      get () {
        return this.$store.state.formData.billingState;
      },
      set (value) {
        this.$store.commit('formData/updateBillingState', value);
      }
    },
    billingZip: {
      get () {
        return this.$store.state.formData.billingZip;
      },
      set (value) {
        this.$store.commit('formData/updateBillingZip', value);
      }
    }
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
    toggleButton: function (event){
      this.payFull = !this.payFull;
    }
  },
  data: function(){
    return {
      termsOfService: false,
      secondQuestion: !this.hasSecondQuestion
    }
  }
}
</script>

<style scoped>
</style>
