<template>
<div class="text-red-800">

  <h3 class="text-2xl sm:text-3xl font-normal leading-normal mt-2 text-red-900">
    Congratulations
  </h3>
  <h3 class="text-xl sm:text-2xl font-normal leading-normal mt-2 text-red-900">
    Your registration has been received.
  </h3>

  <hr class="border-red-300 mt-5">

  <div class="mb-12">

    <p class="mt-8 font-bold text-lg text-red-900">
      Your Phlebotomy Student Account has been created <br> Please click
      <a class="hover:text-blue-700 text-blue-500 underline font-bold" :href="link" target="_blank">THIS LINK</a> to confirm your account.
    </p>

    <p class="mt-8 text-red-900">
      This is where you will be able to <span class="font-bold">manage your classes & make payments.</span>
      </p>
      <p class="mt-8 text-red-900">
      Please be sure to <span class="font-bold">check your student information</span> & make sure it is all entered correctly. Your name on your <span class="font-bold">certificate will appear EXACTLY  as it is entered</span> here.
    </p>




    <div class="flex justify-center pt-6 ">
      <div class="">
        <div  class="w-full p-6 bg-red-200 text-red-900 border-red-400 border rounded-lg ">
          <div class="flex">
            <div class="mr-6">
              <p class="font-bold">Enrollment Id</p>
              <p class="font-bold">Student Id</p>
              <p class="font-bold">Class</p>
              <p class="font-bold">Dates</p>
              <p class="font-bold">Location</p>
              <p class="font-bold">Time</p>

            </div>
            <div>
              <p>{{ enrollmentId }}</p>
              <p>{{ studentId }}</p>
              <p>National Phlebotomy Training</p>
              <p>
                {{ dateStart |  moment('L') }} - {{dateEnd | moment('L') }}
              </p>
              <p>{{ city }}</p>
              <p>{{ timeStart }} - {{ timeEnd }}</p>
            </div>
          </div>

          <div>
            <p class="mt-5 -mb-4 text-sm">If this information is wrong simply re-register <br> for the correct class or call <span class="font-bold">888-531-8378</span></p>
          </div>
        </div>
      </div>
    </div>


    <p class="mt-8 text-sm text-red-900">
      Our staff will be in touch with you by Email and Text message between now and when class starts.
    </p>

    <p class="mt-12 text-lg text-red-900">
      Thank you. We look forward to seeing you soon!
    </p>
  </div>


</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('responseData', [
      'link',
      'enrollmentId',
      'studentId',
      'dateStart',
      'dateEnd',
      'timeStart',
      'timeEnd',
      'city'
    ])
  }
}
</script>
