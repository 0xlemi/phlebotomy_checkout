<template>
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
</template>

<script>
import { InputFacade } from 'vue-input-facade';

import { ValidationProvider, setInteractionMode } from 'vee-validate/dist/vee-validate.full.esm';

export default {
  components: {
    'input-facade': InputFacade,
    'validation-provider': ValidationProvider,
  },
  computed: {
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
  }
}
</script>

<style scoped>
</style>
