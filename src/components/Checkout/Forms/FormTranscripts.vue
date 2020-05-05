<template>
<div>
  <h4 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    Official Transcripts
  </h4>

  <hr class="border-red-300 mt-5">


  <h3 class="text-xl font-normal leading-normal mt-8 text-red-900">
    Can you provide Official High School Transcripts or College Transcripts?
  </h3>

  <div class="mt-2">
    <a class="hover:text-blue-700 text-blue-500 underline font-bold" href="https://www.phlebotomyusa.com/wp-content/uploads/2020/01/Tennessee-PDF.pdf" target="_blank">Guide to complete your registration and begin class</a>
  </div>

  <!-- Buttons -->
  <div class="flex justify-center my-8">
    <button @click="clickYes" :class="[ yes ? 'bg-red-300 font-semibold border-red-500': 'bg-red-100 hover:bg-red-200 border-red-200 hover:border-red-300' ]" class=" focus:outline-none border-2 px-8 py-4 mb-3 mr-6 rounded-lg ">
      <h5 :class="[ yes ? 'text-green-900': 'text-red-900' ]" class=" text-lg leading-tight truncate">YES</h5>
    </button>

    <button @click="clickNo" :class="[ no ? 'bg-red-300 font-semibold border-red-500': 'bg-red-100 hover:bg-red-200 border-red-200 hover:border-red-300' ]" class=" focus:outline-none border-2 px-8 py-4 mb-3 mr-6 rounded-lg ">
      <h5 :class="[ no ? 'text-green-900': 'text-red-900' ]" class="  text-lg leading-tight truncate">NO</h5>
    </button>
  </div>
  <!-- End Buttons -->


  <side-message color="red" class="lg:hidden p-8" v-if="!firstTest">
    <tn-message></tn-message>
  </side-message>


  <div class="mx-6 mb-32 lg:mb-0 text-red-800">
    <p class="mt-6">
      The <span class="font-bold">Tennessee Higher Education Commission</span> rule 1540-01-02.12 and 1540-01-02.15 <span class="font-bold">requires</span> students prior to commencement of class to submit an <span class="font-bold">official transcript from the high school, GED score sheet </span>from the appropriate issuing entity, or an <span class="font-bold">official military document </span>indicating that the student completed high school such as an Enlisted Record Brief.
    </p>
    <p class="mt-6">
      This must come directly from the issuing institution or agency. Paper transcripts printed on security sensitive paper and must contain the issuing institution’s seal or signature of an official from the institution. Electronic transcripts or scores sheets are also acceptable if sent from the issuing institution.
    </p>
  </div>


</div>
</template>

<script>
import SideMessage from '@/components/Checkout/SideBar/Elements/SideMessage.vue'
import TNMessage from '@/components/Checkout/SideBar/Elements/Messages/TNMessage.vue'

import { mapState } from 'vuex'

export default {
  components: {
    'side-message' : SideMessage,
    'tn-message' : TNMessage,
  },
  computed: {
    ...mapState('formData', [
      'firstTest'
    ]),
  },
  methods: {
    clickYes: function (event) {
      this.yes = true;
      this.no = false;
      this.$store.commit('formData/updateFirstTest', true);
      this.$emit('next');
    },
    clickNo: function (event) {
      this.yes = false;
      this.no = true;
      this.$store.commit('formData/updateFirstTest', false);
    }
  },
  data: function (){
    return {
      yes: false,
      no: false
    }
  }
}
</script>

<style scoped>
</style>
