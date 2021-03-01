<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Jegyzőkönyv</router-link>
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
            <router-link class="nav-link" to="/tables"
              >Mentett táblák<span class="sr-only">(current)</span></router-link
            >
          </li>
        </ul>
        <template v-if="isAuthenticated()"
          ><button class="btn btn-warning" @click="logout()">Kilépés</button>
          <button class="btn btn-info" @click="save()">Mentés</button>
        </template>

        <template v-else>
          <button class="btn btn-primary" @click="login()">Belépés a Google-lal</button>
        </template>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("login");
      } else {
        this.$store.dispatch("logout");
      }
    });
  },
  methods: {
    save: function () {
      this.$store.dispatch('save');
    },
    login: function () {
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
  },
};
</script>
