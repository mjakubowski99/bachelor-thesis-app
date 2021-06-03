
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
  name: "BipartiteMatchingVisual.vue",
  props: ['creator', 'matching'],
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
    };
  },
  created() {
    this.initGraph();
    this.positioning();
    for(let i=0; i<this.A.length; i++) {
      if (this.A[i] !== undefined) {
        let v = this.A[i].vertex;
        for (let j = 0; j < this.A[i].neighbours.length; j++) {

          let w = this.A[i].neighbours[j];
          this.elements.push(
              {
                data: {id: 'edge-'+v+'-'+w, source: String(this.A[i].vertex)+'A', target: String(this.A[i].neighbours[j]) + 'B'},
                group: "edges"
              }
          );
        }
      }
    }
  },
  methods: {

    position(array, y, value){
      let counter = 0;
      for(let i=0; i<array.length; i++){
        if( array[i] !== undefined ){
          this.elements.push(
              {
                data: { id: String(array[i].vertex)+value },
                position: { x: 100*(counter+1) + 100, y: y },
                group: "nodes"
              },
          );
          counter++;
        }
      }

    },
    positioning(){
        this.position(this.A, 100, 'A');
        this.position(this.B, 500, 'B');
    },
    afterCreated(cy) {
      cy.userZoomingEnabled( false );
      console.log(this.matching);
      let dummy = 0;
      let inc = 1;
      for(let i=0; i<this.matching.length; i++){
        if( this.matching[i] !== undefined && this.matching[i] !== dummy ){
          //console.log('#edge-'+String(i)+'-'+String(this.matching[i]));
          setTimeout( () => {
            cy.style()
                .selector('#edge-'+String(i)+'-'+String(this.matching[i]) )
                .style('line-color', 'red')
                .update()
          }, 1000*inc, cy);
          inc++;
        }
      }
    },
    initGraph(){
      this.A = this.creator.getA();
      this.B = this.creator.getB();
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