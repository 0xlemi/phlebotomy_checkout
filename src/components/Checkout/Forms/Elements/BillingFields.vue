<template>
<div >
  <!-- Number, Exp and CVC -->
  <div class="md:flex mt-8">

    <div class="md:w-7/12 mb-3 md:mr-6 pt-0">

       <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
        Card Number
      </label>

      <validation-provider name="card number" rules="required|numeric|min:15|max:16" v-slot="{ errors }">
        <div class="flex">

          <!-- Mobile Version -->
          <input-facade mask="#### #### #### ####" type="text" v-model="billingNumber" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="Card Number" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
          <!-- End Mobile Version -->

          <!-- Desktop Version -->
          <input-facade mask="#### #### #### ####" type="text" v-model="billingNumber" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="XXXX XXXX XXXX XXXX" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
          <!-- End Desktop Version -->

          <!-- interactive credit card icon changer -->
          <img v-if="billingNumber.length > 10" class="-ml-16 h-8 z-10 mt-3 fill-current text-red-700" :src="require(`payment-icons/min/mono/${cardType.icon}.svg`)" alt=""/>
        </div>
        <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
      </validation-provider>
    </div>

    <div class="md:w-3/12 mb-3 md:mr-6 pt-3 md:pt-0">

       <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
        Exp.
      </label>

      <validation-provider name="expiration" rules="required|numeric" v-slot="{ errors }">

        <!-- Mobile Version -->
        <input-facade mask="## / ##" type="text" v-model="exp" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="Exp  (mm/yy)" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
        <!-- End Mobile Version -->

        <!-- Desktop Version -->
        <input-facade mask="## / ##" type="text" v-model="exp" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="MM / YY" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
        <!-- End Desktop Version -->

        <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
      </validation-provider>
    </div>

    <div class="md:w-2/12 mb-3 pt-3  md:pt-0">

       <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
        CVC
      </label>

      <validation-provider name="cvc" rules="required|numeric|min:3|max:4" v-slot="{ errors }">

        <!-- Mobile Version -->
        <input-facade mask="####" type="text" v-model="code" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="CVC" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
        <!-- End Mobile Version -->

        <!-- Desktop Version -->
        <input-facade mask="####" type="text" v-model="code" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
        <!-- End Desktop Version -->

        <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
      </validation-provider>
    </div>

  </div>
  <!-- End Number, Exp and CVC -->

  <!-- Name on Card -->
  <div class="flex mt-6">

    <div class="w-full mb-3 pt-0">

       <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
        Name on Card
      </label>

      <validation-provider name="name" rules="required" v-slot="{ errors }">

        <!-- Mobile Version -->
        <input type="text" v-model="billingName" placeholder="Name on Card" :class="{ 'border-2 border-red-500' : errors.length != 0 }" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
        <!-- End Mobile Version -->

        <!-- End Desktop Version -->
        <input type="text" v-model="billingName" placeholder="John Doe" :class="{ 'border-2 border-red-500' : errors.length != 0 }" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
        <!-- End Desktop Version -->

        <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
      </validation-provider>
    </div>

  </div>
  <!-- End Name on Card -->

</div>
</template>

<script>

import {  mapGetters } from 'vuex'

import { InputFacade } from 'vue-input-facade';
import { ValidationProvider, extend } from 'vee-validate/dist/vee-validate.full.esm';


extend('notExp', value => {
  return false;
  // return new Date(this.explodedExp).valueOf() > new Date().valueOf();
});
console.log(this);
export default {
  components: {
    'input-facade': InputFacade,
    'validation-provider': ValidationProvider,
  },
  computed: {
    ...mapGetters('formData', [
      'cardType',
      'explodedExp'
    ]),
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
    }
  }
  // mounted: {
  //
  // }
}
</script>

<style scoped>
</style>
