<template>
  <div class="text-light">
    <navbar-component> </navbar-component>

    <div v-if="generated" class="text-center mb-2 mt-2">
      <button @click="startGenerator" class="btn btn-dark"> Wizualizacja zadanego grafu </button>
    </div>

    <div v-if="generated">
      <div v-if="clicked">
        <interval-graph-coloring-visual :creator="generateGraph()"> </interval-graph-coloring-visual>
      </div>
    </div>

    <div class="text-center text-dark mt-3"> Podanie -1 w polu dla wierzchołka j spowoduje dodanie tylko wierzchołka z pola i</div>
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
              <button v-on:click="deleteSchedule(index)" class="btn btn-danger" :id="'delete-'+index">
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

    <div class="text-center">
      <button @click="addItem()" id="add-item" class="btn btn-primary mb-5 mr-2"> Dodaj krawędź </button>
      <button @click="doSchedule()" class="btn btn-primary mb-5 mr-2"> Generuj graf </button>
    </div>

  </div>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent";

import {GraphCreator} from '../algorithms/IntervalColoring/GraphCreator.js'
import {LexBfs} from '../algorithms/IntervalColoring/LexBfs.js'
import {IntervalGraphColoring} from '../algorithms/IntervalColoring/IntervalGraphColoring.js'
import IntervalGraphColoringVisual from "../components/IntervalGraphColoringVisual";
import DeleteIcon from "../components/Icons/DeleteIcon";

export default {
  name: "IntervalGraphColoringPanel",
  components: {NavbarComponent, IntervalGraphColoringVisual, DeleteIcon},

  data() {
    return {
      data: [],
      coloring: [],
      creator: null,
      generated: false,
      clicked: false,
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

    deleteSchedule(index){
      this.data.splice(index, 1);
    },

    buildGraph(){
      let size = 1000;
      const creator = new GraphCreator(size+1);

      console.log(this.data[0].first)

      for(let i=0; i<this.data.length; i++ ){
          if( this.data[i].first !==  -1)
            creator.addEdge(this.data[i].first, this.data[i].second );
          else
            creator.checkIfVertexExistIfNotCreate(this.data[i].first)
      }

      this.creator = creator;

      return creator.getGraph;
    },

    doSchedule(){
      console.log(this.data)
      let graph = this.buildGraph();
      const lexBfs = new LexBfs(graph);
      let order = lexBfs.doLexBfs();
      let color = new IntervalGraphColoring(graph);
      let coloring = color.coloring(order);

      this.coloring = coloring;
      this.generated = true;
      this.clicked = false;
    },

    generateGraph(){
      return this.creator;
    },

    startGenerator(){
      if( this.generated )
        this.clicked = true;
      else
        alert("Musisz najpierw wygenerować poprawny graf")
    },

  }
}
</script>

<style scoped>

</style>