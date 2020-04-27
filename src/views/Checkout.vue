<template>
  <div class="checkout">
    <title-bar title="Checkout"></title-bar>
    <basic-checkout></basic-checkout>
  </div>
</template>

<script>
import TitleBar from '@/components/Layout/TitleBar.vue';
import BasicCheckout from '@/components/Checkout/BasicCheckout.vue';

export default {
  components: {
    TitleBar,
    BasicCheckout
  }
}
</script>
