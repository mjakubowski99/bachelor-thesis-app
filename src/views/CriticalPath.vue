<template>
  <div class="text-light">
    {{ data }}
  </div>
</template>

<script>

import {Graph} from '../algorithms/CriticalPath/Graph.js';
import {CriticalPath} from '../algorithms/CriticalPath/CriticalPath.js';

export default {
  name: "CriticalPath",
  data(){
    return{
      data: 1
    }
  },
  mounted() {
    let graph = new Graph(9);
    graph.addEdge(1,2, 2);
    graph.addEdge(2,3, 4);
    graph.addEdge(1,4, 5);

    let criticalPath = new CriticalPath();

    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph)
    let order = criticalPath.topologicalSort(graph.getGraph, queue)

    this.data = criticalPath.criticalPath(graph, order)
    console.log(this.data);
  }
}
</script>

<style scoped>

</style>