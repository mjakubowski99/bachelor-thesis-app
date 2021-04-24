<template>
  <div class="text-light">
    <navbar-component> </navbar-component>
    <jumbotron-component
      header="Train Scheduler"
      lead="W tym panelu możesz rozplanować minimalne uzycie pociągów"
      footer="Tu będzie jakiś lepszy opis"
    />
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

export default {
  name: "TrainScheduling",
  components: {CardComponent, JumbotronComponent, NavbarComponent, ScheduleTableComponent},

  data() {
    return {
      schedule: [],
      info: '',
      coloring: [],
      dates: [],
    }
  },
  methods: {

    buildGraph(){
      let size = this.schedule.length;
      const creator = new GraphCreator(size+1);

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

    toSeconds(time){
       let arr = time.split(':');
       return parseInt(arr[0], 10)*60 + parseInt(arr[1], 10);
    },

    validate(){
      for(let i=0; i<this.schedule.length; i++){
        if( this.schedule[i].start === '' || this.schedule[i].end === '') {
          alert( 'Wypelnij puste pola w linii numer: ' + (i+1) );
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