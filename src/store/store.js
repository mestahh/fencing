import Vue from "vue";
import Vuex from "vuex";
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    reportMatrix: [["Imre Géza", "n/a"]],
  },
  getters, 
  mutations,
  actions
});

function randomName() {
  var randomNumber = Math.floor(Math.random() * (names.length - 1) + 1);
  return names[randomNumber];
}
