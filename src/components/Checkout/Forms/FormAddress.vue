<template>
<div>
  <h3 class="text-xl font-semibold sm:text-3xl sm:font-normal leading-normal mt-2 text-red-900">
    Address Information
  </h3>

  <hr class="border-red-300 mt-5">


  <validation-observer v-slot="{ handleSubmit}">

      <!-- Address -->
      <div class="flex mt-8">

        <div class="w-full mb-3 pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            Address
          </label>

            <vue-google-autocomplete id="map" ref="addressInput" placeholder="Start typing address" country="US" @placechanged="getAddressData" @change="changeAction" @inputChange="manualChange" classname="px-3 py-4 placeholder-pink-400 sm:placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>


        </div>

      </div>
      <!-- End Address -->


      <!-- Address 2 -->
      <div class="flex mt-4 md:mt-8">

        <div class="w-full md:mb-3 pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            Address Field 2 (optional)
          </label>

            <!-- Mobile Version -->
            <input type="text" v-model="address2" placeholder="Address Field 2 (optional)" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input type="text" v-model="address2" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

        </div>

      </div>
      <!-- End Address 2 -->



      <!-- City, State and Zip -->
      <div class="md:flex mt-3 md:mt-8 pb-3">

        <div class="md:w-3/6 mb-4 md:mr-6 pt-3 md:pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            City
          </label>

          <validation-provider name="city" rules="required" v-slot="{ errors }">

            <!-- Mobile Version -->
            <input type="text" v-model="city" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="City" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input type="text" v-model="city" :class="{ 'border-2 border-red-500' : errors.length != 0 }" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

        <div class="md:w-1/6 mb-4 md:mr-6 pt-3 md:pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            State
          </label>


            <div class="relative">
              <select v-model="state" class="block appearance-none w-full bg-white text-red-900 py-4 px-4 pr-8 rounded leading-tight focus:outline-none shadow focus:bg-white focus:border-red-900" id="grid-state">
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
                <svg class="fill-current text-red-900 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

        </div>

        <div class="md:w-2/6 mb-3 pt-3 md:pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            Zip code
          </label>

          <validation-provider name="zip code" rules="required|numeric|min:5|max:9" v-slot="{ errors }">

            <!-- Mobile Version -->
            <input-facade mask="#####  ####" type="text" v-model="zip" :class="{ 'border-2 border-red-500' : errors.length != 0 }" placeholder="Zip Code" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input-facade mask="#####  ####" type="text" v-model="zip" :class="{ 'border-2 border-red-500' : errors.length != 0 }"  class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

      </div>
      <!-- End City, State and Zip -->


      <next-back-buttons v-on:next="handleSubmit(onSubmit)" v-on:back="back">
      </next-back-buttons>


  </validation-observer>

</div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

import NextBackButtons from './Elements/NextBackButtons.vue'

import { InputFacade } from 'vue-input-facade'

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    'vue-google-autocomplete': VueGoogleAutocomplete,
    'next-back-buttons': NextBackButtons,
    'input-facade': InputFacade,
    'validation-provider': ValidationProvider,
    'validation-observer' : ValidationObserver
  },
  methods: {
    onSubmit: function () {
      this.$emit('next');
    },
    back: function (){
      this.$emit('back');
    },
    /**
    * When the location found
    * @param {Object} data Data of the found location
    * @param {Object} placeResult PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData: function (data, placeResult, id) {
        // Sometimes the street number comes up as undefined
        // we need to handle that "||" is the equivallent
        // to ?: in php
        this.$store.commit('formData/updateAddress', (data.street_number || "") + " " + data.route);
        this.$store.commit('formData/updateCity', data.locality);
        this.$store.commit('formData/updateState', data.administrative_area_level_1);
        this.$store.commit('formData/updateZip', data.postal_code);
      },
      // Over ride the full address for only street and number
      changeAction: function (data) {
        // Check that the is the full address whitten in
        if (data.substr(data.length - 5) == ', USA')
        {
          this.$refs.addressInput.update(this.$store.state.formData.address);
        }
      },
      // If for some reason the address comes bad from google and the user
      // fixes it manualy we need to record that change to prop "address"
      // otherwise that change is not going to get up to the parent
      manualChange: function (data) {
        this.$store.commit('formData/updateAddress', data.newVal);
      }

    },
    computed: {
      address: {
        get() {
          return this.$store.state.formData.address
        },
        set (value) {
          this.$store.commit('formData/updateAddress', value)
        }
      },
      address2: {
        get() {
          return this.$store.state.formData.address2
        },
        set (value) {
          this.$store.commit('formData/updateAddress2', value)
        }
      },
      city: {
        get() {
          return this.$store.state.formData.city
        },
        set (value) {
          this.$store.commit('formData/updateCity', value)
        }
      },
      state: {
        get() {
          return this.$store.state.formData.state
        },
        set (value) {
          this.$store.commit('formData/updateState', value)
        }
      },
      zip: {
        get() {
          return this.$store.state.formData.zip
        },
        set (value) {
          this.$store.commit('formData/updateZip', value)
        }
      }
    },
    mounted: function() {
      this.$refs.addressInput.update(this.$store.state.formData.address);
    },
    data: function () {
      return {
        addressInput: ""
      }
    }
}
</script>



<style scoped>
</style>
