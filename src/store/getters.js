export default {
  ranking: (state, getters) => (row) => {
    var orderedMatrix = [];
    for (var i = 0; i < state.reportMatrix.length; i++) {
      var value = [
        ...state.reportMatrix[i],
        getters.numberOfVictories(i),
        parseInt(getters.ratio(i)),
        parseInt(getters.givenScore(i)),
      ];
      orderedMatrix.push(value);
    }

    orderedMatrix.sort((a, b) => {
      var victoriesRatio = b[b.length - 3] - a[a.length - 3];
      if (victoriesRatio != 0) {
        return victoriesRatio;
      }
      var ratio = b[b.length - 2] - a[a.length - 2];
      if (ratio != 0) {
        return ratio;
      }
      return b[b.length - 1] - a[a.length - 1];
    });
    for (var j = 0; j < orderedMatrix.length; j++) {
      if (orderedMatrix[j][0] == row[0]) {
        return j + 1;
      }
    }
    return "";
  },
  victoryScore: (state) => {
    return state.victoryScore;
  },
  orderedMatrix: (state) => {
    return state.orderedMatrix;
  },
  numberOfVictories: (state) => (rowIndex) => {
    var victories = 0;
    state.reportMatrix[rowIndex].forEach((col, i) => {
      if (col.toUpperCase().includes("V") && i != 0) {
        victories = victories + 1;
      }
    });
    if (isNaN(victories)) {
      victories = 0;
    }
    return victories;
  },
  givenScore: (state) => (rowIndex) => {
    var score = 0;
    var row = state.reportMatrix[rowIndex];
    for (var i = 1; i < row.length; i++) {
      const cellValue = row[i].toUpperCase();
      if (cellValue.includes("V")) {
        if (cellValue == "V") {
          score += state.victoryScore;
        } else {
          var winScore = cellValue.replace("V", "");
          score += parseInt(winScore);
        }
      } else if (row[i] == "n/a" || row[i] === "") {
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
  receivedScore: (state) => (index) => {
    var score = 0;
    for (var i = 0; i < state.reportMatrix.length; i++) {
      var value = state.reportMatrix[i][index + 1].toUpperCase();
      if (value.includes("V")) {
        if (value == "V") {
          score += state.victoryScore;
        } else {
          var winScore = value.replace("V", "");
          score += parseInt(winScore);
        }
      } else if (value == "N/A" || value === "") {
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
  ratio: (state, getters) => (rowIndex) => {
    var ratio = getters.givenScore(rowIndex) - getters.receivedScore(rowIndex);
    if (ratio > 0) {
      return "+" + ratio;
    }
    return ratio;
  },
};
