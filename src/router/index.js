import Vue from 'vue'
import VueRouter from 'vue-router'
import Checkout from '@/views/Checkout.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Checkout',
    component: Checkout
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
