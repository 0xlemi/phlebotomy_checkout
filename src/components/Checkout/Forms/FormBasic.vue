<template>
<div>
  <h3 class="text-xl font-semibold sm:text-3xl sm:font-normal leading-normal mt-2 text-red-900">
    Student Registration Information
  </h3>

  <hr class="border-red-300 mt-5">


  <validation-observer v-slot="{ handleSubmit}">

      <!-- Email -->
      <div class="flex mt-8">

        <div class="w-full mb-3 pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            Email
          </label>

          <validation-provider name="email" rules="required|email" v-slot="{ errors }">

            <!-- Mobile Version -->
            <input type="text"  :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="email" placeholder="Email" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input type="text"  :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="email" placeholder="example@gmail.com" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>

          </validation-provider>
        </div>

      </div>
      <!-- End email -->

      <!-- Name and Lastname -->
      <div class="md:flex md:mt-3 sm:mt-6">

        <div class="md:w-2/5 mb-4 md:mr-6 pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            Name
          </label>

          <validation-provider name="name" rules="required" v-slot="{ errors }">


            <!-- Mobile Version -->
            <input type="text" :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="name" placeholder="Name" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input type="text" :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="name" placeholder="John" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

        <div class="md:w-3/5 mb-3 pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            Lastname
          </label>

          <validation-provider name="last name" rules="required" v-slot="{ errors }">

            <!-- Mobile Version -->
            <input type="text" :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="lastName" placeholder="Last Name" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input type="text" :class="{ 'border-2 border-red-500' : errors.length != 0 }" v-model="lastName" placeholder="Doe" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>

        </div>

      </div>
      <!-- End name and Lastname -->


      <label class="block text-red-900 text-sm font-normal ml-2 mb-2">
        This is EXACTLY as your name will appear on your Certificate
      </label>


      <!-- Number, SSN and DOB -->
      <div class="md:flex mt-6 sm:mt-10">

        <div class="md:w-2/5 mb-3 md:mr-6 pt-3 md:pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            Number
          </label>

          <validation-provider name="number" rules="required|numeric|length:10" v-slot="{ errors }">

            <!-- Mobile Version -->
            <input-facade mask="(###) ### - ####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="number" placeholder="Phone Number" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- Mobile Version -->

            <!-- Desktop Version -->
            <input-facade mask="(###) ### - ####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="number" placeholder="(XXX) XXX - XXXX" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

        <div class="md:w-2/5 mb-3 md:mr-6 pt-3 md:pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            DOB
          </label>

          <validation-provider name="DOB" rules="required|numeric|length:8" v-slot="{ errors }">

            <!-- Mobile Version -->
            <input-facade mask="## / ## / ####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="dob" placeholder="DOB  (mm/dd/yyyy)" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input-facade mask="## / ## / ####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="dob" placeholder="MM / DD / YYYY" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ (errors[0]) ? 'invalid format (mm/dd/yyyy)': ''}}</p>
          </validation-provider>
        </div>

        <div class="md:w-1/5 mb-3 pt-3 md:pt-0">

           <label class="hidden sm:block text-red-900 text-md font-bold ml-2 mb-2">
            SSN  <a class="text-sm text-pink-800 font-normal">(last 4)</a>
          </label>

          <validation-provider name="SSN" rules="required|numeric|length:4" v-slot="{ errors }">

            <!-- Mobile Version -->
            <input-facade mask="####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="ssn" placeholder="SSN  (last 4 digits)" class="sm:hidden px-3 py-4 placeholder-pink-400 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Mobile Version -->

            <!-- Desktop Version -->
            <input-facade mask="####" :class="{ 'border-2 border-red-500' : errors.length != 0 }" type="text" v-model="ssn" placeholder="xxxx" class="hidden sm:block px-3 py-4 placeholder-red-300 text-red-900 relative bg-white bg-white rounded text-base shadow outline-none focus:outline-red-200 w-full"/>
            <!-- End Desktop Version -->

            <p class="mt-1 ml-1 text-red-500 text-sm font-semibold italic">{{ errors[0]}}</p>
          </validation-provider>
        </div>

      </div>
      <!-- End Number, SSN and DOB -->


      <div class="flex">
        <div class="hidden md:block w-2/5 mb-3 mr-6 pt-0">
        </div>
        <div class="w-full md:w-3/5 mb-3 mr-6 pt-0">
          <label class="block text-red-900 text-sm font-normal ml-2 mb-2">
            This is required for your transcripts
          </label>
        </div>
      </div>

      <next-back-buttons v-on:next="handleSubmit(onSubmit)" v-on:back="back">
      </next-back-buttons>

  </validation-observer>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import NextBackButtons from './Elements/NextBackButtons.vue'

import { InputFacade } from 'vue-input-facade'
import { ValidationProvider, Validator } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';


export default {
  props: ['values', 'hasIntroQuestion'],
  components:{
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
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.formData.email;
      },
      set (value) {
        this.$store.commit('formData/updateEmail', value);
      }
    },
    name: {
      get() {
        return this.$store.state.formData.name;
      },
      set (value) {
        this.$store.commit('formData/updateName', value);
      }
    },
    lastName: {
      get() {
        return this.$store.state.formData.lastName
      },
      set (value) {
        this.$store.commit('formData/updateLastName', value)
      }
    },
    number: {
      get() {
        return this.$store.state.formData.number
      },
      set (value) {
        this.$store.commit('formData/updateNumber', value)
      }
    },
    dob: {
      get() {
        return this.$store.state.formData.dob
      },
      set (value) {
        this.$store.commit('formData/updateDob', value)
      }
    },
    ssn: {
      get() {
        return this.$store.state.formData.ssn
      },
      set (value) {
        this.$store.commit('formData/updateSsn', value)
      }
    }
  },
  mounted() {

    // const isUnique =
    // axios.get(process.env.VUE_APP_API_URL+'api/student/'+ this.email +'/verify')
    //   .then((response) => {
    //     return resolve({
    //       valid: response.data.exists,
    //       data: {
    //           message: `that email is already taken.`
    //         }
    //     });
    //   })
    //   .catch((error) => {
    //     return resolve({
    //       valid: true
    //     });
    //   });
    // const isUnique = value =>
    //   new Promise(resolve => {
    //     setTimeout(() => {
    //       if (emailsDB.indexOf(value) === -1) {
    //         return resolve({
    //           valid: true
    //         });
    //       }
    //
    //       return resolve({
    //         valid: false,
    //         data: {
    //           message: `${value} is already taken.`
    //         }
    //       });
    //     }, 200);
    //   });

    // Validator.extend("unique", {
    //   validate: isUnique,
    //   getMessage: (field, params, data) => data.message
    // });
  }
}
</script>
