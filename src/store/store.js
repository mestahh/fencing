import Vue from "vue";
import Vuex from "vuex";
import { names } from "./random_names.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    reportMatrix: [["Imre Géza", "n/a"]],
  },
  getters: {
    ranking: (state, getters) => {
        var orderedMatrix = [];
        for (var i = 0; i < state.reportMatrix.length; i++) {
          var value = [
            ...state.reportMatrix[i],
            getters.numberOfVictories(i),
            parseInt(getters.ratio(i)),
            parseInt(getters.givenScore(i)),
          ];
          orderedMatrix.push(value);
        }
  
        orderedMatrix.sort((a, b) => {
          var victoriesRatio = b[b.length - 2] - a[a.length - 2];
          if (victoriesRatio != 0) {
            return victoriesRatio;
          }
          var ratio = b[b.length - 1] - a[a.length - 1];
          if (ratio != 0) {
            return ratio;
          }
          return b[b.length] - a[a.length];
        });
        return orderedMatrix;
      },
    numberOfVictories: (state) => (rowIndex) => {
      var victories = 0;
      state.reportMatrix[rowIndex].forEach((col) => {
        if (col == "V" || col == "v") {
          victories = victories + 1;
        }
      });
      if (isNaN(victories)) {
        victories = 0;
      }
      return victories;
    },
    givenScore: (state) => (rowIndex) => {
      var score = 0;
      var row = state.reportMatrix[rowIndex];
      for (var i = 1; i < row.length; i++) {
        if (row[i] == "V" || row[i] == "v") {
          score += 5;
        } else if (row[i] == "n/a" || row[i] === "") {
          // don't do anything
        } else {
          score += parseInt(row[i]);
        }
      }

      if (isNaN(score)) {
        score = 0;
      }
      return score;
    },
    receivedScore: (state) => (index) => {
      var score = 0;
      for (var i = 0; i < state.reportMatrix.length; i++) {
        var value = state.reportMatrix[i][index + 1];
        if (value == "V" || value == "v") {
          score += 5;
        } else if (value == "n/a" || value === "") {
          // don't do anything
        } else {
          score += parseInt(value);
        }
      }
      if (isNaN(score)) {
        score = 0;
      }
      return score;
    },
    ratio: (state, getters) => (rowIndex) => {
      var ratio =
        getters.givenScore(rowIndex) - getters.receivedScore(rowIndex);
      if (ratio > 0) {
        return "+" + ratio;
      }
      return ratio;
    }
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
    },
  },
  actions: {
    addNew(context) {
      context.commit("addNew");
    },
    delete(context, payload) {
      context.commit("delete", payload);
    },
    updateCell(context, payload) {
      context.commit("updateCell", payload);
    },
  },
});

function randomName() {
  var randomNumber = Math.floor(Math.random() * (names.length - 1) + 1);
  return names[randomNumber];
}
