<template>
<div class="flex justify-center lg:justify-start bg-red-800 p-6">
      <div class="flex text-white mr-6 lg:ml-8">
          <a class="block text-2xl mt-4 lg:inline-block lg:mt-0 text-white mr-10">
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