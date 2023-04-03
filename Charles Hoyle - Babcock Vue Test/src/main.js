// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import AllVehicles from './components/AllVehicles.vue'
import DateRangePicker from './components/DateRangePicker.vue'
import AvailableVehicles from './components/AvailableVehicles.vue'
import DatePicker from './components/DatePicker.vue'

import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('AllVehicles', AllVehicles);
Vue.component('DateRangePicker', DateRangePicker);
Vue.component('AvailableVehicles', AvailableVehicles); 
Vue.component('DatePicker', DatePicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})


