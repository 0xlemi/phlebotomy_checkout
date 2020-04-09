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


      <!-- City, State and Zip -->
      <div class="flex mt-8">

        <div class="w-3/6 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            City
          </label>

          <validation-provider name="city" rules="required" v-slot="{ errors }">
            <input type="text" v-model="values.city" state class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

        <div class="w-1/6 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            State
          </label>

          <validation-provider name="state" rules="required|alpha|length:2" v-slot="{ errors }">
            <input-facade mask="AA" type="text" v-model="values.state" :class="{ 'border-2 border-red-500' : errors.length != 0 }"  class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-2/6 mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Zip code
          </label>

          <validation-provider name="zip code" rules="required|numeric|min:5|max:9" v-slot="{ errors }">
            <input-facade mask="#####  ####" type="text" v-model="values.zip" :class="{ 'border-2 border-red-500' : errors.length != 0 }"  class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

      </div>
      <!-- End City, State and Zip -->

      <!-- Buttons -->
      <div class="flex mt-10 mb-10">
        <div class="flex-1">
          <button @click="back" type="button" class="focus:outline-none underline text-red-800 font-semibold hover:text-red-600 py-2 px-4">
             Go Back
          </button>
        </div>
        <div class="flex-1">
          <div class="flex justify-end">
            <button @click="handleSubmit(onSubmit)" type="submit" class="focus:outline-none bg-red-800 hover:bg-red-900 ml-6 text-white font-bold py-3 px-8 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
      <!-- End Buttons -->

  </validation-observer>

</div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { InputFacade } from 'vue-input-facade'

import { ValidationProvider, setInteractionMode } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

setInteractionMode('passive');

export default {
  props: ['values'],
  components: {
    'vue-google-autocomplete': VueGoogleAutocomplete,
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
        this.values.address = (data.street_number || "") + " " + data.route;
        this.values.city = data.locality;
        this.values.state = data.administrative_area_level_1;
        this.values.zip = data.postal_code;
      },
      // Over ride the full address for only street and number
      changeAction: function (data) {
        // Check that the is the full address whitten in
        if (data.substr(data.length - 5) == ', USA')
        {
          this.$refs.addressInput.update(this.values.address);
        }
      },
      // If for some reason the address comes bad from google and the user
      // fixes it manualy we need to record that change to prop "address"
      // otherwise that change is not going to get up to the parent
      manualChange: function (data) {
          this.values.address = data.newVal;
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
