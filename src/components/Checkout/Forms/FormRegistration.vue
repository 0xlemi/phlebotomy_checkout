<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    National Exam Dates
  </h3>

  <hr class="border-red-300 mt-5">

    <div class="flex mt-8">
      <!-- Deposit Button -->
        <card-button @click.native="toggleButton(1)" :selected="!values.payFull">
          <template v-slot:title>Register</template>
          <template v-slot:header>National Exam Fee</template>
          <template v-slot:text>
            This fee is optional. Only required if you choose to challenge the exam.
          </template>
        </card-button>
        <!-- End Deposit Button -->
      </div>

      <div v-if="!values.payFull" class="mt-4 block text-red-900 ">
        <span class="font-bold">Select a Date</span>
        <div class="mt-4">
          <div class="mt-2" v-for="(item, index) in courseList">
            <label class="inline-flex items-center">
              <input type="radio" class="form-radio h-5 w-5 text-red-700" name="radio" v-model="values.nationalExamId" :value="index" checked>
              <span class="ml-2">{{ item.course_date }}</span>
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
import { InputFacade } from 'vue-input-facade'
import CardButton from '../Elements/CardButton.vue'

import { ValidationProvider, setInteractionMode } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

import { MoonLoader } from 'vue-spinner/dist/vue-spinner.min.js'


setInteractionMode('passive');

export default {
  props: ['values', 'loading', 'termsOfServiceLink', 'state', 'courseList'],
  components:{
    'input-facade': InputFacade,
    'card-button': CardButton,
    'validation-provider': ValidationProvider,
    'validation-observer' : ValidationObserver,
    'moon-loader' : MoonLoader
  },
  computed: {
    cardType: function() {

      let visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
      let mastercard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
      let discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
      let amex = /^3[47][0-9]{13}$/;

      if (visa.test(this.values.number)){
        this.values.type = 'visa';
        return {
          name:'visa',
          icon: 'visa'
        };
      }
      else if (mastercard.test(this.values.number)) {
        this.values.type = 'mastercard';
        return {
          name:'mastercard',
          icon: 'mastercard-old'
        };
      }
      else if (discover.test(this.values.number)) {
        this.values.type = 'discover';
        return {
          name:'discover',
          icon: 'discover'
        };
      }
      else if (amex.test(this.values.number)) {
        this.values.type = 'amex';
        return {
          name:'amex',
          icon: 'amex'
        };
      }
      this.values.type = 'other';
      return {
          name:'other',
          icon: 'default'
        };
    },
    hasSecondQuestion: function() {
      return (this.state == 'CA' || this.state == 'OH');
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
      this.values.payFull = !this.values.payFull;
    }
  },
  data: function(){
    return {
      termsOfService: false,
      secondQuestion: !(this.state == 'CA' || this.state == 'OH')
    }
  }
}
</script>

<style scoped>
</style>
