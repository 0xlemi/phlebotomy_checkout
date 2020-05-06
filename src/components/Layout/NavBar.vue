<template>
<div>
  <nav class="flex items-center justify-between flex-wrap bg-white p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6 lg:ml-8">
          <img class=" h-12 " src="https://www.phlebotomyusa.com/wp-content/uploads/2017/02/logo.jpg" alt="Phlebotomy USA">
      </div>
      <!-- <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"> -->
      <div class="lg:hidden block flex w-auto">

          <mobile-menu-button @click.native="toggleMenu" :active="hamburgerButton" ></mobile-menu-button>
      </div>
      <!-- Desktop Menu -->
      <div class="hidden w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto">
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
      <!-- End Desktop Menu -->
      <!-- Mobile Menu -->
      <div v-if="hamburgerButton" class="w-full lg:hidden">
          <div class="text-md mt-4">
              <a href="#responsive-header" class="hover:bg-gray-200 rounded-lg block px-4 py-3 text-gray-700 hover:text-gray-800 ">
                  LOCATIONS
              </a>
              <a href="#responsive-header" class="hover:bg-gray-200 rounded-lg block px-4 py-3 text-gray-700 hover:text-gray-800 ">
                  VEINVIEWER
              </a>
              <a href="#responsive-header" class="hover:bg-gray-200 rounded-lg block px-4 py-3 text-gray-700 hover:text-gray-800 ">
                  ABOUT US
              </a>
              <a href="#responsive-header" class="hover:bg-gray-200 rounded-lg block px-4 py-3 text-gray-700 hover:text-gray-800 ">
                  CONTACT US
              </a>
              <a href="#responsive-header" class="hover:bg-gray-200 rounded-lg block px-4 py-3 text-gray-700 hover:text-gray-800 ">
                  BLOG
              </a>
          </div>
      </div>
      <!-- End Mobile Menu -->
  </nav>
</div>
</template>

<script>

import DesktopMenu from '@/components/Layout/NavBar/DesktopMenu.vue';
import MobileMenu from '@/components/Layout/NavBar/MobileMenu.vue';
import MobileMenuButton from '@/components/Layout/NavBar/MobileMenuButton.vue';

export default {
  components: {
    'mobile-menu-button': MobileMenuButton
  },
  methods: {
    toggleMenu: function () {
      this.hamburgerButton = !this.hamburgerButton;
    }
  },
  data: function() {
    return {
      hamburgerButton: false
    }
  }

}
</script>

<style>

</style>
