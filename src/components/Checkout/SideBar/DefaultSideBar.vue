<template>
<div class="">

    <english-message class="p-8" v-if="!values.form1.firstTest && (currentForm == 1 && state == 'CA')"></english-message>

    <transcript-message class="p-8" v-if="!values.form1.firstTest && (currentForm == 1 && state == 'TN')"></transcript-message>

    <div v-if="state == 'TN'" >
      <price-table-tn class="py-8" v-if="currentForm > 1 && currentForm < 5" :payFull="values.form4.payFull" :course-cost="courseCost" :exam-fee="examFeeCost" :insurance="insuranceCost" :deposit="depositAmount" :course-name="name"></price-table-tn>
    </div>

    <div v-else >
      <price-table class="py-8" v-if="currentForm > 1 && currentForm < 5" :payFull="values.form4.payFull" :course-cost="courseCost" :exam-fee="examFeeCost" :insurance="insuranceCost" :deposit="depositAmount" :course-name="name"></price-table>
    </div>

    <!-- Review Information Card -->
    <div v-if="currentForm > 2" :class="[ (currentForm == 5) ? ' pt-6' : 'py-4 pb-10']" class="px-5">
      <div  class=" w-full p-4 bg-gray-200 text-gray-600 border-gray-400 border rounded-lg ">
        <p class=" text-gray-700 text-lg leading-tight truncate">
          Review your Information
        </p>
        <hr class="mt-2 border-gray-400">
        <p class="mt-4 text-gray-700 text-md leading-tight truncate">
          {{ this.values.form2.name + " " + this.values.form2.last_name }}
        </p>
        <p class=" mt-2 text-md leading-tight truncate">
          {{ this.values.form2.email }}
        </p>
        <p class=" mt-2 text-md leading-tight truncate">
          <span class="mr-5">{{ formatedNumber }}</span>
          <span class="mr-5">{{ formatedDob }}</span>
          <span class="">{{ this.values.form2.ssn }}</span>
        </p>
        <!-- address info -->
        <div v-if="currentForm > 3">
          <p class=" mt-6 text-gray-700 text-md leading-tight truncate">
            {{ this.values.form3.address }}
          </p>
          <p class=" mt-2 text-md leading-tight truncate">
            <span class="mr-5">{{ this.values.form3.city }}</span>
            <span class="mr-5">{{ this.values.form3.state}}</span>
            <span class="">{{ this.values.form3.zip }}</span>
          </p>
        </div>
        <!-- payment info -->
        <div v-if="currentForm > 4">
          <p class="mt-5 -mb-2 text-sm">If this information is wrong call <span class="font-bold">888-531-8378</span></p>
        </div>
      </div>
    </div>
    <!-- End Review Information Card -->

    <success-message-side-bar :values="responseData"v-if="currentForm == 5" class="p-8"></success-message-side-bar>
</div>
</template>

<script>

import EnglishMessage from './Elements/EnglishMessage.vue'
import TranscriptMessage from './Elements/TranscriptMessage.vue'
import PriceTable from './Elements/PriceTable.vue'
import PriceTableTN from './Elements/PriceTableTN.vue'
import SuccessMessageSideBar from './Elements/SuccessMessageSideBar.vue'

export default {
  components: {
    'english-message' : EnglishMessage,
    'transcript-message' : TranscriptMessage,
    'price-table' : PriceTable,
    'price-table-tn' : PriceTableTN,
    'success-message-side-bar' : SuccessMessageSideBar
  }
}
</script>

<style scoped>
</style>
