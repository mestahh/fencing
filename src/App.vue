<template>
    
    <div class="container">
        <ReportTable></ReportTable>
        <button @click="addNew()">Add</button>
        <button @click="deleteRow(1)">Delete</button>
        
    </div>
</template>

<script>
import ReportTable from './components/ReportTable.vue';

export default {
  name: 'App',
  components: {
    ReportTable
  }, 
  methods: {
    addNew: function() {
      this.$store.dispatch('addNew');
      console.log(this.$store.state.reportMatrix);
      
    },
    deleteRow: function(index) {
      this.$store.dispatch('delete', index);
    }
  }
}
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
