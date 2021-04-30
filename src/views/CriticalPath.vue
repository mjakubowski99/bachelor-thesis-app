<template>
  <div class="text-light bg-white mt-5 w-75 ml-auto mr-auto rounded">
      <div class="h2 text-violet"> PLAN PROJECT </div>

      <div class="d-flex text-dark">
        <div class="data-container ml-3 mb-3 mr-3 w-50">
            <div> Wprowadź zadanie oraz długość jego trwania </div>

            <label for="task-name" class="mt-2 ml-3 text-secondary"> Podaj treść zadania </label>
            <input type="text" class="form-control w-50 ml-3" id="task-name" placeholder="Nazwa zadania">
            <label for="task-length" class="mt-2 ml-3 text-secondary"> Podaj długość trwania zadania </label>
            <input type="text" class="form-control w-50 ml-3" id="task-length" placeholder="Długość trwania">

            <button v-on:click="addTask" class="btn text-light ml-3 mt-2" style="background-color: #8000ff;"> Dodaj zadanie </button>
        </div>

        <div class="data-container mr-3 mb-3 ml-3 w-50">
            <ul class="list-group">
              Lista zadań
              <div v-for="(item, index) in items" :key="index" class="d-flex flex-row mt-1 mb-1">
                  <button type="button" :id="'task-'+index" class="btn-item list-group-item ml-3 w-50">
                    Secondary
                  </button>
                  <button class="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive">
                      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
              </div>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>

//import {Graph} from '../algorithms/CriticalPath/Graph.js';
//import {CriticalPath} from '../algorithms/CriticalPath/CriticalPath.js';

export default {
  name: "CriticalPath",
  data(){
    return{
      items: []
    }
  },
  mounted() {

  },
  methods: {
      addTask(){

          let task = document.getElementById('task-name' );
          let length = document.getElementById('task-length' );

          this.items.push({
              task: task.value,
              length: length.value
          });
      }
  }
}
</script>

<style scoped>
  .data-container{
      border: 1px solid #bfbfbf;
      background-color: #f2f2f2;
  }

  .btn-item:hover{
      color: blue
  }
</style>

<!--let graph = new Graph(13);-->
<!--graph.addEdge(1,2, 2);-->
<!--graph.addEdge(1,4, 2);-->
<!--graph.addEdge(1,3, 2);-->
<!--graph.addEdge(4,5, 5);-->
<!--graph.addEdge(4,6, 5);-->
<!--graph.addEdge(2,5, 3);-->
<!--graph.addEdge(2,6, 3);-->
<!--graph.addEdge(3,6, 7);-->
<!--graph.addEdge(3,5, 7);-->
<!--graph.addEdge(5,7, 14);-->
<!--graph.addEdge(6,10, 12);-->
<!--graph.addEdge(6,9, 12);-->
<!--graph.addEdge(6,8, 12);-->
<!--graph.addEdge(7,10, 3);-->
<!--graph.addEdge(7,8, 3);-->
<!--graph.addEdge(7,9, 3);-->
<!--graph.addEdge(10,11, 7);-->
<!--graph.addEdge(9,11, 14);-->
<!--graph.addEdge(8,11, 28);-->
<!--graph.addEdge(11,12, 12);-->
<!---->
<!--let criticalPath = new CriticalPath();-->
<!---->
<!--let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph)-->
<!--let order = criticalPath.topologicalSort(graph.getGraph, queue)-->
<!--graph.addEdge(1,2, 2);-->
<!--graph.addEdge(1,4, 2);-->
<!--graph.addEdge(1,3, 2);-->
<!--graph.addEdge(4,5, 5);-->
<!--graph.addEdge(4,6, 5);-->
<!--graph.addEdge(2,5, 3);-->
<!--graph.addEdge(2,6, 3);-->
<!--graph.addEdge(3,6, 7);-->
<!--graph.addEdge(3,5, 7);-->
<!--graph.addEdge(5,7, 14);-->
<!--graph.addEdge(6,10, 12);-->
<!--graph.addEdge(6,9, 12);-->
<!--graph.addEdge(6,8, 12);-->
<!--graph.addEdge(7,10, 3);-->
<!--graph.addEdge(7,8, 3);-->
<!--graph.addEdge(7,9, 3);-->
<!--graph.addEdge(10,11, 7);-->
<!--graph.addEdge(9,11, 14);-->
<!--graph.addEdge(8,11, 28);-->
<!--graph.addEdge(11,12, 12);-->
<!---->
<!--this.data = criticalPath.criticalPath(graph, order)-->
<!--console.log(this.data);-->