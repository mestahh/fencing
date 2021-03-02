<template>
  <div class="container">
    <ReportTable></ReportTable>
    <div class="row">
      <div class="col mt-2">
        <button class="btn btn-primary mb-5 mr-2" @click="addNew()">Hozzáadás</button>
        <button class="btn btn-primary mb-5 mr-2" @click="generateLink()">
          Link generálása
        </button>
        <template v-if="isAuthenticated">
          <button class="btn btn-info mb-5 mr-2" @click="save()">Mentés</button>
        </template>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <template v-if="link"
          ><a :href="link" target="_blank"
            >Ide kattintva megoszthatod a jegyzőkönyvet!</a
          ></template
        >
      </div>
    </div>
    <div class="row">
      <div class="col-2">Győzelem pontszáma:</div>
      <div class="col-2">
        <input
          class="form-control"
          type="number"
          name="victoryScore"
          v-model="victoryScore"
        />
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
import ReportTable from "./ReportTable.vue";
var codec = require("json-url")("lzw");

export default {
  name: "App",
  components: {
    ReportTable,
  },
  data: function () {
    return {
      link: "",
    };
  },
  created: function () {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    var matrix = params.get("matrix");
    var victoryScore = params.get("victoryScore");
    if (victoryScore == null) {
      victoryScore = 5;
    }
    if (matrix) {
      codec.decompress(matrix).then((json) => {
        this.$store.dispatch("updateReportMatrix", json);
      });
    }
    this.$store.dispatch("updateVictoryScore", victoryScore);
  },
  computed: {
    name: function() {
      return this.$store.getters.name;
    }, 
    victoryScore: {
      get() {
        var score = this.$store.getters.victoryScore;
        if (isNaN(score)) {
          return "";
        }
        return score;
      },
      set(value) {
        this.$store.dispatch("updateVictoryScore", value);
      },
    },
    orderedMatrix: function () {
      return this.$store.getters.orderedMatrix;
    },
    isAuthenticated: function () {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    save: function () {
      this.$store.dispatch("save");
      this.$toast.open('Elmentve!');
    },
    generateLink: function () {
      codec
        .compress(this.$store.state.reportMatrix)
        .then(
          (result) =>
            (this.link =
              "http://fencing.mestahh.net?matrix=" +
              result +
              "&victoryScore=" +
              this.$store.state.victoryScore)
        );
    },
    addNew: function () {
      this.$store.dispatch("addNew");
    },
    deleteRow: function (index) {
      this.$store.dispatch("delete", index);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
