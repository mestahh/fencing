<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Jegyzőkönyv</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-if="isAuthenticated()">
            <a class="nav-link" href="#">Archív <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <template v-if="isAuthenticated()"
          ><button class="btn btn-warning" @click="logout()">Sign out</button>
        </template>

        <template v-else>
          <button class="btn btn-primary" @click="login()">Sign in with Google</button>
        </template>
      </div>
    </nav>
    <div>{{ this.$store.state.authenticated }}</div>
    <ReportTable></ReportTable>
    <div class="row">
      <div class="col mt-2">
        <button class="btn btn-primary mb-5 mr-2" @click="addNew()">Hozzáadás</button>
        <button class="btn btn-primary mb-5 mr-2" @click="generateLink()">
          Link generálása
        </button>
        <button class="btn btn-primary mb-5 mr-2" @click="save()">Mentés</button>
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
import ReportTable from "./components/ReportTable.vue";
import firebase from "firebase";

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
    let selfClass = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        selfClass.login();
      } else {
        selfClass.logout();
      }
    });
    if (firebase.auth().currentUser) {
      this.$store.dispatch("login");
    }
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    var matrix = params.get("matrix");
    var victoryScore = params.get("victoryScore");
    console.log(victoryScore);
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
  },
  methods: {
    save: function () {

        var defaultDatabase = firebase.database().ref;

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
    login: function (event) {
      console.log(event);
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          this.$store.dispatch("login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout: function () {
      this.$store.dispatch("logout");
    },
    isAuthenticated: function () {
      console.log(this.$store.getters.authenticated);
      return this.$store.getters.authenticated;
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
