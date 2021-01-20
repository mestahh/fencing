import Vue from "vue";
import Vuex from "vuex";
import { names } from './random_names.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      reportMatrix: [["Imre Géza", "n/a"]],
    },
    mutations: {
      addNew(state) {
        state.reportMatrix.forEach((f) => {
          f.push("");
        });
        var newFencer = [];
        newFencer.push(randomName());
        state.reportMatrix.forEach(() => {
          newFencer.push("");
        });
        newFencer.push("n/a");
        state.reportMatrix.push(newFencer);
      },
      delete(state, index) {
        if (state.reportMatrix.length == 1) {
          return;
        }
        state.reportMatrix.splice(index, 1);
        state.reportMatrix.forEach((f) => {
          f.splice(index + 1, 1);
        });
      },
      updateCell(state, payload) {
        var row = state.reportMatrix[payload.row];
        row[payload.col] = payload.value;
        Vue.set(state.reportMatrix, payload.row, row);
        
        console.log(state.reportMatrix);
      }
    },
    actions: {
      addNew(context) {
        context.commit("addNew");
      },
      delete(context, payload) {
        context.commit("delete", payload);
      },
      updateCell(context, payload) {
        context.commit('updateCell', payload);
      }
    },
  });

  function randomName() {
    var randomNumber = Math.floor(Math.random() * (names.length - 1) + 1);
    return names[randomNumber];
  }
  
