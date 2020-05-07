<template>
<div class="">

  <!-- Desktop Buttons -->
  <div class="hidden md:flex mt-10 mb-10">
    <div v-if="hasBackButton" class="flex-1">
      <button @click="back" type="button" class="underline focus:outline-none text-red-800 font-semibold hover:text-red-600 py-2 px-4">
         {{ backText }}
      </button>
    </div>
    <div class="flex-1">
      <div v-if="hasNextButton" class="flex justify-end">
        <button @click="onSubmit" type="submit" :class="{ 'opacity-50 cursor-not-allowed' : nextBlocked }"  class="bg-red-800 focus:outline-none hover:bg-red-900 ml-6 text-white font-bold py-3 px-8 rounded">
        <moon-loader class="px-4" :loading="loading" color="#FFF5F5" size="25px"></moon-loader>
        <p v-if="!loading">{{ nextText }}</p>
        </button>
      </div>
    </div>
  </div>
  <!-- End Desktop Buttons -->
  <!-- Buttons Mobile -->
  <div class="md:hidden mt-10 mb-10">
    <div v-if="hasNextButton" class="flex mb-6" >
      <button @click="onSubmit" type="submit" :class="{ 'opacity-50 cursor-not-allowed' : nextBlocked }"  class="w-full bg-red-800 focus:outline-none hover:bg-red-900 text-white font-bold py-4 rounded-lg">
        <div class="flex justify-center">
          <moon-loader class="" :loading="loading" color="#FFF5F5" size="25px"></moon-loader>
          <p v-if="!loading">{{ nextText }}</p>
        </div>
      </button>
    </div>
    <div v-if="hasBackButton" class="">
      <button @click="back" type="button" class="w-full border-2 border-red-200 hover:bg-red-200 hover:border-red-300 rounded-lg focus:outline-none text-red-800 font-semibold hover:text-red-900 py-2 px-4">
        <div class="flex justify-center py-2">
          <zondicon icon="cheveron-left" class="h-5 fill-current"/>
          <p class="ml-2">{{ backText }}</p>
        </div>
      </button>
    </div>
  </div>
  <!-- End Buttons Mobile -->
</div>
</template>

<script>

import { MoonLoader } from 'vue-spinner/dist/vue-spinner.min.js'

import Zondicon from 'vue-zondicons';

export default {
  components: {
    'moon-loader' : MoonLoader,
    'zondicon': Zondicon
  },
  props: {
    hasBackButton: {
      type: Boolean,
      default: true
    },
    hasNextButton: {
      type: Boolean,
      default: true
    },
    backText: {
      type: String,
      default: 'Go Back'
    },
    nextText: {
      type: String,
      default: 'Next'
    },
    nextBlocked: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSubmit: function () {
      this.$emit('next');
    },
    back: function (){
      this.$emit('back');
    }
  },
}
</script>

<style scoped>
</style>
