<template>
  <div v-if="currentForm > 2" :class="[ (currentForm == 5) ? ' pt-6' : 'py-4 pb-10']" class="px-5">
    <div  class=" w-full p-4 bg-gray-200 text-gray-600 border-gray-400 border rounded-lg ">
      <p class=" text-gray-700 text-lg leading-tight truncate">
        Review your Information
      </p>
      <hr class="mt-2 border-gray-400">
      <p class="mt-4 text-gray-700 text-md leading-tight truncate">
        {{ name + " " + last_name }}
      </p>
      <p class=" mt-2 text-md leading-tight truncate">
        {{ email }}
      </p>
      <p class=" mt-2 text-md leading-tight truncate">
        <span class="mr-5">{{ formatedNumber }}</span>
        <span class="mr-5">{{ formatedDob }}</span>
        <span class="">{{ ssn }}</span>
      </p>
      <!-- address info -->
      <div v-if="currentForm > 3">
        <p class=" mt-6 text-gray-700 text-md leading-tight truncate">
          {{ address }}
        </p>
        <p class=" mt-2 text-md leading-tight truncate">
          <span class="mr-5">{{ city }}</span>
          <span class="mr-5">{{ state}}</span>
          <span class="">{{ zip }}</span>
        </p>
      </div>
      <!-- payment info -->
      <div v-if="currentForm > 4">
        <p class="mt-5 -mb-2 text-sm">If this information is wrong call <span class="font-bold">888-531-8378</span></p>
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
