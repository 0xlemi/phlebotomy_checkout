<template>
<div v-if="valid">

    <side-message class="p-8" v-if="!firstTest && (currentForm == 1 && courseState == 'CA')">
      <ca-message></ca-message>
    </side-message>

    <side-message class="p-8" v-if="!firstTest && (currentForm == 1 && courseState == 'TN')">
      <tn-message></tn-message>
    </side-message>

    <price-table class="py-8" v-if="currentForm > 1 && currentForm < 5"></price-table>

    <information-card :currentForm="currentForm"></information-card>

    <success-message-side-bar v-if="currentForm == 5" class="p-8"></success-message-side-bar>
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
  props: ['currentForm'],
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
    }),
  }
}
</script>

<style scoped>
</style>
