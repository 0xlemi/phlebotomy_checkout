<template>
<div>

  <!-- Table Toggle Button -->
  <div @click="open = !open" :class="[(open) ? 'font-bold' : '' ]" class="-mx-8 border-red-200 border-b-2 border-t-2 mt-4 text-red-900 hover:bg-red-200 hover:border-red-300">
    <div class="flex text-lg mx-8 my-4">
      <div class="flex-1 flex">
        <zondicon icon="shopping-cart" class="h-6 ml-1 fill-current"/>
        <p class="sm:hidden ml-5">Summary</p>
        <p class="hidden sm:inline-block md:hidden ml-5">Order Summary</p>
        <p class="hidden md:inline-block ml-5">Show Order Summary</p>
        <zondicon v-if="!open" icon="cheveron-down" class="ml-3 h-6 fill-current"/>
        <zondicon v-if="open" icon="cheveron-up" class="ml-3 h-6 fill-current"/>
      </div>
      <div class="flex font-bold right-0">

        <p v-if="state == 'TN' && !availableForPayment && courseCost >  0" class="">$ 100</p>
        <p v-else-if="courseCost == 0" class="">$ 0</p>
        <p v-else class="">$ {{ payFull ? totalPrice : depositAmount }}</p>
      </div>
    </div>
  </div>
  <!-- End Table Toggle Button -->

  <div v-if="open" class="-mx-8">
    <table class="w-full mb-10 text-red-900">
      <tbody v-if="state == 'TN' && !availableForPayment && courseCost > 0">
        <tr class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">Due Before Class Starts</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>{{ 100 }}</td>
        </tr>
        <tr class="bg-pink-200 text-pink-900 border-2 border-pink-300 font-semibold">
          <td class="border-r border-pink-300 border px-4 py-2">Remaining Balance</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>{{ totalPrice - 100 }}</td>
        </tr>
      </tbody>
      <tbody v-else-if="courseCost == 0">
        <tr class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">Total</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>0</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-if="state == 'TN'" class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">Administrative Fee <span class="font-bold text-xl">*</span></td>
          <td class="px-4 py-2"><span class="mr-1">$</span>100</td>
        </tr>
        <tr v-if="state == 'TN'" class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">Registration Fee <span class="font-bold text-xl">*</span></td>
          <td class="px-4 py-2"><span class="mr-1">$</span>150</td>
        </tr>
        <tr v-if="state == 'TN'" class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">Books, Supplies and Equipment</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>100</td>
        </tr>
        <tr class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">{{ name }}</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>{{ courseCost - 250 }}</td>
        </tr>
        <tr v-if="!(state == 'TN') || hasNationalExam" class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">Exam Fee</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>{{ examFeeCost }}</td>
        </tr>
        <tr v-if="insuranceCost > 0" class="border-b border-red-200">
          <td class="border-r border-red-200 px-4 py-2">Insurance</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>{{ insuranceCost }}</td>
        </tr>
        <tr v-if="!payFull" class="bg-pink-200 text-pink-900 border-2 border-pink-300 font-semibold">
          <td class="border-r border-pink-300 border px-4 py-2">Remaining Balance</td>
          <td class="px-4 py-2"><span class="mr-1">$</span>{{ remainingBalance }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import Zondicon from 'vue-zondicons';

export default {
  components: {
    'zondicon': Zondicon
  },
  computed: {
    ...mapState('courseInformation', [
      'state',
      'name',
      'courseCost',
      'examFeeCost',
      'insuranceCost',
      'availableForPayment',
      'depositAmount'
    ]),
    ...mapGetters('courseInformation', [
      'remainingBalance',
      'totalPrice'
    ]),
    ...mapState('formData', [
      'payFull',
      'hasNationalExam'
    ])
  },
  data: function() {
    return {
      open: false
    }
  }
}
</script>

<style scoped>
</style>
