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
};
