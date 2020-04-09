<template>
  <div class="bg-gray-200" id="app">
    <div class="flex flex-col justify-between max-w-5xl mx-auto" id="app">

      <div id="nav">
        <nav-bar></nav-bar>
      </div>

      <div class="mb-auto bg-white">
        <router-view/>
      </div>

      <div id="footer">
        <v-footer></v-footer>
      </div>

    </div>
  </div>
</template>


<script>
import NavBar from '@/components/Layout/NavBar.vue';
import VFooter from '@/components/Layout/VFooter.vue';


export default {
  components: {
    NavBar,
    VFooter
  }
}

</script>

<style src="@/assets/tailwind.css">
