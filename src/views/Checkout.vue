<template>
  <div class="checkout">
    <title-bar title="Checkout"></title-bar>
    <checkout></checkout>
  </div>
</template>

<script>
import Checkout from '@/components/Checkout/Checkout.vue';
import TitleBar from '@/components/Layout/TitleBar.vue';

export default {
  components: {
    Checkout,
    TitleBar
  }
}
</script>
