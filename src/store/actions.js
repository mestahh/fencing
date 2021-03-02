import firebase from "firebase";

export default {
  addNew(context) {
    context.commit("addNew");
  },
  delete(context, payload) {
    context.commit("delete", payload);
  },
  updateCell(context, payload) {
    context.commit("updateCell", payload);
  },
  updateVictoryScore(context, payload) {
    context.commit("updateVictoryScore", payload);
  },
  updateReportMatrix(context, payload) {
    context.commit("updateReportMatrix", payload);
  },
  changeName(context, payload) {
    context.commit('changeName', payload);
  },
  login(context) {
    return new Promise((resolve) => {
      context.commit("login");
      resolve();
    });
  },
  logout(context) {
    firebase.auth().signOut();
    return new Promise((resolve) => {
      context.commit("logout");
      resolve();
    });

  },
  save({ commit, getters }) {
    var newTableKey;
    if (getters.tableId == null) {
      newTableKey = firebase
        .database()
        .ref()
        .child("tables")
        .push().key;
      commit("save", newTableKey);
    } else {
      newTableKey = getters.tableId;
    }
    var userId = firebase.auth().currentUser.email;
    var updates = {};
    updates["/tables/" + newTableKey] = {
      reportMatrix: getters.reportMatrix,
      userid: userId,
      createdAt: new Date().toISOString(),
      name: 'verseny_' + new Date().toISOString(),
    };
    firebase
      .database()
      .ref()
      .update(updates);
  },
};
