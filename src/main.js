import Vue from "vue";
import App from "./App.vue";
import { store } from './store/store.js';

Vue.config.productionTip = false;
Vue.directive("uppercase", {
  update: function(el) {
    el.value = el.value.toUpperCase();
  },
});

new Vue({
  store: store,
  render: (h) => h(App),
}).$mount("#app");
