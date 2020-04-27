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
        <td class="border px-4 py-2">{{ courseName }}</td>
        <td class="border px-4 py-2">$ {{ courseCost }}</td>
      </tr>
      <tr>
        <td class="border px-4 py-2">Exam Fee</td>
        <td class="border px-4 py-2">$ {{ examFee }}</td>
      </tr>
      <tr v-if="insurance > 0">
        <td class="border px-4 py-2">Insurance</td>
        <td class="border px-4 py-2">$ {{ insurance }}</td>
      </tr>

      <tr class="text-gray-800 font-semibold bg-gray-100">
        <td class="border px-4 py-2">Total</td>
        <td class="border px-4 py-2">$ {{ total }}</td>
      </tr>
    </tbody>
  </table>
  <p class="mx-6 mt-4">Fees with <span class="font-bold text-xl">*</span> are due before the first day of class.</p>
</div>
</template>

<script>
export default {
  props: {
    courseCost: Number,
    examFee: Number,
    insurance: Number,
    deposit: Number,
    courseName: String,
    payFull: Boolean
  },
  computed: {
    total: function () {
      // Just sum all the values inside the object
      return this.courseCost + this.examFee + this.insurance + this.deposit;
    },
    remainingBalance: function() {
      return this.total - this.deposit;
    }
  },
}
</script>

<style scoped>
</style>
