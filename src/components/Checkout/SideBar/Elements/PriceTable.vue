<template>

<div class="text-gray-700">
  <table class="table-fixed w-full">
    <thead>
      <tr>
        <th class="w-3/4 px-4 py-2">Concept</th>
        <th class="w-1/4 px-4 py-2">Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="state == 'TN'">
        <td class="border px-4 py-2">Administrative Fee <span class="font-bold text-xl">*</span></td>
        <td class="border px-4 py-2">$ 100</td>
      </tr>
      <tr v-if="state == 'TN'">
        <td class="border px-4 py-2">Registration Fee <span class="font-bold text-xl">*</span></td>
        <td class="border px-4 py-2">$ 150</td>
      </tr>
      <tr v-if="state == 'TN'">
        <td class="border px-4 py-2">Books, Supplies and Equipment</td>
        <td class="border px-4 py-2">$ 100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">{{ name }}</td>
        <td class="border px-4 py-2">$ {{ courseCost - 250 }}</td>
      </tr>
      <tr v-if="!(state == 'TN') || hasNationalExam">
        <td class="border px-4 py-2">Exam Fee</td>
        <td class="border px-4 py-2">$ {{ examFeeCost }}</td>
      </tr>
      <tr v-if="insuranceCost > 0">
        <td class="border px-4 py-2">Insurance</td>
        <td class="border px-4 py-2">$ {{ insuranceCost }}</td>
      </tr>

      <tr :class="[ payFull ? 'text-gray-800 bg-gray-100 font-semibold': 'line-through text-gray-600' ]" class="">
        <td class="border px-4 py-2">Total</td>
        <td class="border px-4 py-2">$ {{ totalPrice }}</td>
      </tr>
      <tr v-if="!payFull" class="bg-gray-100 text-gray-800 font-semibold">
        <td class="border px-4 py-2">Total<span class="ml-2 font-normal">(depositAmount)</span></td>
        <td class="border px-4 py-2">$ {{ depositAmount }}</td>
      </tr>
      <tr v-if="!payFull" class="bg-blue-100 text-blue-800 font-semibold">
        <td class="border px-4 py-2">Remaining Balance</td>
        <td class="border px-4 py-2">$ {{ remainingBalance }}</td>
      </tr>
    </tbody>
  </table>
  <p class="mx-6 mt-4">Fees with <span class="font-bold text-xl">*</span> are due before the first day of class.</p>
</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('courseInformation', [
      'state',
      'name',
      'courseCost',
      'examFeeCost',
      'insuranceCost',
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
}
</script>

<style scoped>
</style>
