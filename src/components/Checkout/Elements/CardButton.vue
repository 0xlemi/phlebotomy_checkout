<template>
<div style="cursor:pointer;" :class="[ selected ? selectedClass : unselectedClass ]" class="w-1/2 py-6 pl-6 pr-4 mb-3 mr-6 rounded-lg ">
    <div class="flex">
      <div class="w-4/5 mt-1">
        <h5 :class="[ selected ? 'text-green-900': 'text-red-900' ]" class=" font-semibold text-lg leading-tight truncate"><slot name="title"></slot></h5>
        <div :class="[ selected ? 'text-green-800': 'text-pink-900' ]" class="mt-2">
          <slot name="header"></slot>
        </div>
      </div>
      <div class="flex justify-end w-1/5 ml-2 ">
        <div class="h-8">
          <zondicon icon="checkmark-outline" :class="[ selected ? 'h-8': '' ]" class="fill-current text-green-900"/>
        </div>
      </div>
    </div>
    <div :class="[ selected ? 'text-green-700': 'text-pink-900' ]" class="mt-1 mr-1 text-sm">
      <slot name="text"></slot>
    </div>
</div>
</template>

<script>
import Zondicon from 'vue-zondicons';

export default {
  props: {
    selected: {
      type: Boolean,
      required: true
    },
    variable: {
      type: String,
      default: ''
    },
    selectedClass: {
      type: String,
      default: 'bg-green-200 border-2 border-green-400'
    },
    unselectedClass:{
      type: String,
      default: 'bg-red-100 hover:bg-red-200 border-2 border-red-200 hover:border-red-300'
    }
  },
  components: {
    'zondicon': Zondicon
  },
}
</script>

<style scoped>
</style>
