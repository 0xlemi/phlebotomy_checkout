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
        <td class="border px-4 py-2">Administrative Fee <span class="font-bold text-xl">*</span></td>
        <td class="border px-4 py-2">$ 100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Registration Fee <span class="font-bold text-xl">*</span></td>
        <td class="border px-4 py-2">$ 150</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Books, Supplies and Equipment</td>
        <td class="border px-4 py-2">$ 100</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">{{ name }}</td>
        <td class="border px-4 py-2">$ {{ courseCost - 250 }}</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Exam Fee</td>
        <td class="border px-4 py-2">$ {{ examFeeCost }}</td>
      </tr>
      <tr v-if="insuranceCost > 0">
        <td class="border px-4 py-2">Insurance</td>
        <td class="border px-4 py-2">$ {{ insuranceCost }}</td>
      </tr>

      <tr class="text-gray-800 font-semibold bg-gray-100">
        <td class="border px-4 py-2">Total</td>
        <td class="border px-4 py-2">$ {{ totalPrice }}</td>
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
  },
}
</script>

<style scoped>
</style>
