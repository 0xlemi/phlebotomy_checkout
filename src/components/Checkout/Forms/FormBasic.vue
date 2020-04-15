<template>
<div>
  <h3 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    Student Registration Information
  </h3>

  <hr class="border-red-300 mt-5">


  <validation-observer v-slot="{ handleSubmit}">

      <!-- Email -->
      <div class="flex mt-8">

        <div class="w-full mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Email
          </label>

          <validation-provider name="email" rules="required|email" v-slot="{ errors }">
            <input type="text"  :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="values.email" placeholder="example@gmail.com" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

      </div>
      <!-- End email -->

      <!-- Name and Lastname -->
      <div class="flex mt-6">

        <div class="w-2/5 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Name
          </label>

          <validation-provider name="name" rules="required" v-slot="{ errors }">
            <input type="text" :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="values.name" placeholder="John" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

        <div class="w-3/5 mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Lastname
          </label>

          <validation-provider name="last name" rules="required" v-slot="{ errors }">
            <input type="text" :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="values.last_name" placeholder="Doe" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

      </div>
      <!-- End name and Lastname -->


      <label class="block text-red-900 text-sm font-normal ml-2 mb-2">
        This is EXACTLY as your name will appear on your Certificate
      </label>


      <!-- Number, SSN and DOB -->
      <div class="flex mt-10">

        <div class="w-2/5 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            Number
          </label>

          <validation-provider name="number" rules="required|numeric|length:10" v-slot="{ errors }">
            <input-facade mask="(###) ### - ####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="values.number" placeholder="(352) 879 - 8928" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-2/5 mb-3 mr-6 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            DOB
          </label>

          <validation-provider name="DOB" rules="required|numeric|length:8" v-slot="{ errors }">
            <input-facade mask="## / ## / ####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="values.dob" placeholder="MM / DD / YYYY" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="w-1/5 mb-3 pt-0">

           <label class="block text-red-900 text-md font-bold ml-2 mb-2">
            SSN  <a class="text-sm text-pink-800 font-normal">(last 4)</a>
          </label>

          <validation-provider name="SSN" rules="required|numeric|length:4" v-slot="{ errors }">
            <input-facade mask="####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="values.ssn" placeholder="XXXX" class="px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

      </div>
      <!-- End Number, SSN and DOB -->


      <div class="flex">
        <div class="w-2/5 mb-3 mr-6 pt-0">
        </div>
        <div class="w-3/5 mb-3 mr-6 pt-0">
          <label class="block text-red-900 text-sm font-normal ml-2 mb-2">
            This is required for your transcripts
          </label>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex mt-10 mb-10">
        <div v-if="hasIntroQuestion" class="flex-1">
          <button @click="back" type="button" class="underline focus:outline-none text-red-800 font-semibold hover:text-red-600 py-2 px-4">
             Go Back
          </button>
        </div>
        <div class="flex-1">
          <div class="flex justify-end">
            <button @click="handleSubmit(onSubmit)" type="submit" class="bg-red-800 focus:outline-none hover:bg-red-900 ml-6 text-white font-bold py-3 px-8 rounded">
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
import { InputFacade } from 'vue-input-facade'
import { ValidationProvider, setInteractionMode } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

setInteractionMode('passive');

export default {
  props: ['values', 'hasIntroQuestion'],
  components:{
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
    }
  },
  data: function(){
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
