<template>
  <div class="pt-5 -mx-2 sm:mx-0">
    <div  class="w-full p-3 bg-gray-200 text-gray-600 border-gray-400 border rounded-lg ">
      <p class=" text-gray-700 text-lg leading-tight truncate">
        Review your Information
      </p>
      <hr class="mt-2 border-gray-400">
      <p class="mt-3 text-md leading-tight truncate">
        <span class="text-gray-700 ">{{ name + " " + lastName }}</span>
        <span class="ml-3 text-sm">{{ email }}</span>
      </p>
      <p class=" mt-1 text-sm leading-tight truncate">
        <span class="mr-3">{{ formatedDob }}</span>
        <span class="mr-3">{{ ssn }}</span>
        <span class="">{{ formatedNumber }}</span>
      </p>
      <!-- address info -->
      <div>
        <p class=" mt-3 text-gray-700 text-md leading-tight truncate">
          {{ address }}
        </p>
        <p class=" mt-1 text-sm leading-tight truncate">
          <span class="mr-3">{{ city }}</span>
          <span class="mr-3">{{ state}}</span>
          <span class="">{{ zip }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  props: ['currentForm', 'mapGetters'],
  computed: {
    ...mapState('formData', {
      firstTest: 'firstTest',
      payFull: 'payFull',
      name: 'name',
      lastName: 'lastName',
      email: 'email',
      ssn: 'ssn',
      address: 'address',
      address2: 'address2',
      city: 'city',
      state: 'state',
      zip: 'zip'
    }),
    ...mapGetters('formData', [
      'formatedNumber',
      'formatedDob'
    ])
  }
}
</script>

<style scoped>
</style>
