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
};
