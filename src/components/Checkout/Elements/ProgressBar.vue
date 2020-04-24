<template>
  <div class="relative pt-1 ">
    <div class="flex mb-2 items-center justify-center">
      <div>
        <span :class="[ (step > numberSteps) ? 'text-green-800 bg-green-200': 'text-red-800 bg-red-200' ]" class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full">
          {{ (step > numberSteps) ? "Complete" : "Step " + step + "/" + numberSteps }}
        </span>
      </div>
    </div>
    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200 ">
      <div ref="progressbar-bar" :class="[ (step > numberSteps) ? 'bg-green-400': 'bg-red-400' ]" v-bind:style="styleBar" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: Number,
    numberSteps: Number
  },
  computed: {
    styleBar: function() {
      return { width: this.barPersentage + "%"};
    },
    barPersentage: function() {
      return ( (this.step) / (this.numberSteps + 1) ) * 100;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
