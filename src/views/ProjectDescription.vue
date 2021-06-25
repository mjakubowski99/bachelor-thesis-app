<template>

    <div>
      <navbar-component></navbar-component>
      <div class="pt-5 pb-5 bg-primary text-light">
        <h2 class="text-center display-4"> Scheduling App </h2>
        <hr class="my-4">
        <p class="lead text-center ml-5 mr-5">
            W ramach pracy licencjackiej stworzyłem aplikację, która wykorzystuje
            zagadnienia związane z teorią grafów <br> do rozwiązywania rzeczywistych problemów z ustalaniem
            harmonogramów.
        </p>
      </div>
      <description-component
          title="Moduł ustalania harmonogramów pociągów"
          image-path="images/train.jpg"
          button-link="/#/trainScheduling"
      >
        Do realizacji tego modułu wykorzystałem algorytm kolorowania grafu interwałowego, który pozwala
        obliczyć minimalną liczbę pociągów, która jest potrzebna do zrealizowania potrzebnych
        tras.
      </description-component>

      <description-component
          title="Moduł wyznaczania ścieżki krytycznej w projekcie"
          image-path="images/project.jpg"
          button-link="/#/criticalPath"
      >
        Moduł ten wykorzystuje algorytm wyznaczania najdłuższej ścieżki w acyklicznym grafie
        skierowanym.
      </description-component>

      <description-component
          title="Moduł przypisywania pracowników do zmian"
          image-path="images/jobSchedule.jpg"
          button-link="#/jobAssignment"
      >
        Moduł ten wykorzystuje algorytm wyznaczania maksymalnego skojarzenia w grafie dwudzielnym.
      </description-component>

    </div>


</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import DescriptionComponent from "../components/DescriptionComponent";

//import {GraphCreator} from '../algorithms/IntervalColoring/GraphCreator.js''
//import {IntervalGraphColoring} from '../algorithms/IntervalColoring/IntervalGraphColoring.js'

export default {
    name: 'ProjectDescription',
    components: {
      DescriptionComponent,
      NavbarComponent,
    },
    methods: {
        run: function(){

        },
    }
}

</script>
  
<style scoped>
  .body{
      background-color: #b3b3b3;
  }

</style>