<template>
  <div :class="[ (color == 'gray') ? 'text-gray-700' : 'text-'+ color +'-900']" >

    <slot></slot>

  </div>
</template>

<script>
export default {
props: {
    color: {
      type: String,
      default: 'gray'
    }
  }
}
</script>

<style scoped>
</style>
