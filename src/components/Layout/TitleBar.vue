<template>
<div class="flex justify-center lg:justify-start bg-red-800 p-2 md:p-6">
      <div class="flex text-white mt-1 justify-center md:ml-8">
          <a class="text-2xl text-white md:mr-10">
            {{ title }}
          </a>
      </div>
  </div >
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>

</style>
