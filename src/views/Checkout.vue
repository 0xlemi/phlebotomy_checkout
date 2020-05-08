<template>
  <div class="checkout">
    <title-bar title="Checkout"></title-bar>
    <checkout></checkout>
  </div>
</template>

<script>
import TitleBar from '@/components/Layout/TitleBar.vue';
import Checkout from '@/components/Checkout/Checkout.vue';

export default {
  components: {
    TitleBar,
    Checkout
  }
}
</script>
