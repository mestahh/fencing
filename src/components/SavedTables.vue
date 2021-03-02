<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Mentett versenyek</h1>
        <div class="table-responsive">
          <table class="table caption-top mt-5 table-striped table-bordered table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Név</th>
                <th scope="col">Időpont</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="table in tables" :key="table.key">
                <td>{{ table.name }}</td>
                <td>{{ table.createdAt }}</td>
                <td>
                  <button class="btn btn-primary" @click="load(table.key)">Betölt</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data: function () {
    return {
      tables: [],
    };
  },
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var savedTables = firebase.database()
          .ref("tables/")
          .orderByChild("userid")
          .equalTo(user.email);
        savedTables.on("value", (data) => {
          data.forEach((v) => {
            console.log(v);
            this.tables.push({...v.val(), key: v.ref_.key});
          });
        });
      }
    });
  },
  methods: {
    load: function (key) {
      this.tables.forEach((t) => {
        if (t.key === key) {
          this.$store.state.reportMatrix = t.reportMatrix;
          this.$store.state.tableId = t.key;
          this.$store.state.name = t.name;
        }
      });
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
