<template>
<div>
  <h4 class="text-3xl font-normal leading-normal mt-2 text-red-900">
    English Proficiency
  </h4>

  <hr class="border-red-300 mt-5">


  <h3 class="text-xl font-normal leading-normal mt-8 text-red-900">
    Can you speak and read english proficiently?
  </h3>

  <!-- Buttons -->
  <div class="flex justify-center my-10">
    <button @click="clickYes" :class="[ yes ? 'bg-red-300 font-semibold border-red-500': 'bg-red-100 hover:bg-red-200 border-red-200 hover:border-red-300' ]" class=" focus:outline-none border-2 px-8 py-4 mb-3 mr-6 rounded-lg ">
      <h5 :class="[ yes ? 'text-green-900': 'text-red-900' ]" class=" text-lg leading-tight truncate">YES</h5>
    </button>

    <button @click="clickNo" :class="[ no ? 'bg-red-300 font-semibold border-red-500': 'bg-red-100 hover:bg-red-200 border-red-200 hover:border-red-300' ]" class=" focus:outline-none border-2 px-8 py-4 mb-3 mr-6 rounded-lg ">
      <h5 :class="[ no ? 'text-green-900': 'text-red-900' ]" class="  text-lg leading-tight truncate">NO</h5>
    </button>
  </div>
  <!-- End Buttons -->


<english-message class="lg:hidden p-8" color="red" v-if="!firstTest"></english-message>

</div>
</template>

<script>
import EnglishMessage from '@/components/Checkout/SideBar/Elements/EnglishMessage.vue'

import { mapState } from 'vuex'

export default {
  components: {
    'english-message' : EnglishMessage,
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
