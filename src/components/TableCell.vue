<template>
  <div>
    <template v-if="value === 'n/a'"> </template>
    <template v-else>
      <input
        type="text"
        maxlength="3"
        v-model="value"
        v-uppercase
        v-bind:class="{ error: validate(row, col) }"
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
  methods: {
    validate: function (rowIndex, columnIndex) {
      var cell = this.$store.state.reportMatrix[rowIndex][columnIndex].toUpperCase();
      var cellPair = this.$store.state.reportMatrix[columnIndex - 1][rowIndex + 1].toUpperCase();

      if (columnIndex == 0) {
        return false;
      } else if (
        (cell.includes("V") && cellPair.includes("V")) ||
        (!cell.includes("V") &&
          cell.length != 0 &&
          !cellPair.includes("V") &&
          cellPair.length != 0)
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>

input {
  max-width: 100%;
  padding: 25px;
  margin: 0px;
  border: 0px;
  height: 50px;
  background-color: inherit;
}

.error {
  background-color: rgb(227, 117, 117);
}
</style>
