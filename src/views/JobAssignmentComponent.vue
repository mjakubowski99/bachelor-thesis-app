<template>
  <div>
    <navbar-component> </navbar-component>

    <button class="btn btn-primary mr-2" @click="addColumn"> Add column </button>
    <button class="btn btn-primary ml-2" @click="addRow"> Add row </button>

    <table class="table table-bordered mt-5 text-center">
      <thead>
      <tr>
        <th scope="col"></th>
        <th v-for="column in columns" :key="column" scope="col">{{ column }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row">
        <th scope="row">{{row}}</th>
        <td v-for="column in columns" :key="column"> </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import NavbarComponent from '../components/NavbarComponent.vue'

import {Graph} from '../algorithms/HopcroftKarp/Graph.js'
import {HopcroftKarp} from '../algorithms/HopcroftKarp/Hopcroft.js'

export default {
  name: "JobAssignmentComponent",
  components: {NavbarComponent},
  data(){
    return{
      columns: [],
      rows: [],
    }
  },
  mounted() {
    let bipartite = new Graph(10);
    bipartite.addEdge(1,2);
    bipartite.addEdge(1,3);
    bipartite.addEdge(2, 3);

    let A = bipartite.getA();
    let B = bipartite.getB();

    let hopcroftKarp = new HopcroftKarp(A,B);
    hopcroftKarp.hopcroftKarpAlgorithm();
  },
  methods: {
    addColumn(){
        let text = 'col'
        this.columns.push(text)
    },
    addRow(){
        let text = 'row'
        this.rows.push(text)
    }
  }
}
</script>

<style scoped>

</style>