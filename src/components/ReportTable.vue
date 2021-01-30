<template>
  <div class="row">
    <div class="col">
      <h1 class="text-center">Jegyzőkönyv</h1>
      <div class="table-responsive">
        <table class="table caption-top mt-5 table-striped table-bordered table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col" style="max-width: 65px; width: 65px">#</th>
              <th scope="col">Név</th>
              <th v-for="(cols, index) in reportMatrix" :key="index">{{ index + 1 }}.</th>
              <th scope="col">Gy</th>
              <th scope="col">AT</th>
              <th scope="col">Arány</th>
              <th scope="col">Helyezés</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in reportMatrix"
              :key="rowIndex"
            >
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
              <td class="greenBackground">{{ numberOfVictories(rowIndex) }}</td>
              <td>{{ givenScore(rowIndex) }}</td>
              <td>{{ ratio(rowIndex) }}</td>
              <td class="blueBackground">{{ ranking(row) }}</td>
            </tr>
            <tr style="background-color: white !important;">
              <th scope="row">Kapott tus</th>
              <td>#</td>
              <td v-for="(row, rowIndex) in reportMatrix" :key="rowIndex">
                {{ receivedScore(rowIndex) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
    ranking: function(row) {
      return this.$store.getters.ranking(row);
    },
    deleteFencer: function (row) {
      this.$store.dispatch("delete", row);
    },
    numberOfVictories: function (rowIndex) {
      return this.$store.getters.numberOfVictories(rowIndex);
    },
    givenScore: function (rowIndex) {
      return this.$store.getters.givenScore(rowIndex);
    },
    receivedScore: function (index) {
      return this.$store.getters.receivedScore(index);
    },
    ratio: function (rowIndex) {
      return this.$store.getters.ratio(rowIndex);
    },
  },
};
</script>

<style scoped>
.blueBackground {
  background-color: rgb(149, 216, 243);
}
.greenBackground {
  background-color: rgb(140, 221, 140);
}
.greyBackground {
  background-color: rgb(238, 238, 238);
}

.nameCell {
  max-width: 150px;
  min-width: 65px;
  width: 150px;
  padding: 0px !important;
  height: 50px;
}

.cell {
  max-width: 85px;
  min-width: 85px;
  width: 85px;
  padding: 0px !important;
  height: 50px;
}

.black {
  background-color: black;
}

input {
  background-color: inherit;
  max-width: 100%;
  padding: 25px;
  margin: 0px;
  border: 0px;
  height: 50px;
}
</style>
