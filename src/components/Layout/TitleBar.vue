<template>
<div class="lg:flex lg:justify-center lg:justify-start bg-red-800 p-2 px-12 lg:p-6">
    <div class="text-white">
        <div class="flex justify-center">
          <p class="lg:hidden items-center block text-base text-red-100 text-white truncate">
            {{ name }}
          </p>
        </div>
      <a class="lg:hidden flex justify-center text-red-100 text-base text-white">
        {{ title }}
      </a>
      <a class="hidden lg:inline-block text-2xl text-white mr-10">
        {{ title }}
      </a>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: ['title'],
  computed: {
    ...mapState('courseInformation', [
      'name'
    ])
  }
}
</script>

<style>

</style>
