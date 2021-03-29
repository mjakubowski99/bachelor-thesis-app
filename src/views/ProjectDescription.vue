<template>

    <div>
      <navbar-component></navbar-component>
    </div>


</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'

import {GraphCreator} from '../algorithms/IntervalColoring/GraphCreator.js'
import {LexBfs} from '../algorithms/IntervalColoring/LexBfs.js'
import {IntervalGraphColoring} from '../algorithms/IntervalColoring/IntervalGraphColoring.js'

export default {
    name: 'ProjectDescription',
    components: {
      NavbarComponent,
    },
    methods: {
        run: function(){
            const creator = new GraphCreator(5);
            creator.addEdge(1,2);
            creator.addEdge(1,3);
            creator.addEdge(3,4);

            const graph = creator.getGraph;
            const lexBfs = new LexBfs(graph);
            let order = lexBfs.doLexBfs();
            console.log(order);

            let color = new IntervalGraphColoring(graph);
            color.coloring(order);
        }
    }
}

</script>
  
<style scoped>
</style>