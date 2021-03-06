import { names } from "./random_names.js";
import Vue from "vue";

export default {
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
  updateVictoryScore(state, payload) {
    state.victoryScore = parseInt(payload);
  },
  updateReportMatrix(state, payload) {
    state.reportMatrix = payload;
  },
  login(state) {
    state.authenticated = true;
  },
  logout(state) {
    state.authenticated = false;
  },
  save(state, tableKey) {
    state.tableId = tableKey;
  },
  changeName(state, name) {
    state.name = name;
  }
};

function randomName() {
  var randomNumber = Math.floor(Math.random() * (names.length - 1) + 1);
  return names[randomNumber];
}
