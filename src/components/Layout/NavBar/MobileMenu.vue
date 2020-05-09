<template>
<!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
<div class="block sm:hidden">
  <div class="px-2 pt-2 pb-3">

    <router-link to="/browse" :class="[ (this.$route.path == '/browse')  ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700']"
    class="block px-3 py-2 rounded-md text-base font-medium
    focus:outline-none transition duration-150 ease-in-out">Browse</router-link>

    <router-link to="/learn" :class="[ (this.$route.path == '/learn')  ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700']" class="mt-1 block px-3 py-2 rounded-md text-base font-medium
    focus:outline-none transition duration-150 ease-in-out">Learn</router-link>

    <router-link to="/new" :class="[ (this.$route.path == '/new')  ? 'text-white bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-700']" class="mt-1 block px-3 py-2 rounded-md text-base font-medium
    focus:outline-none transition duration-150 ease-in-out">New</router-link>
  </div>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
