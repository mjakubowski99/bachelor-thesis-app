<template>
  <div class="text-light">
    <navbar-component> </navbar-component>
    <jumbotron-component
      header="Train Scheduler"
      lead="W tym panelu możesz rozplanować minimalne uzycie pociągów"
      footer="Klikając przycisk dodaj godzinę odjazdu generuje się wiersz w tabeli
        do którego można podać datę początku i końca realizowanego połączenia. Po podaniu
        wszystkich interesujących nas godzin połączeń klikamy przycisk wygeneruj rozkład, który
        zwraca nam rozkład wykorzystujący minimalną liczbę pociągów.
      "
    />

    <div v-if="generated" class="text-center mb-2">
      <button @click="startGenerator" class="btn btn-dark"> Wizualizacja zadanego grafu </button>
    </div>

    <div v-if="generated">
      <div v-if="clicked">
        <interval-graph-coloring-visual :creator="generateGraph()"> </interval-graph-coloring-visual>
      </div>
    </div>

    <schedule-table-component v-on:get-schedule="doSchedule"/>

    <div class="d-flex justify-content-center text-light mb-5" v-if="dates.length !== 0">
      <div class="card text-dark ml-2 mr-2" v-for="(item, index) in dates" v-bind:key="index" style="width: 18rem;">
        <div class="card-header">
          Pociag nr {{ index+1 }}
        </div>
        <card-component v-bind:dates="item" ></card-component>
      </div>
    </div>

  </div>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent";
import JumbotronComponent from "../components/JumbotronComponent";
import ScheduleTableComponent from "../components/ScheduleTableComponent";
import CardComponent from "../components/CardComponent";

import {GraphCreator} from '../algorithms/IntervalColoring/GraphCreator.js'
import {LexBfs} from '../algorithms/IntervalColoring/LexBfs.js'
import {IntervalGraphColoring} from '../algorithms/IntervalColoring/IntervalGraphColoring.js'
import IntervalGraphColoringVisual from "../components/IntervalGraphColoringVisual";

export default {
  name: "TrainScheduling",
  components: {CardComponent, JumbotronComponent, NavbarComponent, ScheduleTableComponent, IntervalGraphColoringVisual},

  data() {
    return {
      schedule: [],
      info: '',
      coloring: [],
      dates: [],
      creator: null,
      generated: false,
      clicked: false,
    }
  },
  methods: {

    buildGraph(){
      let size = this.schedule.length;
      const creator = new GraphCreator(size+1);

      if( size == 1 ){
          creator.checkIfVertexExistIfNotCreate(0);
          this.creator = creator;
          return creator.getGraph;
      }

      for(let i=0; i<size; i++ ){
          for(let j=i+1; j<size; j++){
              creator.checkIfVertexExistIfNotCreate(i);
              creator.checkIfVertexExistIfNotCreate(j);
              let s1 = this.toSeconds( this.schedule[i].start );
              let s2 = this.toSeconds( this.schedule[j].start );

              let e1 = this.toSeconds( this.schedule[i].end );
              let e2 = this.toSeconds( this.schedule[j].end );

              if( (s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1 ) )
                creator.addEdge(i, j);
          }
      }

      this.creator = creator;

      return creator.getGraph;
    },

    doSchedule(data){
      this.schedule = data;

      if( this.validate() ){
        let graph = this.buildGraph();
        const lexBfs = new LexBfs(graph);
        let order = lexBfs.doLexBfs();
        let color = new IntervalGraphColoring(graph);
        let coloring = color.coloring(order);

        this.dates = new Array(color.maxColor+1);
        this.coloring = coloring;
        this.prepareResult();
        this.generated = true;
        this.clicked = false;
      }
      else{
        this.generated = false;
      }
    },

    prepareResult(){
        for(let i=0; i<this.coloring.length; i++){
            if( this.coloring[i] !== -1 ) {
              if( this.dates[this.coloring[i] ] === undefined )
                  this.dates[this.coloring[i]] = [];

              this.dates[this.coloring[i]].push({
                number: this.schedule[i].number,
                start: this.schedule[i].start,
                end: this.schedule[i].end,
              });
            }
        }
        console.log( this.dates )
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

    toSeconds(time){
       let arr = time.split(':');
       return parseInt(arr[0], 10)*60 + parseInt(arr[1], 10);
    },

    validTime(time){
       return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
    },

    validate(){
      for(let i=0; i<this.schedule.length; i++){
        if( this.schedule[i].start === '' || this.schedule[i].end === '') {
          alert( 'Wypelnij puste pola w linii numer: ' + (i+1) );
          return false;
        }

        if( !this.validTime( this.schedule[i].start ) ){
            this.schedule[i].start='';
            alert('Wprowadz czas we właściwym formacie w linii numer: ' + (i+1) )
            return false;
        }
        if( !this.validTime( this.schedule[i].end ) ){
          this.schedule[i].end='';
          alert('Wprowadz czas we właściwym formacie w linii numer: ' + (i+1) )
          return false;
        }
        if( this.toSeconds(this.schedule[i].start)  >= this.toSeconds(this.schedule[i].end) ) {
          alert( 'Godzina startu wieksza rowna od godziny konca w linii: '+(i+1) );
          return false;
        }
      }
      return true;
    },
  }
}
</script>

<style scoped>

</style>