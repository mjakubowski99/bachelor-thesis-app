<template>
  <div>
      <div class="bg-violet pb-5">
          <navbar-component> </navbar-component>
          <jumbotron-component
              class="bg-primary text-light"
              header="Wyznaczanie ścieżki krytycznej"

              lead="W tym panelu można dodać zadania oraz zależności, w których definiuje się, które zadanie ma być przed
              którym"

              footer="Podaj zadanie oraz długość jego trwania w godzinach. Po kliknięciu przycisku dodawania
              zadanie pojawi się po prawej stronie od formularza dodawania zadań. Jeśli na liście znajdują się
              co najmniej dwa zadania to można kliknąć najpierw jedno, a potem drugie. Tworzy się wtedy zależność, w
              której pierwsze kliknięte zadanie musi być przed drugim. Po stworzeniu zależności możesz kliknąć przycisk
              wyznaczania ścieżki. Po wygenerowaniu odpowiedzi pojawia się przycisk wizualizacji, dzięki któremu możesz
              wyświetlić graf wygenerowany dla podanych danych"

          > </jumbotron-component>
          <div class="text-light bg-white mt-5 w-75 ml-auto mr-auto border rounded">
              <div class="bg-dark border-bottom border-muted h2 text-center"> Zaplanuj projekt </div>

              <div class="d-flex text-dark">
                <div class="data-container ml-3 mb-3 mr-3 w-50 mt-4">
                    <div class="pl-3 pb-3 pt-4"> Wprowadź zadanie oraz długość jego trwania </div>

                    <label for="task-name" class="mt-2 ml-3 text-secondary"> Podaj treść zadania </label>
                    <input type="text" class="form-control w-50 ml-3" id="task-name" placeholder="Nazwa zadania">
                    <label for="task-length" class="mt-2 ml-3 text-secondary"> Podaj długość trwania zadania( w godzinach )</label>
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
                              <delete-icon> </delete-icon>
                          </button>
                      </div>
                    </ul>
                </div>
              </div>
          </div>
      </div>

    <div class="h1 ml-auto mr-auto text-center rounded bg-dark text-light w-50 mt-3 mb-3">
      Zaleznosci między zadaniami
    </div>

    <div class="data-container w-50 ml-auto mr-auto text-dark">
      <div v-for="(item, index) in matchings" :key="index" v-on:click="deleteMatching(index)"
           class="list-group-item text-center">
            <div class="btn btn-outline-primary mr-3"> {{ items[item[0]].task}}</div>
            <arrow-icon> </arrow-icon>
            <div class="btn btn-outline-primary ml-3">{{ items[item[1]].task}}</div>
      </div>
    </div>

    <critical-path-algorithm-component :data="items" :matching="matchings"> </critical-path-algorithm-component>
  </div>
</template>

<script>

//import {Graph} from '../algorithms/CriticalPath/Graph.js';
//import {CriticalPath} from '../algorithms/CriticalPath/CriticalPath.js';

import NavbarComponent from "../components/NavbarComponent";
import DeleteIcon from "../components/Icons/DeleteIcon";
import ArrowIcon from "../components/Icons/ArrowIcon";
import CriticalPathAlgorithmComponent from "../components/CriticalPathAlgorithmComponent";
import JumbotronComponent from "../components/JumbotronComponent"

export default {
  name: "CriticalPath",
  components: {JumbotronComponent, CriticalPathAlgorithmComponent, ArrowIcon, DeleteIcon, NavbarComponent},
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
      itemAlreadyExists(item){
          for(let x of this.items){
              if( x.task === item )
                return true;
          }
          return false;
      },
      addTask(){

          let task = document.getElementById('task-name' );
          let length = document.getElementById('task-length' );

          if( task.value === '' || length.value === ''){
              alert('Wypełnij pole z zadaniem lub z długością zadania');
              return;
          }

          if( isNaN( length.value ) ){
              alert('Pole długości może zawierać tylko cyfry');
              return;
          }

          if( !this.itemAlreadyExists(task.value) ) {
            this.items.push({
              task: task.value,
              length: length.value
            });
          }
          else{
            alert("Zadanie z dokładnie taką samą nazwą zostało już podane");
          }
      },
      itemAlreadyMatched(index){
          for(let x of this.matchings ){
              if( x[0] == index || x[1] == index )
                return true;
          }
          return false;
      },
      deleteTask(index){
          if( !this.itemAlreadyMatched(index) )
            this.items.splice(index, 1);
          else
            alert("Usun najpierw dopasowanie elementów, a potem element")
      },
      itemMatchToSecondItem(first, second){
        for(let x of this.matchings ){
          if( x[0] === first && x[1] === second )
            return true;
        }
        return false;
      },
      match(index){
        if( this.firstIndex === null ){
          this.firstIndex = index;
          let firstElement = document.getElementById('task-' + index );
          firstElement.style.backgroundColor = '#8000ff';
          firstElement.style.color = 'white';
        }
        else{
          let firstElement = document.getElementById('task-' + this.firstIndex );
          firstElement.style.backgroundColor = 'white';
          firstElement.style.color = '#8000ff';

          if( this.itemMatchToSecondItem(this.firstIndex, index) ){
              alert("Takie dopasowanie już istnieje");
          }
          else if( this.firstIndex === index ){
            alert("Nie możesz dopasować tych samych elementów");
          }
          else{
            this.matchings.push( [this.firstIndex, index] );
          }

          this.firstIndex = null;
        }

      },
      deleteMatching(index){
        this.matchings.splice(index, 1);
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

  .list-group-item:hover{
    background-color: #e6e6e6;
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