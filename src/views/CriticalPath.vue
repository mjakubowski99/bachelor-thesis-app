<template>
  <div>
      <div class="bg-violet pb-5">
          <navbar-component> </navbar-component>
          <div class="text-light bg-white mt-5 w-75 ml-auto mr-auto rounded">
              <br>
              <div class="mt-2 ml-5 h2 text-violet"> PLAN PROJECT </div>

              <div class="d-flex text-dark">
                <div class="data-container ml-3 mb-3 mr-3 w-50 mt-4">
                    <div class="pl-3 pb-3 pt-4"> Wprowadź zadanie oraz długość jego trwania </div>

                    <label for="task-name" class="mt-2 ml-3 text-secondary"> Podaj treść zadania </label>
                    <input type="text" class="form-control w-50 ml-3" id="task-name" placeholder="Nazwa zadania">
                    <label for="task-length" class="mt-2 ml-3 text-secondary"> Podaj długość trwania zadania </label>
                    <input type="text" class="form-control w-50 ml-3" id="task-length" placeholder="Długość trwania">

                    <button v-on:click="addTask" class="btn text-light ml-3 mt-3 mb-3" style="background-color: #8000ff;"> Dodaj zadanie </button>
                </div>

                <div class="data-container mr-3 mb-3 mt-4 w-50">
                    <ul class="list-group">
                      <div class="pl-3 pb-3 pt-4"> Lista zadań </div>
                      <div v-for="(item, index) in items" :key="index" class="d-flex flex-row mt-1 mb-1">
                          <button v-on:click="match(index)" type="button" :id="'task-'+index" class="btn-item list-group-item ml-3 w-50">
                            {{ item.task }}
                          </button>
                          <button v-on:click="deleteTask(index)" class="btn btn-danger" :id="'delete-'+index">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive">
                              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                          </button>
                      </div>
                    </ul>
                </div>
              </div>
          </div>
      </div>

    <div class="h1 ml-auto mr-auto text-center rounded bg-dark text-light w-50 mt-3"> Zaleznosci między zadaniami </div>
    <div class="data-container w-50 ml-auto mr-auto text-dark">
      <div v-for="(item, index) in matchings" :key="index" class="list-group-item text-center">
        <button type="button" class="btn btn-outline-primary mr-3"> {{ items[item[0]].task}}</button>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>
        <button type="button" class="btn btn-outline-primary ml-3">{{ items[item[1]].task}}</button>
      </div>
    </div>
  </div>
</template>

<script>

//import {Graph} from '../algorithms/CriticalPath/Graph.js';
//import {CriticalPath} from '../algorithms/CriticalPath/CriticalPath.js';

import NavbarComponent from "../components/NavbarComponent";
export default {
  name: "CriticalPath",
  components: {NavbarComponent},
  data(){
    return{
      items: [],
      firstIndex: null,
      matchings: [],
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
      },
      deleteTask(index){
          this.items.splice(index, 1);
      },
      match(index){

        if( this.firstIndex === null ){
          this.firstIndex = index;
          let firstElement = document.getElementById('task-' + index );
          firstElement.style.backgroundColor = '#8000ff';
          firstElement.style.color = 'white';
        }
        else{
            this.matchings.push( [this.firstIndex, index] );
            let firstElement = document.getElementById('task-' + this.firstIndex );
            firstElement.style.backgroundColor = 'white';
            firstElement.style.color = '#8000ff';
            this.firstIndex = null;
        }

      }
  }
}
</script>

<style scoped>
  .data-container{
      border: 1px solid #bfbfbf;
      background-color: #f2f2f2;
  }

  .btn-item{
     color: #8000ff;
  }

  .btn-item:hover{
      border: 1px solid #8000ff;
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