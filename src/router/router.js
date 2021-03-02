import MainPage from "../components/MainPage.vue";
import SavedTables from "../components/SavedTables.vue";
import VueRouter from 'vue-router';
import { store } from '../store/store.js';

export const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: "", component: MainPage },
      { path: "/tables", component: SavedTables, beforeEnter: (to, from, next) => {
        if (store.state.authenticated) {
          next();
        } else {
          next('/');
        }
      } }
    ]
  });