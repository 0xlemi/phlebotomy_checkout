<template>
  <div :class="colorText">

    <h4 :class="colorTextBold" class="text-lg">Notifications / Announcements</h4>
    <p class="mt-2" >
       Many updates regarding the class are done through our <span class="font-bold">Facebook account and by text messages.</span> We will post information about employment, class cancellations due to weather etc. Please visit the <a class="hover:text-blue-700 text-blue-500 underline font-bold" href="https://www.facebook.com/PhlebotomyTrainingSpecialists" target="_blank">PTS Facebook</a> page and “Like” the button.
    </p>

    <h4 :class="colorTextBold" class="mt-6 text-lg">Directions</h4>
    <p class="mt-2">
      For directions to the location you registered for above, please <a class="hover:text-blue-700 text-blue-500 underline font-bold" href="http://phlebotomyusa.com/directions/" target="_blank">click here. </a>
    </p>


    <h4 :class="colorTextBold" class="mt-6 text-lg">Attire</h4>
    <p class="mt-2">
      As we will be drawing blood your attire should be scrubs, or clothes you don't mind getting blood on in the unlikely event of a spill. Please do <span class="font-bold">not wear any OPEN TOED shoes</span> to class and no provocative clothing. Scrubs are preferred but not mandatory.
    </p>

    <h4 :class="colorTextBold" class="mt-6 text-lg">Punctuality</h4>
    <p class="mt-2">
      We encourage you to be on time and if possible 10 minutes early on the first class.
    </p>

    <h4 :class="colorTextBold" class="mt-6 text-lg">Payments</h4>
    <p class="mt-2">
      To make payments please log into your account <a class="hover:text-blue-700 text-blue-500 underline font-bold" :href="link" target="_blank">here</a> or contact student services at <span class="font-bold">888-531-8378.</span>
    </p>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    colorText : {
      type: String,
      default: 'text-gray-700'
    },
    colorTextBold : {
      type: String,
      default: 'text-gray-800'
    }
  },
  computed: {
    ...mapState('responseData', [
      'link'
    ])
  }
}
</script>

<style scoped>
</style>
