<template>
  <!-- Mobile menu button-->
  <button :class="[(active) ? 'bg-gray-600 text-white ' : 'text-gray-500']" class="inline-flex items-center justify-center p-2 focus:outline-none rounded-md  hover:text-white hover:bg-gray-500 transition duration-150 ease-in-out">
    <!-- Icon when menu is closed. -->
    <!-- Menu open: "hidden", Menu closed: "block" -->
    <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
    <!-- Icon when menu is open. -->
    <!-- Menu open: "block", Menu closed: "hidden" -->
    <svg class="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>
</template>

<script>
export default {
  props: ['active']
}
</script>

<style scoped>
</style>
