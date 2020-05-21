<template>
<div>
  <h4 class="text-xl font-semibold sm:text-3xl sm:font-normal leading-normal mt-2 text-red-900">
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

    <!-- Mobile Button -->
    <button @click="showAlert" :class="[ no ? 'bg-red-300 font-semibold border-red-500': 'bg-red-100 hover:bg-red-200 border-red-200 hover:border-red-300' ]" class="lg:hidden focus:outline-none border-2 px-8 py-4 mb-3 mr-6 rounded-lg ">
      <h5 :class="[ no ? 'text-green-900': 'text-red-900' ]" class="text-lg leading-tight truncate">NO</h5>
    </button>
    <!-- End  Mobile Button -->

    <!-- Desktop Button -->
    <button @click="clickNo" :class="[ no ? 'bg-red-300 font-semibold border-red-500': 'bg-red-100 hover:bg-red-200 border-red-200 hover:border-red-300' ]" class="hidden lg:inline-block focus:outline-none border-2 px-8 py-4 mb-3 mr-6 rounded-lg ">
      <h5 :class="[ no ? 'text-green-900': 'text-red-900' ]" class="text-lg leading-tight truncate">NO</h5>
    </button>
    <!-- End Desktop Button -->

  </div>
  <!-- End Buttons -->

<side-message color="red" class="lg:hidden  p-2 -mt-8 pb-8" v-if="!firstTest">
  <ca-message :title="false"></ca-message>
</side-message>

</div>
</template>

<script>
import SideMessage from '@/components/Checkout/SideBar/Elements/SideMessage.vue'
import CAMessage from '@/components/Checkout/SideBar/Elements/Messages/CAMessage.vue'

import { mapState } from 'vuex'

export default {
  components: {
    'side-message' : SideMessage,
    'ca-message' : CAMessage,
  },
  computed: {
    ...mapState('formData', [
      'firstTest'
    ]),
  },
  methods: {
    showAlert() {
      // Use sweetalert2
      this.clickNo();
      this.$swal('Thank you for your interest.',
                  'But is a requirement that you speak and/or read the English proficiently.'
          );
      window.scrollBy(0, 500);
    },
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

<style src='sweetalert2/dist/sweetalert2.min.css'/>
