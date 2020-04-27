<template>

<div class="text-gray-700">
  <table class="table-fixed">
    <thead>
      <tr>
        <th class="w-3/4 px-4 py-2">Concept</th>
        <th class="w-1/4 px-4 py-2">Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border px-4 py-2">{{ name }}</td>
        <td class="border px-4 py-2">$ {{ courseCost }}</td>
      </tr>
      <tr class="">
        <td class="border px-4 py-2">Exam Fee</td>
        <td class="border px-4 py-2">$ {{ examFeeCost }}</td>
      </tr>
      <tr v-if="insuranceCost > 0">
        <td class="border px-4 py-2">Insurance</td>
        <td class="border px-4 py-2">$ {{ insuranceCost }}</td>
      </tr>

      <tr :class="[ payFull ? 'text-gray-800 font-semibold': 'line-through text-gray-600' ]" class="bg-gray-100">
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
</div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('courseInformation', [
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
      'payFull'
    ])
  }
}
</script>

<style scoped>
</style>
