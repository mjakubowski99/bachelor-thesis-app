<template>
    <div class="text-center mt-3">
      <button @click="criticalPath" class="btn btn-danger">
          Wyznacz ścieżkę
      </button>
      <div v-if="length !== null ">
        <div class="list-group-item mt-3 mb-3 w-50 ml-auto mr-auto"> Długość: {{length}} </div>
      </div>
    </div>
</template>

<script>
import {Graph} from '../algorithms/CriticalPath/Graph.js';
import {CriticalPath} from '../algorithms/CriticalPath/CriticalPath.js';

export default {
  name: "CriticalPathAlgorithmComponent",
  props: ['data', 'matching'],
  data() {
    return{
      length: null,
    }
  },
  methods: {
    criticalPath(){
      let graph = new Graph(this.data.length+1)
      for(let x of this.matching){
        graph.addEdge(x[0], x[1], parseInt(this.data[x[0]].length));
      }

      let criticalPath = new CriticalPath();

      let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
      let order = criticalPath.topologicalSort(graph.getGraph, queue);

      if( order === "Graf zawiera cykl"){
        alert("Podałeś zły graf, jedno z zadań nie może być przed drugim");
      }
      else{
        for(let x of this.matching)
          graph.addEdge(x[0], x[1], parseInt( this.data[ x[0] ].length ) );

        this.length = criticalPath.criticalPath(graph, order) + parseInt( this.data[ order[order.length-1] ].length );
      }
    },
  },
}
</script>

<style scoped>

</style>