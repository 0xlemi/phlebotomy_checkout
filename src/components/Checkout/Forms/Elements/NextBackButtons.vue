<template>
  <!-- Buttons -->
  <div class="flex mt-10 mb-10">
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
  <!-- End Buttons -->


</template>

<script>

import { MoonLoader } from 'vue-spinner/dist/vue-spinner.min.js'

export default {
  components: {
    'moon-loader' : MoonLoader
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
