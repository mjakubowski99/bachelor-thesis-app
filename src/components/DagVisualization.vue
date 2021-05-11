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
    />
  </cytoscape>
</template>

<script>
export default {
  name: "DagVisualization.vue",
  props: ['creator', 'path'],
  data() {
    return {
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
              label: "data(weight)",
              "color": 'blue',
              "line-color": "#0d0d0d",
              "target-arrow-color": "#0d0d0d",
              "target-arrow-shape": "triangle",
              'curve-style': 'bezier'
            }
          }
        ],
        layout: { name: "grid", rows: 1 }
      },
      elements: [
      ],
      graph: null,
    };
  },
  created() {
    this.initGraph();
    this.positioning();
    for(let i=0; i<this.graph.length; i++) {
        if (this.graph[i] !== undefined) {
            let v = i;
            for (let j = 0; j < this.graph[i].neighbours.length; j++) {
                let w = this.graph[i].neighbours[j];
                this.elements.push(
                    {
                      data: {id: 'edge-'+v+'-'+w, source: v, target: this.graph[i].neighbours[j], weight: this.graph[i].weight[j] },
                      group: "edges",
                    }
                );
            }
        }
    }
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },

    calculatePosition(a, b){
        let x, y;
        x = a+80;
        if( this.getRandomInt(0,2) )
          y = this.getRandomInt(b+40, b+100)
        else
          y = this.getRandomInt(b-40, b-100)

        return [x, y];
    },

    positioning(){
      let a = 200;
      let b = 200;
      let position;

      for(let i=0; i<this.graph.length; i++){
          if( this.graph[i] !== undefined ){
            this.elements.push(
                {
                  data: { id: i },
                  position: { x: a, y: b },
                  group: "nodes"
                },
            );
            position = this.calculatePosition(a,b)
            a = position[0];
            b = position[1];
          }
      }
    },
    afterCreated(cy) {
      cy.userZoomingEnabled( false );
      let inc = 1;

      let path = this.path.reverse();
      for(let i=0; i<path.length-1; i++){
        if( path[i] !== undefined ){
          let v = path[i];
          let w = path[i+1];
          setTimeout( () => {
            cy.style()
                .selector('#edge-'+String(v)+'-'+String(w))
                .style('line-color', 'red')
                .update()
          }, 1000*inc, cy);
          inc++;
        }
      }
    },
    initGraph(){
        this.graph = this.creator.getGraph;
    },
  }

}

</script>

<style scoped>

</style>