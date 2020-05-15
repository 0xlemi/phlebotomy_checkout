import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

// Third Party Libraries
window.axios = require('axios');

Vue.use(require('vue-moment'));
Vue.use(VueSweetalert2);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
