<template>
    <div>
      <div v-if="prepared">
        <button @click="rendered = !rendered" class="btn btn-primary"> Wizualizacja </button>
        <dag-visualization v-if="rendered" :creator="graph" :path="path"> </dag-visualization>
      </div>
      <div class="text-center mt-3">

        <button @click="criticalPath" class="btn btn-danger">
          Wyznacz ścieżkę
        </button>
        <div v-if="path.length !== 0">
          <div class="list-group-item mt-3 mb-3 w-50 ml-auto mr-auto">
            <div v-for="vertex in path.slice().reverse()" :key="vertex">
              {{ vertex }}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Graph} from '../algorithms/CriticalPath/Graph.js';
import {CriticalPath} from '../algorithms/CriticalPath/CriticalPath.js';
import DagVisualization from '../components/DagVisualization';

export default {
  name: "CriticalPathAlgorithmComponent",
  components: {DagVisualization},
  props: ['data', 'matching'],
  data() {
    return{
      graph: null,
      path: [],
      prepared: false,
      rendered: false,
    }
  },
  methods: {
    criticalPath(){
      this.prepared = false;
      this.path = [];

      let graph = new Graph(this.data.length+1)
      for(let x of this.matching) {
        graph.addEdge(x[0], x[1], parseInt(this.data[x[0]].length));
      }

      let criticalPath = new CriticalPath();

      let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
      let order = criticalPath.topologicalSort(graph.getGraph, queue);

      if( order === "Graf zawiera cykl"){
        alert("Podałeś zły graf, jedno z zadań nie może być przed drugim");
      }
      else{
        graph = new Graph(this.data.length+1)
        for(let x of this.matching)
          graph.addEdge(x[0], x[1], parseInt( this.data[ x[0] ].length ) );

        this.graph = graph;

        let predecessor = criticalPath.criticalPath(graph, order);

        let s = criticalPath.max;

        while(s !== undefined){
            this.path.push(s);
            s = predecessor[s];
        }

        this.prepared = true;
      }
    },
  },
}
</script>

<style scoped>

</style>