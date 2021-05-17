import {GraphCreator} from "../src/algorithms/IntervalColoring/GraphCreator.js";
import {IntervalGraphColoring} from "../src/algorithms/IntervalColoring/IntervalGraphColoring.js";
import {LexBfs} from "../src/algorithms/IntervalColoring/LexBfs";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let count_edges = 0;
function buildGraph(graphSize, intervalSize) {
    let size = graphSize;

    const creator = new GraphCreator(graphSize + 1);

    let schedule = [];
    for(let i=0; i<size; i++){
        let s = getRandomInt(0, intervalSize);
        let e = getRandomInt(0, intervalSize);
        while( s === e ){
            s = getRandomInt(0, intervalSize);
        }

        if( s > e ){
            let swap = s;
            s = e;
            e = swap;
        }

        schedule.push({
            start: s,
            end: e
        })
    }

    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            let s1 = schedule[i].start;
            let s2 = schedule[j].start;

            let e1 = schedule[i].end;
            let e2 = schedule[j].end;

            if ((s1 >= s2 && s1 <= e2) || (s2 >= s1 && s2 <= e1)){
                creator.addEdge(i, j);
                count_edges++;
            }

        }
    }

    return creator.getGraph;
}

for(let i=0; i<10; i++){
    test( 'Performance test', () => {

        let graph = buildGraph(1000, 11640)
        const lexBfs = new LexBfs(graph);
        let order = lexBfs.doLexBfs();
        let color = new IntervalGraphColoring(graph);
        color.coloring(order);

        console.log(count_edges)

        expect(1).toBe(1);

    });

    count_edges = 0;
}