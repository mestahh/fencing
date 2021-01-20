<template>
    <div class="row">
        <div class="col">
<h1 class="text-center">Jegyzőkönyv</h1>
        <div class="table-responsive">
          <table class="table caption-top mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Név</th>
                <th v-for="(cols, index) in reportMatrix" :key="index">{{ index + 1 }}.</th>
                <th scope="col">Gy</th>
                <th scope="col">AT</th>
                <th scope="col">Arány</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in reportMatrix" :key="rowIndex">
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
                  }" :key="index + '' + rowIndex"
                >
                  <template v-if="index == 0">
                    <input type="text" v-model="reportMatrix[rowIndex][index]" />
                  </template>
                  <template v-else>
                    <template v-if="col == 'n/a'"> </template>
                    <template v-else>
                      <!-- <input
                        type="text"
                        maxlength="1"
                        v-bind:class="{ error: validate(rowIndex, index) }"
                        v-model="reportMatrix[rowIndex][index]"
                        v-uppercase
                      /> -->
                      <input
                        type="text"
                        maxlength="1"
                        v-model="reportMatrix[rowIndex][index]"
                        v-uppercase
                      />
                    </template>
                  </template>
                </td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <!-- <td>{{ numberOfVictories(row) }}</td> -->
                <!-- <td>{{ givenScore(row) }}</td> -->
                <!-- <td>{{ ratio(rowIndex) }}</td> -->
              </tr>
              <tr>
                <th scope="row">Kapott tus</th>
                <td>#</td>
                <td v-for="(row, rowIndex) in reportMatrix" :key="rowIndex">
                  <!-- {{ receivedScore(rowIndex) }} -->
                  0
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <button class="btn btn-primary mb-5" @click="addNew()">Hozzáadás</button>
          <button class="btn btn-primary mb-5" @click="ranking()">Helyezések</button> -->
        </div>
        </div>
        
    </div>
</template>

<script>
export default {
    computed: {
        reportMatrix: function() {
            return this.$store.state.reportMatrix;
        }
    }
   
}
</script>