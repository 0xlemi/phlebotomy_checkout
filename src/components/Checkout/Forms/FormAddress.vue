<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    Address Information
  </h3>

  <hr class="border-red-300 mt-5">


  <validation-observer v-slot="{ handleSubmit}">

      <!-- Address -->
      <div class="flex mt-8">

        <div class="w-full mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Address
          </label>

            <vue-google-autocomplete id="map" ref="addressInput" country="US" @placechanged="getAddressData" @change="changeAction" @inputChange="manualChange" classname="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>

        </div>

      </div>
      <!-- End Address -->


      <!-- Address 2 -->
      <div class="flex mt-8">

        <div class="w-full mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Address Field 2 (optional)
          </label>

          <validation-provider name="address2" rules="" v-slot="{ errors }">
            <input type="text" v-model="address2" :class="{ 'border-2 border-red-500' : errors.length != 0 }" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

      </div>
      <!-- End Address 2 -->



      <!-- City, State and Zip -->
      <div class="flex mt-8">

        <div class="w-3/6 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            City
          </label>

          <validation-provider name="city" rules="required" v-slot="{ errors }">
            <input type="text" v-model="city" :class="{ 'border-2 border-red-500' : errors.length != 0 }" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

        <div class="w-1/6 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            State
          </label>

          <validation-provider name="state" rules="required|alpha|length:2" v-slot="{ errors }">
            <input-facade mask="AA" type="text" v-model="state" :class="{ 'border-2 border-red-500' : errors.length != 0 }"  class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-2/6 mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Zip code
          </label>

          <validation-provider name="zip code" rules="required|numeric|min:5|max:9" v-slot="{ errors }">
            <input-facade mask="#####  ####" type="text" v-model="zip" :class="{ 'border-2 border-red-500' : errors.length != 0 }"  class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
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

import { ValidationProvider, setInteractionMode } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

setInteractionMode('passive');

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
    data: function () {
      return {
        addressInput: ""
      }
    }
}
</script>



<style scoped>
</style>
