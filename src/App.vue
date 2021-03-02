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
        <template v-if="isAuthenticated()">
          <img class="userPhoto mr-2" :src="user.photoURL" />
          <button class="btn btn-warning" @click="logout()">Kilépés</button>
        </template>

        <template v-else>
          <button class="btn btn-primary mr-2" @click="login()">
            Belépés a Google-lal
          </button>
          <!-- <button class="btn btn-primary mr-2" @click="facebookLogin()">
            Belépés a Facebook-kal
          </button> -->
        </template>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: function () {
    return {
      user: null,
    };
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.$store.dispatch("login");
      } else {
        this.$store.dispatch("logout");
      }
    });
  },
  methods: {
    login: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          this.user = result.user;
          this.$store.dispatch("login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    facebookLogin: function () {
      const provider = new firebase.auth.FacebookAuthProvider();
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
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
    isAuthenticated: function () {
      return this.$store.getters.authenticated;
    },
  },
};
</script>
<style scoped>
.userPhoto {
  max-width: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 15px #acacac;
}
</style>
