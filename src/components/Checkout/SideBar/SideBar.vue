<template>
<div v-if="valid">

    <side-message class="p-8" v-if="!firstTest && (currentForm == numForms - 4 && courseState == 'CA')">
      <ca-message></ca-message>
    </side-message>

    <side-message class="p-8" v-if="!firstTest && (currentForm == numForms - 4 && courseState == 'TN')">
      <tn-message></tn-message>
    </side-message>


    <price-table class="py-8" v-if="currentForm > numForms - 4 && currentForm < numForms"></price-table>



    <information-card :currentForm="currentForm" :numForms="numForms"></information-card>

    <success-message-side-bar v-if="currentForm == numForms" class="p-8"></success-message-side-bar>
</div>
</template>

<script>
import { mapState } from 'vuex'

import SideMessage from './Elements/SideMessage.vue'
import CAMessage from './Elements/Messages/CAMessage.vue'
import TNMessage from './Elements/Messages/TNMessage.vue'
import PriceTable from './Elements/PriceTable.vue'
import SuccessMessageSideBar from './Elements/SuccessMessageSideBar.vue'
import InformationCard from './Elements/InformationCard.vue'

export default {
  props: ['currentForm', 'numForms'],
  components: {
    'side-message' : SideMessage,
    'ca-message' : CAMessage,
    'tn-message' : TNMessage,
    'price-table' : PriceTable,
    'success-message-side-bar' : SuccessMessageSideBar,
    'information-card' : InformationCard
  },
  computed: {
    ...mapState('formData', {
      firstTest: 'firstTest',
    }),
    ...mapState('courseInformation', {
      valid: 'valid',
      courseState: 'state',
      availableForPayment: 'availableForPayment'
    }),
  }
}
</script>

<style scoped>
</style>
