<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="text-center">Jegyzőkönyv</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro dolor atque similique nesciunt at, nulla nihil, ipsam dolorum eveniet ipsa nostrum magni dignissimos, rem molestias soluta sit cupiditate fuga incidunt?</p>
        <div class="table-responsive">
          <table class="table caption-top mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Név</th>
                <th v-for="(cols, index) in reportMatrix">{{ index + 1 }}.</th>
                <th scope="col">Gy</th>
                <th scope="col">AT</th>
                <th scope="col">Arány</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in reportMatrix">
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
                >
                  <template v-if="index == 0">
                    <input type="text" v-model="reportMatrix[rowIndex][index]" />
                  </template>
                  <template v-else>
                    <template v-if="col == 'n/a'"> </template>
                    <template v-else>
                      <input
                        type="text"
                        maxlength="1"
                        v-bind:class="{ error: validate(rowIndex, index) }"
                        v-model="reportMatrix[rowIndex][index]"
                        v-uppercase
                      />
                    </template>
                  </template>
                </td>
                <td>{{ numberOfVictories(row) }}</td>
                <td>{{ givenScore(row) }}</td>
                <td>{{ ratio(rowIndex) }}</td>
              </tr>
              <tr>
                <th scope="row">Kapott tus</th>
                <td>#</td>
                <td v-for="(row, rowIndex) in reportMatrix">
                  {{ receivedScore(rowIndex) }}
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary mb-5" @click="addNew()">Hozzáadás</button>
          <button class="btn btn-primary mb-5" @click="ranking()">Helyezések</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <template v-if="orderedMatrix.length != 0">
          <div v-for="(fencer, index) in orderedMatrix" v-bind:key="index">
            {{ index + 1 }}. {{ fencer[0] }}
          </div>
        </template>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="text-center small grey pt-5">
          Sírás, rívás és a hála szavai ide:
          <a href="mailto:balazs.mester@gmail.com">Mester Balázs</a>, &copy;{{
            new Date().getFullYear()
          }}
        </p>
        <p class="text-center small grey">
          Itt meg mindenféle zenék vannak tőlem:
          <a href="https://mestahh.net">http://mestahh.net</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportTable",
  data: function () {
    return {
      reportMatrix: [["Imre Géza", "n/a"]],
      orderedMatrix: [],
    };
  },
  methods: {
    validate: function (rowIndex, columnIndex) {
      var cell = this.reportMatrix[rowIndex][columnIndex];
      var cellPair = this.reportMatrix[columnIndex - 1][rowIndex + 1];

      if (columnIndex == 0) {
        return false;
      } else if (
        (cell.toUpperCase() == "V" && cellPair.toUpperCase() == "V") ||
        (cell.toUpperCase() != "V" &&
          cell.length != 0 &&
          cellPair.toUpperCase() != "V" &&
          cellPair.length != 0)
      ) {
        return true;
      }
      return false;
    },
    ranking: function () {
      this.orderedMatrix = [];
      for (var i = 0; i < this.reportMatrix.length; i++) {
        var value = [
          ...this.reportMatrix[i],
          this.numberOfVictories(this.reportMatrix[i]),
          parseInt(this.ratio(i)),
          parseInt(this.givenScore(this.reportMatrix[i])),
        ];
        this.orderedMatrix.push(value);
      }

      this.orderedMatrix.sort((a, b) => {
        var victoriesRatio = b[b.length - 2] - a[a.length - 2];
        if (victoriesRatio != 0) {
          return victoriesRatio;
        }
        var ratio = b[b.length - 1] - a[a.length - 1];
        if (ratio != 0) {
          return ratio;
        }
        console.log("Ratio not null");
        return b[b.length] - a[a.length];
      });
    },
    deleteFencer: function (index) {
      if (this.reportMatrix.length == 1) {
        return;
      }
      this.reportMatrix.splice(index, 1);
      this.reportMatrix.forEach((f) => {
        f.splice(index + 1, 1);
      });
    },
    addNew: function () {
      var numberOfFencers = this.reportMatrix.length;
      this.reportMatrix.forEach((f) => {
        f.push("");
      });
      var newFencer = [];
      newFencer.push(randomName());
      this.reportMatrix.forEach(() => {
        newFencer.push("");
      });
      newFencer.push("n/a");
      this.reportMatrix.push(newFencer);
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
        } else if (row[i] == "n/a") {
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
      for (var i = 0; i < this.reportMatrix.length; i++) {
        var value = this.reportMatrix[i][index + 1];
        if (value == "V" || value == "v") {
          score += 5;
        } else if (value == "n/a") {
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
        this.givenScore(this.reportMatrix[rowIndex]) - this.receivedScore(rowIndex);
      if (ratio > 0) {
        return "+" + ratio;
      }
      return ratio;
    },
  },
};

function randomName() {
  var randomNumber = Math.floor(Math.random() * (names.length - 1) + 1);
  console.log(randomNumber);
  return names[randomNumber];
}

const names = [
  "Nyomo Réka",
  "Para Zita",
  "Patta Nóra",
  "Pár Zoltán",
  "Pop Simon",
  "Remek Elek",
  "Beviz Elek",
  "Szalmon Ella",
  "Techno Kolos",
  "Trab Antal",
  "Ultra Viola",
  "Am Erika",
  "Bac Ilus",
  "Citad Ella",
  "Dil Emma",
  "Eszte Lenke",
  "Feles Elek",
  "Füty Imre",
  "Git Áron",
  "Har Mónika",
  "Heu Réka",
  "Hü Jenő",
  "Kukor Ica",
  "Kala Pál",
  "Zsíros B. Ödön",
  "Külö Nóra",
  "Körm Ödön",
  "Kér Ede",
  "Major Anna",
  "Meg Győző",
  "Vak Cina",
  "Veg Eta",
  "Virra Dóra",
  "Vég Béla",
  "Wincs Eszter",
  "Kasza Blanka",
  "Kandisz Nóra",
  "Kispál Inka",
  "Pofá Zoltán",
  "Budipa Piroska",
  "Tank Aranka",
  "Bekre Pál",
  "Cicz Imre",
  "Mortad Ella",
  "Trap Pista",
  "Fejet Lenke",
  "Csecs Emőke",
  "Fá Zoltán",
  "Minden Áron",
  "Csin Csilla",
  "Mor Zsolt",
  "Rabsz Olga",
  "Koaxk Ábel",
  "Patkóm Ágnes",
  "Locsolók Anna",
  "Riz Ottó",
  "Nemer Eszti",
  "Ne Pál",
  "Ka Pál",
  "Elektrom Ágnes",
  "Hú Zóra",
  "Raj Zóra",
  "Dia Dóra",
  "Tüdő R. Ákos",
  "Tök Ödön",
  "Ria Dóra",
  "Lev Elek",
  "Hot Elek",
  "Teásk Anna",
  "Bármi Áron",
  "Hugyo Zoltán",
  "Metall Ica",
  "Va Gina",
  "Csik Lóránt",
  "Masztur Balint",
  "Bor Virág",
  "Ví Zóra",
  "Gá Zóra",
  "Nyúl Kálmán",
  "Ipsz Ilonka",
  "Mikorka Kálmán",
  "Petting Elek",
  "Szikla Szilárd",
  "Ebéd Elek",
];
</script>

<style scoped>
.black {
  background-color: black;
}

.error {
  background-color: rgb(227, 117, 117);
}

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
