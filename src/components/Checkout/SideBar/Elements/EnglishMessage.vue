<template>
<div :class="[ (color == 'gray') ? 'text-gray-700' : 'text-'+ color +'-900']" >
  <p :class="[ (color == 'gray') ? 'text-gray-800' : 'text-'+ color +'-900']" class="font-bold text-lg">
    Thank you for your interest.
  </p>
  <p class="mt-6">
    But you indicated that you do <span class="font-bold">not speak and/or read the English
    </span>proficiently.
  </p>

  <p :class="[ (color == 'gray') ? 'text-gray-800' : 'text-'+ color +'-900']" class="font-bold mt-8 text-lg ">Here are your options for successful enrollment:</p>

  <ol class="ml-4 mt-6 list-decimal">
    <li class="">Register and Take the <a class="hover:text-blue-700 text-blue-500 underline" href="https://www.ets.org/toefl/ibt/about?WT.ac=toeflhome_aboutibt_180910" target="_blank">TOEFL iBT Test</a>. It evaluates how well you speak, read, and write english.</li>
    <li class="mt-6">You must receive a <span class="font-bold">score of 50 or above</span> to continue enrollment.</li>
    <li class="mt-6"> Send your passing score at <span class="font-bold">info@phlebotomyusa.com</span></li>
    <li class="mt-6">You are now ready to REGISTER and begin your training. You can do it here OR call Student Services at <span class="font-bold">888-531-8378.</span></li>
  </ol>

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
