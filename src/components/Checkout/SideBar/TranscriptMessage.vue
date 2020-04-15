<template>
<div :class="[ (color == 'gray') ? 'text-gray-700' : 'text-'+ color +'-900']" >
  <p :class="[ (color == 'gray') ? 'text-gray-800' : 'text-'+ color +'-900']" class="font-bold text-lg">
    Thank you for your interest.
  </p>
  <p class="mt-8 text-lg">
    But official transcripts are <span class="font-bold">required</span> by the <span class="font-bold">Tennessee Higher Education Commission</span>.
  </p>

  <p class="mt-6">
    Please call Student Services at <span class="font-bold">888-531-8378</span> if you have questions
  </p>


</div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'gray'
    }
  }
}
</script>

<style scoped>
</style>
