
<template>
    <cytoscape class="mt-5
                          mb-5 h-75 ml-auto
                          mr-auto cyto visual-color"
               ref="cyRef"
               :config="config"
               :afterCreated="afterCreated"
    >
      <cy-element
          v-for="def in elements"
          :key="`${def.data.id}`"
          :definition="def"
          v-on:mousedown="deleteNode($event, def.data.id)"
      />
    </cytoscape>
</template>

<script>

import {LexBfs} from '../algorithms/IntervalColoring/LexBfs.js'
import {IntervalGraphColoring} from '../algorithms/IntervalColoring/IntervalGraphColoring.js'


export default {
  name: "IntervalGraphColoringVisual.vue",
  props: ['creator'],
  data() {
    return {
      colors: [
        'red',
        'green',
        'blue',
        'yellow',
        'green',
        'orange'
      ],
      config: {
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#333333",
              label: "data(id)"
            }
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#0d0d0d",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle"
            }
          }
        ],
        layout: { name: "grid", rows: 1 }
      },
      elements: [
      ],
      graph: null,
      intervalColoring: null
    };
  },
  created() {
    this.coloring();
    this.positioning();
    let h = 0;
    for(let i=0; i<this.graph.length; i++) {
      if (this.graph[i] !== undefined) {
        for (let j = 0; j < this.graph[i].neighbours.length; j++) {
          this.elements.push(
              {
                data: {id: 'edge-'+h, source: this.graph[i].v, target: this.graph[i].neighbours[j]},
                group: "edges"
              }
          );
          h++;
        }
      }
    }
  },
  methods: {
    positioning(){
      for(let i=0; i<this.graph.length; i++){
        if( this.graph[i] !== undefined ){
          this.elements.push(
              {
                data: { id: this.graph[i].v },
                position: { x: this.getRandomInt(0,1350), y: this.getRandomInt(0,550) },
                group: "nodes"
              },
          );
        }
      }
    },
    afterCreated(cy) {
      let inc = 1;
      cy.userZoomingEnabled( false );
      for(let i=0; i<this.intervalColoring.length; i++){
        if( this.intervalColoring[i] !== -1 ){
          setTimeout( () => {
            cy.style()
                .selector('#'+String(i) )
                .style('background-color', this.colors[ this.intervalColoring[i] ] )
                .update()
          }, 1000*inc, cy);
          inc++;
        }
      }
    },
    coloring(){
      this.graph = this.creator.getGraph;
      const lexBfs = new LexBfs(this.graph);
      let order = lexBfs.doLexBfs();
      let color = new IntervalGraphColoring(this.graph);
      let intervalColoring = color.coloring(order);
      this.intervalColoring = intervalColoring;
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
  }
}
</script>

<style scoped>
    .jumbotron{
      background: #ad5389; /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #ad5389, #3c1053); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #ad5389, #3c1053); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .visual-color{
        background-color: #f2f2f2;
    }
    .cyto{
      width: 95%;
    }
</style>