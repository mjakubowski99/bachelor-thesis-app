<template>
  <div class="bg-dark">
    <navbar-component> </navbar-component>
    <jumbotron-component
        class="bg-primary text-light"
        header="Maksymalne dopasowanie pracowników"

        lead="Tutaj możesz dodawać pracowników oraz zmiany, na których mogą pracować"

        footer="Dzięki temu panelowi można znaleźć maksymalne dopasowanie pracowników do zmian, na
        których mogą pracować. Poprzez zaznaczenie checkboxa w tabeli pracowników i zmian rozumie się,
        że ten pracownik zgłasza możliwość pracy na takiej zmianie. Po kliknięciu przycisku 'Znajdź dopasowanie'
        pojawi się dopasowanie, które dopasuje największą możliwą liczbę osób do zmian, na których mogą pracować"

    > </jumbotron-component>

    <div class="mt-3 w-50 ml-auto mr-auto text-center form-border bg-light">
      <h2 class="text-center text-light bg-dark border-bottom border-secondary"> Panel dodawania </h2>

      <label> Pracownik: </label>
      <input type="text" id="column-picker" class="form-control w-25 mb-2 ml-auto mr-auto" placeholder="Nazwa kolumny"/>
      <button class="btn btn-primary mr-2 d-inline w-25 mb-2" @click="addColumn"> Dodaj pracownika </button>

      <br>
      <br>

      <label> Podaj godzine poczatkowa: </label>
      <b-form-timepicker v-model="rowPickerStart" class="w-25 mb-2 ml-auto mr-auto" locale="pl"> </b-form-timepicker>
      <label> Podaj godzine koncowa: </label>
      <b-form-timepicker v-model="rowPickerEnd" class="w-25 mb-2 ml-auto mr-auto" locale="pl"> </b-form-timepicker>
      <button class="btn btn-primary mr-2 d-inline w-25 mb-2" @click="addRow"> Dodaj godzine </button>

      <div class="text-center mb-2">
        <button @click="doMatching" class="text-center btn btn-primary mt-2 mr-1"> Znajdź dopasowanie </button>
        <div v-if="prepared">
          <button @click="ableToGenerate = !ableToGenerate" class="btn btn-primary mt-2 ml-1"> Wizualizuj </button>
        </div>
      </div>
    </div>


    <div v-if="prepared">
      <div v-if="ableToGenerate">
        <bipartite-matching-visual
            :creator="bipartite"
            :matching="matching"
        >
        </bipartite-matching-visual>
      </div>
    </div>



    <h1 class="ml-auto mr-auto text-center text-light w-50 mt-5 bg-dark border rounded"> Grafik </h1>
      <div class="text-center text-light" v-if="columns.length === 0 && rows.length === 0"> Tu pojawi się tabela pracowników </div>
      <table class="table table-bordered text-center w-75 ml-auto mr-auto">
          <thead v-if="columns.length !== 0" class="bg-dark text-light">
            <tr>
              <th scope="col"></th>
              <th v-for="column in columns" :key="column" scope="col">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <th scope="row" class="bg-dark text-light">{{row}}</th>
              <td v-for="(column, columnIndex) in columns" :key="columnIndex" :id="'field-'+rowIndex+'-'+columnIndex">
                  <input type="checkbox"/>
              </td>
            </tr>
          </tbody>
      </table>

      <div v-if="prepared" class="card ml-auto mr-auto mt-3" style="width: 18rem;">
        <div class="card-header">
          Dopasowania
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(item,index) in result" :key="index">
            {{ item[0] }} -> {{ item[1] }}
          </li>
        </ul>
      </div>
  </div>
</template>

<script>

import NavbarComponent from '../components/NavbarComponent.vue'

import {Graph} from '../algorithms/HopcroftKarp/Graph.js'
import {HopcroftKarp} from '../algorithms/HopcroftKarp/Hopcroft.js'
import BipartiteMatchingVisual from "../components/BipartiteMatchingVisual";
import JumbotronComponent from "../components/JumbotronComponent";

export default {
  name: "JobAssignmentComponent",
  components: {BipartiteMatchingVisual, NavbarComponent, JumbotronComponent},
  data(){
    return{
      rowPickerStart: null,
      rowPickerEnd: null,
      columns: [],
      rows: [],
      result: [],
      matching: [],
      prepared: false,
      ableToGenerate: false,
      bipartite: null,
    }
  },
  methods: {
    toSeconds(time){
      let arr = time.split(':');
      return parseInt(arr[0], 10)*60 + parseInt(arr[1], 10);
    },

    intervalsInConflict(){
      for(let i=0; i<this.rows.length; i++){
        let hours = this.rows[i].split(' - ');
        let s1 = this.toSeconds( hours[0] );
        let s2 = this.toSeconds( this.rowPickerStart );

        let e1 = this.toSeconds( hours[1] );
        let e2 = this.toSeconds( this.rowPickerEnd );

        if( (s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1 ) ) {
          alert("Wprowadzone dane są w konflikcie z przedziałem: " + this.rows[i] );
          return true;
        }
      }
      return false;
    },

    validate(){
        if( this.rowPickerStart === '' || this.rowPickerEnd === '') {
            alert('Wypelnij puste pola czasu');
            return false;
        }
        if( this.toSeconds(this.rowPickerStart)  >= this.toSeconds(this.rowPickerEnd) ) {
            alert('Godzina startu wieksza rowna od godziny konca');
            return false;
        }
        if( this.intervalsInConflict() ){
            return false;
        }
        return true;
    },

    addColumn(){
      let text = document.getElementById('column-picker').value;

      if( text == '' )
        alert("Wypełnij pole dodawania wiersza");
      else if( this.columns.includes(text) )
        alert("Kolumny zawierają już taką wartość");
      else
        this.columns.push(text)
    },
    addRow(){
        let start = this.rowPickerStart;
        let end = this.rowPickerEnd;

        if( start == '')
            alert('Wypełnij pole godziny początkowej');
        else if( end == '' )
          alert('Wypełnij pole godziny koncowej');
        else if( this.validate() )
          this.rows.push( start + ' - ' + end );
    },

    doMatching(){
        this.result = [];
        let rows = this.rows.length;
        let columns = this.columns.length;

        let bipartite = new Graph(columns, rows);
        this.bipartite = bipartite;

        for(let i=0; i<rows; i++){
            for(let j=0; j<columns; j++){
                let pattern = 'field-' + i + '-' + j;
                let data = document.getElementById(pattern);
                if( data.querySelector('input').checked ){
                    bipartite.addEdge(j, i);
                }
            }
        }

        let A = bipartite.getA();
        let B = bipartite.getB();

        let hopcroftKarp = new HopcroftKarp(A,B);
        let matching = hopcroftKarp.hopcroftKarpAlgorithm();

        this.matching = matching;

        this.prepareResult(matching);
    },

    prepareResult(matching) {
      let dummy = 0;
      for(let i=0; i<matching.length; i++){
        if( matching[i] !== undefined && matching[i] !== dummy )
          this.result.push( [ this.columns[ i-1 ], this.rows[ matching[i]-1 ] ] );
      }

      this.prepared = true;
    }


  }
}
</script>

<style scoped>
  .form-border{
    border: 1px solid #d9d9d9;
  }
</style>