<template>
  <div class="container">
    <ReportTable></ReportTable>
    <div class="row">
      <div class="col mt-2">
        <button class="btn btn-primary mb-5 mr-2" @click="addNew()">Hozzáadás</button>
    <button class="btn btn-primary mb-5" @click="ranking()">Helyezések</button> 
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
import ReportTable from "./components/ReportTable.vue";

export default {
  name: "App",
  components: {
    ReportTable,
  },
  data: function () {
    return {
      orderedMatrix: [],
    };
  },
  methods: {
    addNew: function () {
      this.$store.dispatch("addNew");
      console.log(this.$store.state.reportMatrix);
    },
    deleteRow: function (index) {
      this.$store.dispatch("delete", index);
    },
    ranking: function() {
      this.orderedMatrix = this.$store.getters.ranking;
      console.log(this.orderedMatrix);
    }
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
