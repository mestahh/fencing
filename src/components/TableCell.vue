<template>
  <div>
    <template v-if="value === 'n/a'"> </template>
    <template v-else>
      <input
        type="text"
        maxlength="1"
        v-model="value"
        v-uppercase
      />
    </template>
  </div>
</template>

<script>
export default {
  props: ["row", "col"],
  computed: {
    value: {
      get() {
        return this.$store.state.reportMatrix[this.row][this.col];
      },
      set(value) {
        this.$store.dispatch("updateCell", {row: this.row, col: this.col, value: value});
      },
    },
  },
};
</script>

<style scoped>

input {
  max-width: 100%;
  padding: 25px;
  margin: 0px;
  border: 0px;
  height: 50px;
}
</style>
