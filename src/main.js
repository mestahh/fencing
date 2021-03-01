import Vue from "vue";
import App from "./App.vue";
import { store } from './store/store.js';
import firebase from 'firebase/app';

let config = {
  apiKey: "AIzaSyBkDE0ql4QIKnt8oNXo9ugDGSA8SZrQusw",
  authDomain: "fencing-8f36b.firebaseapp.com",
  projectId: "fencing-8f36b",
  storageBucket: "fencing-8f36b.appspot.com",
  messagingSenderId: "69925189409",
  appId: "1:69925189409:web:ed57b73361bb2e51d83060",
  measurementId: "G-L10EK23C5W"
};

firebase.initializeApp(config);

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
