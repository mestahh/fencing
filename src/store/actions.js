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
  login(context) {
    return new Promise((resolve) => {
      context.commit("login");
      resolve();
    });
  },
  logout(context) {
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
      createdAt: "2021-03-01T19:03:03",
      name: "Mikulás kupa",
    };
    firebase
      .database()
      .ref()
      .update(updates);
  },
};
