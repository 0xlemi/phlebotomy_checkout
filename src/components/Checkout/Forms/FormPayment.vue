<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    Payment Information
  </h3>

  <hr class="border-red-300 mt-5">


  <validation-observer v-slot="{ handleSubmit}">

      <div class="flex mt-8">

        <!-- Deposit Button -->
        <card-button @click.native="toggleButton(1)" :selected="!payFull">
          <template v-slot:title>Pay $250 Deposit</template>
          <template v-slot:header>Non-refundable</template>
          <template v-slot:text>
            If your tuition is paid by a 3rd party call <span class="font-bold">888-531-8378 </span>to register over the phone.
          </template>
        </card-button>
        <!-- End Deposit Button -->

        <!-- Full Button -->
        <card-button @click.native="toggleButton(2)" :selected="payFull">
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
              <input-facade mask="#### #### #### ####" type="text" v-model="billingNumber" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="XXXX XXXX XXXX XXXX" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
              <!-- interactive credit card icon changer -->
              <img v-if="billingNumber.length > 10" class="-ml-16 h-8 z-10 mt-3 fill-current text-red-700" :src="require(`payment-icons/min/mono/${cardType.icon}.svg`)" alt=""/>
            </div>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-3/12 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Exp.
          </label>

          <validation-provider name="expiration" rules="required|numeric|length:4" v-slot="{ errors }">
            <input-facade mask="## / ##" type="text" v-model="exp" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="MM / YY" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-2/12 mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            CVC
          </label>

          <validation-provider name="cvc" rules="required|numeric|min:3|max:4" v-slot="{ errors }">
            <input-facade mask="####" type="text" v-model="code" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
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
            <input type="text" v-model="billingName" placeholder="John Doe" :class="{ 'border-2 border-red-500' : errors.length != 0 }" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
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
                <input type="radio" class="focus:outline-red-100 form-radio mx-6 my-5  text-red-400 h-6 w-6" name="billingAddress" v-model="sameBilling" value="true">
                <span class="ml-3 text-md">Same as Registration Address</span>
              </label>
            </div>

            <div>
              <label class="inline-flex items-center w-full">
                <input type="radio" class="focus:outline-red-100 form-radio mx-6 my-5 text-red-400 h-6 w-6" name="billingAddress" v-model="sameBilling" value="false">
                <span class="ml-3 text-md">Use a Different Address</span>
              </label>
            </div>
            <!-- End Actual Radio Buttons -->


            <!-- Different addresss fields -->
            <div :class="{ 'hidden': ( sameBilling == 'true' ) }" class="bg-gray-100 h-full border-gray-300 border-t-2">
              <div class="px-5 pt-5 pb-2">

                <!-- Address 1 -->
                <div class="flex">

                  <div class="w-full mb-3 pt-0">

                    <validation-provider name="address" :rules="{ required : ( sameBilling == 'false' )  }" v-slot="{ errors }">
                      <input v-model="billingAddress1" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" :placeholder=" errors.length == 0 ? 'Address' : errors[0] " class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                    </validation-provider>
                  </div>

                </div>
                <!-- End Address 1 -->

                <!-- Address 2 -->
                <div class="flex mt-3">

                  <div class="w-full mb-3 pt-0">

                    <validation-provider name="address 2" :rules="{ required : ( sameBilling == 'false' )  }" v-slot="{ errors }">
                      <input type="text" v-model="billingAddress2" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" :placeholder=" errors.length == 0 ? 'Apartment, suite, etc. (optional)' : errors[0] " class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                    </validation-provider>
                  </div>

                </div>
                <!-- End Address 2 -->

                <!-- City, State and Zip -->
                <div class="flex mt-3">

                  <div class="w-3/6 mb-3 mr-6 pt-0">

                    <validation-provider name="city" :rules="{ required : (sameBilling == 'false')  }" v-slot="{ errors }">
                      <input type="text" v-model="billingCity" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="City" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                      <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
                    </validation-provider>
                  </div>

                  <div class="w-1/6 mb-3 mr-6 pt-0">

                    <validation-provider name="state" :rules="{ required : (sameBilling == 'false'), length:2 }" v-slot="{ errors }">
                      <input-facade mask="AA" type="text" v-model="billingState" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="State" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                      <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
                    </validation-provider>
                  </div>

                  <div class="w-2/6 mb-3 pt-0">

                    <validation-provider name="zip code" :rules="{ required : (sameBilling == 'false'), numeric: true, min:5, max:9  }" v-slot="{ errors }">
                      <input-facade mask="#####  ####" type="text" v-model="billingZip" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="Zip Code" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
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
            <button @click="handleSubmit(onSubmit)" type="submit" :class="{ 'opacity-50 cursor-not-allowed' : !(secondQuestion && termsOfService && !loading) }" class=" focus:outline-none bg-red-800 hover:bg-red-900 text-white font-bold rounded">
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
import { mapState, mapGetters } from 'vuex';

import { InputFacade } from 'vue-input-facade';
import CardButton from '../Elements/CardButton.vue';

import { ValidationProvider, setInteractionMode } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

import { MoonLoader } from 'vue-spinner/dist/vue-spinner.min.js';


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
      'hasSecondQuestion'
    ]),
    ...mapGetters('formData', [
      'cardType'
    ]),
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
      // Deposit Button Clicked
      if(event == 1){
        if (this.payFull) {
          this.payFull = false;
        }
      }
      // Full Pay Button Clicked
      else if (event == 2) {
        if (!this.payFull) {
          this.payFull = true;
        }
      }
    }
  },
  data: function(){
    return {
      termsOfService: false,
      secondQuestion: !this.$store.state.courseInformation.hasSecondQuestion
    }
  }
}
</script>

<style scoped>
</style>
