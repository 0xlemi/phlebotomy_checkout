<template>
<div class="">
  <!-- National Exam Registration -->
    <!-- Deposit Button -->
    <!-- <div class="flex mt-8">
      <card-button @click.native="toggleButtonExamDates(1)" :selected="hasNationalExam" selectedClass="bg-green-200 border-2 border-green-400  hover:bg-green-300 hover:border-green-400">
        <template v-slot:title>Register</template>
        <template v-slot:header>National Exam Fee</template>
        <template v-slot:text>
          This fee is optional. Only required if you choose to challenge the exam.
        </template>
      </card-button>
    </div> -->
      <!-- End Deposit Button -->

    <div v-if="hasNationalExam" class="mt-8 block text-red-900 ">
      <span class="font-bold text-xl">Select a Date for your National Exam</span>
      <div class="mt-8">
        <div class="mt-2" v-for="(item, index) in examDates">
          <label class="inline-flex items-center">
            <input type="radio" class="form-radio h-5 w-5 text-red-700" name="radio" v-model="nationalExamId" :value="item.id" checked>
            <span class="ml-2">{{item.dayOfTheWeek}} <span class="font-bold">{{item.formattedDate}}</span> at {{item.time}} </span>
          </label>
        </div>
      </div>
    </div>
  <!-- End National Exam Registration -->
</div>
</template>

<script>

import { mapState } from 'vuex'

import CardButton from '@/components/Checkout/Elements/CardButton.vue'

export default {
  components: {
    'card-button': CardButton
  },
  computed: {
    ...mapState('courseInformation', [
      'examDates'
    ]),
    hasNationalExam: {
      get () {
        return this.$store.state.formData.hasNationalExam;
      },
      set (value) {
        this.$store.commit('formData/updateHasNationalExam', value);
      }
    },
    nationalExamId: {
      get () {
        return this.$store.state.formData.nationalExamId;
      },
      set (value) {
        this.$store.commit('formData/updateNationalExamId', value);
      }
    }
  },
  methods: {
    toggleButtonExamDates: function (event){
      this.hasNationalExam = !this.hasNationalExam;
    }
  }
}
</script>

<style scoped>
</style>
