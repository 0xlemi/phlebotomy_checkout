<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    Payment Information
  </h3>

  <hr class="border-red-300 mt-5">


  <validation-observer v-slot="{ handleSubmit}">

      <div class="flex mt-8">

        <!-- Deposit Button -->
        <card-button @click.native="toggleButton(1)" :selected="!values.payFull">
          <template v-slot:title>Pay $250 Deposit</template>
          <template v-slot:header>Non-refundable</template>
          <template v-slot:text>
            If your tuition is paid by a 3rd party call <span class="font-bold">888-531-8378 </span>to register over the phone.
          </template>
        </card-button>
        <!-- End Deposit Button -->

        <!-- Full Button -->
        <card-button @click.native="toggleButton(2)" :selected="values.payFull">
          <template v-slot:title>Pay in Full</template>
          <template v-slot:header>$250 Non-refundable</template>
          <template v-slot:text>
            Pay Tuition, Insurance and Exam Fee in Full.
          </template>
        </card-button>
        <!-- End Full Button -->

      </div>

      <!-- Number, Exp and CVC -->
      <div class="flex mt-8">

        <div class="w-7/12 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Card Number
          </label>

          <validation-provider name="card number" rules="required|numeric|min:15|max:16" v-slot="{ errors }">
            <div class="flex">
              <input-facade mask="#### #### #### ####" type="text" v-model="values.number" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="XXXX XXXX XXXX XXXX" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
              <!-- interactive credit card icon changer -->
              <!-- <img v-if="values.number.length > 10" class="-ml-16 h-8 z-10 mt-3 fill-current text-red-700" :src="require(`payment-icons/min/mono/${cardType.icon}.svg`)" alt=""/> -->
            </div>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-3/12 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Exp.
          </label>

          <validation-provider name="expiration" rules="required|numeric|length:4" v-slot="{ errors }">
            <input-facade mask="## / ##" type="text" v-model="values.exp" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="MM / YY" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-2/12 mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            CVC
          </label>

          <validation-provider name="cvc" rules="required|numeric|min:3|max:4" v-slot="{ errors }">
            <input-facade mask="####" type="text" v-model="values.code" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

      </div>
      <!-- End Number, Exp and CVC -->

      <!-- Name on Card -->
      <div class="flex mt-6">

        <div class="w-full mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Name on Card
          </label>

          <validation-provider name="name" rules="required" v-slot="{ errors }">
            <input type="text" v-model="values.name" placeholder="John Doe" :class="{ 'border-2 border-red-500' : errors.length != 0 }" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

      </div>
      <!-- End Name on Card -->


      <!-- Billing Address Select -->
      <div class="flex mt-6">

        <div class="w-full mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Billing address
          </label>

          <div type="text" class="grid grid-cols-1 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full">

            <!-- Actual Radio Buttons -->
            <div class="border-red-200 border-b-2">
              <label class="inline-flex items-center w-full">
                <input type="radio" class="focus:outline-red-100 form-radio mx-6 my-5  text-red-400 h-6 w-6" name="billing_address" v-model="values.same_billing" value="true">
                <span class="ml-3 text-md">Same as Registration Address</span>
              </label>
            </div>

            <div>
              <label class="inline-flex items-center w-full">
                <input type="radio" class="focus:outline-red-100 form-radio mx-6 my-5 text-red-400 h-6 w-6" name="billing_address" v-model="values.same_billing" value="false">
                <span class="ml-3 text-md">Use a Different Address</span>
              </label>
            </div>
            <!-- End Actual Radio Buttons -->


            <!-- Different addresss fields -->
            <div :class="{ 'hidden': ( values.same_billing == 'true' ) }" class="bg-gray-100 h-full border-gray-300 border-t-2">
              <div class="px-5 pt-5 pb-2">

                <!-- Address 1 -->
                <div class="flex">

                  <div class="w-full mb-3 pt-0">

                    <validation-provider name="address" :rules="{ required : ( values.same_billing == 'false' )  }" v-slot="{ errors }">
                      <input v-model="values.billing_address.address1" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" :placeholder=" errors.length == 0 ? 'Address' : errors[0] " class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                    </validation-provider>
                  </div>

                </div>
                <!-- End Address 1 -->

                <!-- Address 2 -->
                <div class="flex mt-3">

                  <div class="w-full mb-3 pt-0">

                    <validation-provider name="address 2" :rules="{ required : ( values.same_billing == 'false' )  }" v-slot="{ errors }">
                      <input type="text" v-model="values.billing_address.address2" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" :placeholder=" errors.length == 0 ? 'Apartment, suite, etc. (optional)' : errors[0] " class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                    </validation-provider>
                  </div>

                </div>
                <!-- End Address 2 -->

                <!-- City, State and Zip -->
                <div class="flex mt-3">

                  <div class="w-3/6 mb-3 mr-6 pt-0">

                    <validation-provider name="city" :rules="{ required : (values.same_billing == 'false')  }" v-slot="{ errors }">
                      <input type="text" v-model="values.billing_address.city" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="City" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                      <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
                    </validation-provider>
                  </div>

                  <div class="w-1/6 mb-3 mr-6 pt-0">

                    <validation-provider name="state" :rules="{ required : (values.same_billing == 'false'), length:2 }" v-slot="{ errors }">
                      <input-facade mask="AA" type="text" v-model="values.billing_address.state" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="State" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                      <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
                    </validation-provider>
                  </div>

                  <div class="w-2/6 mb-3 pt-0">

                    <validation-provider name="zip code" :rules="{ required : (values.same_billing == 'false'), numeric: true, min:5, max:9  }" v-slot="{ errors }">
                      <input-facade mask="#####  ####" type="text" v-model="values.billing_address.zip" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="Zip Code" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                      <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
                    </validation-provider>
                  </div>

                </div>
                <!-- End City, State and Zip -->

              </div>
            </div>
            <!-- Different addresss fields -->

          </div>
        </div>
      </div>
      <!-- End Billing Address Select -->

      <!-- Terms of Service -->
      <div class="mt-10">
        <label class="inline-flex">
          <input type="checkbox" v-model="termsOfService" class="focus:outline-red-100 form-checkbox text-red-700 h-5 w-5">
          <span class="ml-2 text-red-900">I have read the <a class="hover:text-blue-700 text-blue-500 underline" target="_blank" href="https://admin.phlebotomyusa.com/agreement/san-diego/course/National">enrollment agreement and privacy policy</a> and agree to the terms listed therein.</span>
        </label>
      </div>
      <div class="mt-4">
        <label class="inline-flex items-center">
          <input type="checkbox" v-model="englishProficient" class="focus:outline-red-100 form-checkbox text-red-700 h-5 w-5">
          <span class="ml-2 text-red-900">I am proficient in reading and writing the English Language.</span>
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
            <button @click="handleSubmit(onSubmit)" type="submit" :class="{ 'opacity-50 cursor-not-allowed' : !(englishProficient && termsOfService && !loading) }" class=" focus:outline-none bg-red-800 hover:bg-red-900 text-white font-bold rounded">
              <moon-loader class="px-12 py-4" :loading="loading" color="#FFF5F5" size="25px"></moon-loader>
              <p class="px-8 py-4" v-if="!loading">Pay Now</p>
            </button>
          </div>
        </div>
      </div>
      <!-- End Buttons -->

  </validation-observer>

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
  props: ['values', 'loading'],
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
    }
  },
  methods: {
    onSubmit: function () {
      this.$emit('next');
    },
    back: function (){
      this.$emit('back');
    },
    toggleButton: function (event){
      // Deposit Button Clicked
      if(event == 1){
        if (this.values.payFull) {
          this.values.payFull = false;
        }
      }
      // Full Pay Button Clicked
      else if (event == 2) {
        if (!this.values.payFull) {
          this.values.payFull = true;
        }
      }
    }
  },
  data: function(){
    return {
      termsOfService: false,
      englishProficient: false
    }
  }
}
</script>

<style scoped>
</style>
