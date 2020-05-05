<template>
<div>
  <nav class="flex items-center justify-between flex-wrap bg-white p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6 lg:ml-8">
          <img class=" h-12 " src="https://www.phlebotomyusa.com/wp-content/uploads/2017/02/logo.jpg" alt="Phlebotomy USA">
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
              <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-500 lg:ml-6 mr-8">
                  LOCATIONS
              </a>
              <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-500 mr-8">
                  VEINVIEWER
              </a>
              <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-500 mr-8">
                  ABOUT US
              </a>
              <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-500 mr-8">
                  CONTACT US
              </a>
              <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-500 mr-10">
              BLOG
              </a>
              <a class="hidden lg:block lg:mt-4 lg:inline-block lg:mt-0 text-xl text-red-800">
              888-531-8378
              </a>
          </div>
      </div>
  </nav>
</div>
</template>

<script>

import DesktopMenu from '@/components/Layout/NavBar/DesktopMenu.vue';
import MobileMenu from '@/components/Layout/NavBar/MobileMenu.vue';
import MobileMenuButton from '@/components/Layout/NavBar/MobileMenuButton.vue';

export default {

}
</script>

<style>

</style>
