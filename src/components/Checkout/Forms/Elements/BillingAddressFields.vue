<template>
<!-- Billing Address Select -->
  <div class="flex mt-6">

    <div class="w-full mb-3 pt-0">

       <label class="block text-red-900 text-md font-bold ml-2 mb-4 sm:mb-2">
        Billing address
      </label>

      <div type="text" class="grid grid-cols-1 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full">

        <!-- Actual Radio Buttons -->
        <div class="border-red-200 border-b-2">
          <label class="inline-flex items-center w-full">
            <input type="radio" class="focus:outline-red-100 form-radio mx-6 my-5  text-red-400 h-6 w-6" name="billingAddress" v-model="sameBilling" value="true">
            <span class="ml-3 text-md">Same <span class="hidden sm:inline-block">as Registration</span> Address</span>
          </label>
        </div>

        <div>
          <label class="inline-flex items-center w-full">
            <input type="radio" class="focus:outline-red-100 form-radio mx-6 my-5 text-red-400 h-6 w-6" name="billingAddress" v-model="sameBilling" value="false">
            <span class="ml-3 text-md"><span class="hidden sm:inline-block">Use a</span> Different Address</span>
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

                  <input type="text" v-model="billingAddress2" placeholder="Apartment, suite, etc. (optional)" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
              </div>

            </div>
            <!-- End Address 2 -->

            <!-- City, State and Zip -->
            <div class="md:flex md:mt-3">

              <div class="md:w-3/6 mb-3 md:mr-6 pt-3 md:pt-0 ">

                <validation-provider name="city" :rules="{ required : (sameBilling == 'false')  }" v-slot="{ errors }">
                  <input type="text" v-model="billingCity" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="City" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                  <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
                </validation-provider>
              </div>

              <div class="md:w-1/6 mb-3 md:mr-6 pt-3 md:pt-0">

                <!-- <validation-provider name="state" :rules="{ required : (sameBilling == 'false'), length:2 }" v-slot="{ errors }">
                  <input-facade mask="AA" type="text" v-model="billingState" :class="{ 'border-2 placeholder-red-400 border-red-500' : errors.length != 0 }" placeholder="State" class="px-3 py-4 placeholder-gray-600 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-gray-400 w-full"/>
                  <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
                </validation-provider> -->

                  <div class="relative">
                    <select v-model="billingState" class="block appearance-none w-full bg-white text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none shadow focus:bg-white focus:border-grey-900" id="grid-state">
                      <option>AL</option>
                      <option>AK</option>
                      <option>AZ</option>
                      <option>AR</option>
                      <option>CA</option>
                      <option>CO</option>
                      <option>CT</option>
                      <option>DE</option>
                      <option>FL</option>
                      <option>GA</option>
                      <option>HI</option>
                      <option>ID</option>
                      <option>IL</option>
                      <option>IN</option>
                      <option>IA</option>
                      <option>KS</option>
                      <option>KY</option>
                      <option>LA</option>
                      <option>ME</option>
                      <option>MD</option>
                      <option>MA</option>
                      <option>MI</option>
                      <option>MN</option>
                      <option>MS</option>
                      <option>MO</option>
                      <option>MT</option>
                      <option>NE</option>
                      <option>NV</option>
                      <option>NH</option>
                      <option>NJ</option>
                      <option>NM</option>
                      <option>NY</option>
                      <option>NC</option>
                      <option>ND</option>
                      <option>OH</option>
                      <option>OK</option>
                      <option>OR</option>
                      <option>PA</option>
                      <option>RI</option>
                      <option>SC</option>
                      <option>SD</option>
                      <option>TN</option>
                      <option>TX</option>
                      <option>UT</option>
                      <option>VT</option>
                      <option>VA</option>
                      <option>WA</option>
                      <option>WV</option>
                      <option>WI</option>
                      <option>WY</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current text-grey-900 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>

              </div>



              <div class="md:w-2/6 mb-3 pt-3 md:pt-0">

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

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';

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
