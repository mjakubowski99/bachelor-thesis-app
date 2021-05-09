<template>
  <div id="app" class="bg-secondary">
    <navbar-component> </navbar-component>

      <div class="card ml-auto mr-auto border-0 mt-5" style="width: 95%;">
        <div class="card-header text-center text-light border border-light h3" style="background-color: black;">
          Wizualizacja
        </div>
        <ul class="list-group list-group-flush bg-dark">
            <button @click="clicked = !clicked" class="btn w-25 mb-3 mt-3 ml-auto mr-auto btn-primary"> Button </button>
            <div v-if="clicked">
                <interval-graph-coloring-visual :creator="generateGraph()"> </interval-graph-coloring-visual>
            </div>
        </ul>
      </div>
  </div>
</template>

<script>

import IntervalGraphColoringVisual from '../components/IntervalGraphColoringVisual.vue';
import NavbarComponent from "../components/NavbarComponent";
import {GraphCreator} from "../algorithms/IntervalColoring/GraphCreator";

export default {
name: "IntervalColoring",
  components: {IntervalGraphColoringVisual, NavbarComponent},
  data() {
    return{
      clicked: false,
      graph: this.generateGraph(),
    }
  },
  methods: {
      generateGraph(){
        const creator = new GraphCreator(21);
        creator.addEdge(1,2);
        creator.addEdge(1,3);
        creator.addEdge(3,4);
        creator.addEdge(2,3);
        creator.addEdge(1,3);
        creator.addEdge(1,5);

        return creator;
      }
  }
}
</script>

<style scoped>

.jumbotron{
  background: #ad5389; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ad5389, #3c1053); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ad5389, #3c1053); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>