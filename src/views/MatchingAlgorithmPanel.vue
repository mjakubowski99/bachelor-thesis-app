<template>
  <div>
    <navbar-component> </navbar-component>

    <div>
      <table id="table" class="table table-bordered border-dark mt-5 w-75 ml-auto mr-auto"
             style="box-shadow: 5px 5px 19px -4px #000000;"
      >
        <thead class="bg-dark text-light">
        <tr>
          <th scope="col">Numer</th>
          <th scope="col">I</th>
          <th scope="col">J</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item, index) in data" v-bind:key="index">
          <td>
            <button v-on:click="deleteEdge(index)" class="btn btn-danger" :id="'delete-'+index">
              <delete-icon> </delete-icon>
            </button>
            {{ index + 1 }}
          </td>
          <td>
            <b-input-group class="mb-3 d-flex flex-row">
              <b-form-input
                  type="text"
                  v-model="item.first"
              ></b-form-input>
            </b-input-group>
          </td>
          <td>
            <b-input-group class="mb-3 d-flex flex-row">
              <b-form-input
                  v-model="item.second"
              ></b-form-input>
            </b-input-group>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="text-center mb-2">
        <button @click="doMatching" class="text-center btn btn-primary mr-1"> Znajdź dopasowanie </button>
        <button @click="addItem()" id="add-item" class="btn btn-primary mr-2"> Dodaj krawędź </button>
        <div v-if="prepared">
          <button @click="ableToGenerate = !ableToGenerate" class="btn btn-primary mt-2 ml-1"> Wizualizuj </button>
        </div>
      </div>

    </div>


    <div v-if="prepared">
      <div v-if="ableToGenerate">
        <bipartite-matching-visual
            :creator="bipartite"
            :matching="matching"
        >
        </bipartite-matching-visual>
      </div>
    </div>

  </div>
</template>

<script>

import NavbarComponent from '../components/NavbarComponent.vue'

import {Graph} from '../algorithms/HopcroftKarp/Graph.js'
import {HopcroftKarp} from '../algorithms/HopcroftKarp/Hopcroft.js'
import BipartiteMatchingVisual from "../components/BipartiteMatchingVisual";
import DeleteIcon from "../components/Icons/DeleteIcon";

export default {
  name: "MatchingVisual",
  components: {BipartiteMatchingVisual, NavbarComponent, DeleteIcon},
  data(){
    return{
      data: [],
      matching: [],
      prepared: false,
      ableToGenerate: false,
      bipartite: null,
    }
  },
  methods: {
    addItem(){
      this.data.push(
          {
            first: '',
            second: '',
          }
      );
    },

    deleteEdge(index){
      this.data.splice(index, 1);
    },

    doMatching(){
      let size = 100;

      let bipartite = new Graph(size, size);
      this.bipartite = bipartite;

      for(let i=0; i<this.data.length; i++){
            bipartite.addEdge( parseInt(this.data[i].first), parseInt(this.data[i].second) );
      }

      let A = bipartite.getA();
      let B = bipartite.getB();

      let hopcroftKarp = new HopcroftKarp(A,B);
      let matching = hopcroftKarp.hopcroftKarpAlgorithm();

      this.matching = matching;
      this.prepared = true;
    },

  }
}
</script>

<style scoped>
.form-border{
  border: 1px solid #d9d9d9;
}
</style>