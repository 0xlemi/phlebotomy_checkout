<template>
<div class="">

    <english-message class="p-8" v-if="!firstTest && (currentForm == 1 && courseState == 'CA')"></english-message>

    <transcript-message class="p-8" v-if="!firstTest && (currentForm == 1 && courseState == 'TN')"></transcript-message>

    <div v-if="courseState == 'TN'" >
      <price-table-tn class="py-8" v-if="currentForm > 1 && currentForm < 5"></price-table-tn>
    </div>

    <div v-else >
      <price-table class="py-8" v-if="currentForm > 1 && currentForm < 5"></price-table>
    </div>

    <information-card :currentForm="currentForm"></information-card>

    <success-message-side-bar :values="responseData"v-if="currentForm == 5" class="p-8"></success-message-side-bar>
</div>
</template>

<script>
import { mapState } from 'vuex'

import EnglishMessage from './Elements/EnglishMessage.vue'
import TranscriptMessage from './Elements/TranscriptMessage.vue'
import PriceTable from './Elements/PriceTable.vue'
import PriceTableTN from './Elements/PriceTableTN.vue'
import SuccessMessageSideBar from './Elements/SuccessMessageSideBar.vue'
import InformationCard from './Elements/InformationCard.vue'

export default {
  props: ['currentForm'],
  components: {
    'english-message' : EnglishMessage,
    'transcript-message' : TranscriptMessage,
    'price-table' : PriceTable,
    'price-table-tn' : PriceTableTN,
    'success-message-side-bar' : SuccessMessageSideBar,
    'information-card' : InformationCard
  },
  computed: {
    ...mapState('formData', {
      firstTest: 'firstTest',
    }),
    ...mapState('courseInformation', {
      courseState: 'state',
    }),
  }
}
</script>

<style scoped>
</style>
