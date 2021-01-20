<template>
  <div class="row">
    <div class="col">
      <h1 class="text-center">Jegyzőkönyv</h1>
      <div class="table-responsive">
        <table class="table caption-top mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Név</th>
              <th v-for="(cols, index) in reportMatrix" :key="index">{{ index + 1 }}.</th>
              <th scope="col">Gy</th>
              <th scope="col">AT</th>
              <th scope="col">Arány</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in reportMatrix" :key="rowIndex">
              <th scope="row">
                {{ rowIndex + 1 }}
                <a href="#" @click="deleteFencer(rowIndex)"
                  ><i class="pl-2 fa fa-trash" aria-hidden="true"></i
                ></a>
              </th>
              <td
                v-for="(col, index) in reportMatrix[rowIndex]"
                v-bind:class="{
                  black: col == 'n/a',
                  cell: index != 0,
                  nameCell: index == 0,
                }"
                :key="index + '' + rowIndex"
              >
                <template v-if="index == 0">
                  <input type="text" v-model="reportMatrix[rowIndex][index]" />
                </template>
                <template v-else>
                  <TableCell :row="rowIndex" :col="index"></TableCell>
                </template>
              </td>
              <td>{{ numberOfVictories(row) }}</td>
              <td>{{ givenScore(row) }}</td>
              <td>{{ ratio(rowIndex) }}</td>
              <td>0</td>
            </tr>
            <tr>
              <th scope="row">Kapott tus</th>
              <td>#</td>
              <td v-for="(row, rowIndex) in reportMatrix" :key="rowIndex">
                {{ receivedScore(rowIndex) }}
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <button class="btn btn-primary mb-5" @click="addNew()">Hozzáadás</button>
        <button class="btn btn-primary mb-5" @click="ranking()">Helyezések</button> -->
      </div>
    </div>
    <TableCell :row="0" :col="0"></TableCell>
  </div>
</template>

<script>
import TableCell from "./TableCell.vue";

export default {
  components: {
    TableCell,
  },
  computed: {
    reportMatrix: function () {
      return this.$store.state.reportMatrix;
    },
  },
  methods: {
    deleteFencer: function (row) {
      this.$store.dispatch("delete", row);
    },
    numberOfVictories: function (row) {
      var victories = 0;
      row.forEach((col) => {
        if (col == "V" || col == "v") {
          victories = victories + 1;
        }
      });
      if (isNaN(victories)) {
        victories = 0;
      }
      return victories;
    },
    givenScore: function (row) {
      var score = 0;
      for (var i = 1; i < row.length; i++) {
        if (row[i] == "V" || row[i] == "v") {
          score += 5;
        } else if (row[i] == "n/a" || row[i] === '') {
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
    receivedScore: function (index) {
      var score = 0;
      for (var i = 0; i < this.$store.state.reportMatrix.length; i++) {
        var value = this.$store.state.reportMatrix[i][index + 1];
        if (value == "V" || value == "v") {
          score += 5;
        } else if (value == "n/a" || value === '') {
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
    ratio: function (rowIndex) {
      var ratio =
        this.givenScore(this.$store.state.reportMatrix[rowIndex]) -
        this.receivedScore(rowIndex);
      if (ratio > 0) {
        return "+" + ratio;
      }
      return ratio;
    },
  },
};
</script>

<style scoped>
.nameCell {
  max-width: 150px;
  min-width: 65px;
  width: 150px;
  padding: 0px !important;
  height: 50px;
}
.cell {
  max-width: 65px;
  min-width: 65px;
  width: 65px;
  padding: 0px !important;
  height: 50px;
}

.black {
  background-color: black;
}

td {
  border-right: 1px solid #eeeeee;
  border-left: 1px solid #eeeeee;
}

input {
  max-width: 100%;
  padding: 25px;
  margin: 0px;
  border: 0px;
  height: 50px;
}
</style>
