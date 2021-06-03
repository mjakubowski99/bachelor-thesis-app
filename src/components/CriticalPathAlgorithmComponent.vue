<template>
    <div>
      <div class="text-center mt-3">

        <button @click="criticalPath" class="btn btn-danger mb-3">
          Wyznacz ścieżkę
        </button>
        <div v-if="path.length !== 0" >
          <div class="h1 ml-auto mr-auto text-center rounded bg-dark text-light w-50 mt-3">
            Najdłuższa ścieżka
          </div>

          <div class="mt-3 mb-3 w-50 ml-auto mr-auto">
            <div v-for="vertex in reverse()" :key="vertex" class="list-group-item">
              <div v-if="data[vertex] !== undefined">
                {{ data[vertex].task }} -> Długość trwania: {{ data[vertex].length }}
              </div>
            </div>
            <div class="list-group-item">
              Długość sumaryczna ścieżki: {{  length }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="prepared" class="mt-2">
        <div class="text-center mt-4">
          <button @click="rendered = !rendered" class="btn btn-primary">
            {{ rendered ? 'Zamknij wizualizacje'  : 'Wizualizacja' }}
          </button>
        </div>

        <div class="mt-3 ml-auto mr-auto" style="border: 1px solid #e6e6e6; width: 90%">
          <dag-visualization v-if="rendered" :creator="graph" :data="data" :path="path"> </dag-visualization>
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
      length: null,
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

        for(let x of order){
          graph.addEdge(x, this.data.length, parseInt( this.data[ x ].length ) );
        }

        this.graph = graph;

        let predecessor = criticalPath.criticalPath(graph, order);

        let s = criticalPath.max;
        this.length = criticalPath.distance;



        while(s !== undefined){
            this.path.push(s);
            s = predecessor[s];
        }

        this.prepared = true;
      }
    },
    reverse(){
      let toRev = this.path
      return toRev.slice().reverse();
    }
  },
}
</script>

<style scoped>

</style>