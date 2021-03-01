import Vue from "vue";
import App from "./App.vue";
import MainPage from "./components/MainPage.vue";
import SavedTables from "./components/SavedTables.vue";
import { store } from './store/store.js';
import VueRouter from 'vue-router';


const router = new VueRouter({
  routes: [
    { path: "", component: MainPage },
    { path: "/tables", component: SavedTables }
  ]
});

Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.directive("uppercase", {
  update: function(el) {
    el.value = el.value.toUpperCase();
  },
});

new Vue({
  store: store,
  render: (h) => h(App),
  router
}).$mount("#app");
