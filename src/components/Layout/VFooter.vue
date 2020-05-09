<template>
<div>
  <footer>
    <div class="w-full pin-b block md:flex bg-gray-800 p-8">

      <div class="flex-1 flex md:block text-gray-600 text-left mx-6 mb-8 md:mb-0 justify-center">
          <div class="mx-3"><a class="hover:text-gray-500" href="#">State Approvals</a></div>
          <div class="mx-3"><a class="hover:text-gray-500" href="#">Careers with PTS</a></div>
          <div class="mx-3"><a class="hover:text-gray-500" href="#">Contact Us</a></div>
      </div>

      <div class="flex-1 mb-8 md:mb-0">
          <div class="flex justify-center my-3">
              <img class=" h-12 rounded-md" src="https://www.phlebotomyusa.com/wp-content/uploads/2017/02/logo.jpg" alt="Phlebotomy USA">
          </div>
      </div>

        <div class="flex-1 mx-6">
            <div class="flex justify-center my-3">
              <shopper-approved></shopper-approved>
            </div>
        </div>
    </div>
      <div class="w-full pin-b text-center bg-gray-900 p-4">
          <a class="text-gray-600">© Phlebotomy Training Specialists 1993-2020 - All Rights Reserved</a>
    </div>
  </footer>
</div>
</template>


<script>

import ShopperApproved from './ShopperApproved.vue'

export default {
  components: {
    'shopper-approved': ShopperApproved
  }

}
</script>

<style scoped>
</style>
