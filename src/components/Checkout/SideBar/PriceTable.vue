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
        <td class="border px-4 py-2">San Diego National Phlebotomy May Day Class</td>
        <td class="border px-4 py-2">{{ values.course }}</td>
      </tr>
      <tr class="">
        <td class="border px-4 py-2">Exam Fee</td>
        <td class="border px-4 py-2">{{ values.exam_fee }}</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Insurance</td>
        <td class="border px-4 py-2">{{ values.insurance }}</td>
      </tr>

      <tr :class="[ payFull ? 'text-gray-800 font-semibold': 'line-through text-gray-600' ]" class="bg-gray-100">
        <td class="border px-4 py-2">Total</td>
        <td class="border px-4 py-2">{{ total }}</td>
      </tr>
      <tr v-if="!payFull" class="bg-gray-100 text-gray-800 font-semibold">
        <td class="border px-4 py-2">Total<span class="ml-2 font-normal">(deposit)</span></td>
        <td class="border px-4 py-2">250</td>
      </tr>
      <tr v-if="!payFull" class="bg-blue-100 text-blue-800 font-semibold">
        <td class="border px-4 py-2">Remaining Balance</td>
        <td class="border px-4 py-2">{{ remainingBalance }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: {
    values: Object,
    payFull: Boolean
  },
  computed: {
    total: function () {
      // Just sum all the values inside the object
      return Object.values(this.values).reduce((a, b) => a + b);
    },
    remainingBalance: function() {
      return this.total - 250;
    }
  },
}
</script>

<style scoped>
</style>
