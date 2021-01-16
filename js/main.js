Vue.directive("uppercase", {
  update: function (el) {
    el.value = el.value.toUpperCase();
  },
});

const vueApp = new Vue({
  el: "#vapp",
  data: {
    reportMatrix: [["Imre Géza", "n/a"]],
    orderedMatrix: [],
  },
  methods: {
    validate: function (rowIndex, columnIndex) {
      console.log(rowIndex, columnIndex);
      var cell = this.reportMatrix[rowIndex][columnIndex];
      var cellPair = this.reportMatrix[columnIndex - 1][rowIndex + 1];

      if (columnIndex == 0) {
        return false;
      } else if(
          (cell.toUpperCase() == 'V' && cellPair.toUpperCase() == 'V') ||
          ((cell.toUpperCase() != 'V' && cell.length != 0) && (cellPair.toUpperCase() != 'V' && cellPair.length != 0)) 
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
        victoriesRatio = b[b.length - 2] - a[a.length - 2];
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
      this.reportMatrix.forEach((f) => {
        newFencer.push("");
      });
      newFencer.push("n/a");
      this.reportMatrix.push(newFencer);
    },
    numberOfVictories: function (row) {
      victories = 0;
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
      for (i = 1; i < row.length; i++) {
        if (row[i] == "V" || row[i] == "v") {
          score += 5;
        } else if (row[i] == "n/a") {
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
      for (i = 0; i < this.reportMatrix.length; i++) {
        var value = this.reportMatrix[i][index + 1];
        if (value == "V" || value == "v") {
          score += 5;
        } else if (value == "n/a") {
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
        this.givenScore(this.reportMatrix[rowIndex]) -
        this.receivedScore(rowIndex);
      if (ratio > 0) {
        return "+" + ratio;
      }
      return ratio;
    },
  },
});

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
