<template>
  <div class="text-light">
    <navbar-component> </navbar-component>
    <jumbotron-component
      header="Train Scheduler"
      lead="W tym panelu możesz rozplanować minimalne uzycie pociągów"
      footer="Tu będzie jakiś lepszy opis"
    />
    <schedule-table-component v-on:get-schedule="doSchedule"/>

    <table class="table text-light">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent";
import JumbotronComponent from "../components/JumbotronComponent";
import ScheduleTableComponent from "../components/ScheduleTableComponent";

import {GraphCreator} from '../algorithms/IntervalColoring/GraphCreator.js'
import {LexBfs} from '../algorithms/IntervalColoring/LexBfs.js'
import {IntervalGraphColoring} from '../algorithms/IntervalColoring/IntervalGraphColoring.js'

export default {
  name: "TrainScheduling",
  components: {JumbotronComponent, NavbarComponent, ScheduleTableComponent},

  data() {
    return {
      schedule: [],
      info: '',
    }
  },
  methods: {

    buildGraph(){
      let size = this.schedule.length;
      const creator = new GraphCreator(size);

      for(let i=0; i<size; i++ ){
          for(let j=i+1; j<size; j++){
              let s1 = this.toSeconds( this.schedule[i].start );
              let s2 = this.toSeconds( this.schedule[j].start );

              let e1 = this.toSeconds( this.schedule[i].end );
              let e2 = this.toSeconds( this.schedule[j].end );

              if( (s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1 ) )
                creator.addEdge(i+1, j+1);
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

        alert( coloring );
      }
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