<template>
  <div class="checkout">
    <title-bar title="Checkout"></title-bar>
    <form-payment v-if="true" :has-intro-question="true" ></form-payment>
  </div>
</template>

<script>
import TitleBar from '@/components/Layout/TitleBar.vue';
import FormPayment from '@/components/Checkout/Forms/FormPayment.vue';

export default {
  components: {
    TitleBar,
    FormPayment
  }
}
</script>
