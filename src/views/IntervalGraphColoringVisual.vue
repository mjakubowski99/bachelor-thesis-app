<template>
  <div id="app">
    <navbar-component> </navbar-component>

    <div class="jumbotron text-center text-light">
      <h1 class="display-4">Wizualizacja</h1>
      <p class="lead"> Kolorowania grafu interwałowego </p>
      <hr class="my-4">
      <p></p>
    </div>

    <cytoscape class="bg-dark mt-5 ml-auto mr-auto border border-secondary"
        ref="cyRef"
        :config="config"
        v-on:mousedown="addNode"
        v-on:cxttapstart="updateNode"
    >
      <cy-element
          v-for="def in elements"
          :key="`${def.data.id}`"
          :definition="def"
          v-on:mousedown="deleteNode($event, def.data.id)"
      />
    </cytoscape>
  </div>
</template>

<script>

import NavbarComponent from "../components/NavbarComponent";

import {GraphCreator} from '../algorithms/IntervalColoring/GraphCreator.js'
import {LexBfs} from '../algorithms/IntervalColoring/LexBfs.js'
import {IntervalGraphColoring} from '../algorithms/IntervalColoring/IntervalGraphColoring.js'

export default {
  name: "IntervalGraphColoringVisual.vue",
  components: {NavbarComponent},
  data() {
    return {
      config: {
        style: [
          {
            selector: "node",
            style: {
                  "background-color":
                  "#666", label: "data(id)"
            }
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#660066",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle"
            }
          }
        ],
        layout: { name: "grid", rows: 1 }
      },
      elements: [
       /* {
          data: { id: "a" },
          position: { x: 100, y: 100 },
          group: "nodes"
        },
        {
          data: { id: "b" },
          position: { x: 100, y: 300 },
          group: "nodes"
        },
        {
          data: { id: "c" },
          position: { x: 489, y: 282 },
          group: "nodes"
        },
        {
          data: { id: "ab", source: "a", target: "b" },
          group: "edges"
        },
        {
          data: { id: "ac", source: "a", target: "c" },
          group: "edges"
        } */
      ],
      graph: null,
      intervalColoring: null
    };
  },
  mounted() {
    this.coloring();
    for(let i=0; i<this.graph.length; i++){
      if( this.graph[i] !== undefined && this.graph[i].neighbours.length !== 0 ){
        this.elements.push(
            {
              data: { id: this.graph[i].v },
              position: { x: this.getRandomInt(100,1000), y: this.getRandomInt(100,1000) },
              group: "nodes"
            },
        );
        console.log(this.config);
      }
    }

   /* let h = 0;
    for(let i=0; i<this.graph.length; i++){
      if( this.graph[i] !== undefined ){
        for(let j=0; j<this.graph[i].neighbours[j]; j++){
          this.elements.push(
              {
                data: { id: h, source: this.graph[i].v, target: this.graph[i].neighbours[j] },
                group: "edges"
              }
          );
          h++;
        }
      }
    } */
  },
  methods: {
    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    deleteNode(id) {
      console.log("node clicked", id);
    },
    updateNode(event) {
      console.log("right click node", event);
    },
    preConfig(cytoscape) {
      console.log("calling pre-config", cytoscape);
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("after created", cy);
    },
    coloring(){
      const creator = new GraphCreator(8);
      creator.addEdge(1,2);
      creator.addEdge(1,3);
      creator.addEdge(3,4);
      creator.addEdge(2,3);
      creator.addEdge(1,3);
      creator.addEdge(2,4);
      creator.addEdge(4,7);
      creator.addEdge(4,6);
      creator.addEdge(6,7);
      creator.addEdge(5,6);
      creator.addEdge(5,7);

      this.graph = creator.getGraph;
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
    }
  }

}
</script>

<style scoped>
  .jumbotron{
    background: #ad5389; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ad5389, #3c1053); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ad5389, #3c1053); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

</style>