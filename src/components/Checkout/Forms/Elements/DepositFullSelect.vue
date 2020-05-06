<template>
<div class="md:flex mt-8">
      <!-- Deposit Button -->
      <card-button @click.native="toggleButton(1)" :selected="!payFull">
        <template v-slot:title>Pay $250 Deposit</template>
        <template v-slot:header>Non-refundable</template>
        <template v-slot:text>
          If your tuition is paid by a 3rd party call <span class="font-bold">888-531-8378 </span>to register over the phone.
        </template>
      </card-button>
      <!-- End Deposit Button -->

      <!-- Full Button -->
      <card-button @click.native="toggleButton(2)" :selected="payFull">
        <template v-slot:title>Pay in Full</template>
        <template v-slot:header>$250 Non-refundable</template>
        <template v-slot:text>
          Pay Tuition, Insurance and Exam Fee in Full.
        </template>
      </card-button>
      <!-- End Full Button -->

  </div>
</template>

<script>

import CardButton from '@/components/Checkout/Elements/CardButton.vue'

export default {
  components: {
    'card-button': CardButton
  },
  computed: {
    payFull: {
      get () {
        return this.$store.state.formData.payFull;
      },
      set (value) {
        this.$store.commit('formData/updatePayFull', value);
      }
    }
  },
  methods: {
    toggleButton: function (event){
      // Deposit Button Clicked
      if(event == 1){
        if (this.payFull) {
          this.payFull = false;
        }
      }
      // Full Pay Button Clicked
      else if (event == 2) {
        if (!this.payFull) {
          this.payFull = true;
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
