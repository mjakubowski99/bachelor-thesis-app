import {GraphCreator} from "../src/algorithms/IntervalColoring/GraphCreator.js";
import {IntervalGraphColoring} from "../src/algorithms/IntervalColoring/IntervalGraphColoring.js";
import {LexBfs} from "../src/algorithms/IntervalColoring/LexBfs";

function permutate(values, permutations = [], end) {
    if (end === 1)
        permutations.push(values.slice(0))

    for (let i = 0; i < end; i++) {
        permutate(values, permutations, end - 1)
        if( end % 2 )
            [values[0], values[end - 1]] = [values[end - 1], values[0]]
        else
            [values[i], values[end - 1]] = [values[end - 1], values[i]]
    }

    return permutations;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function buildRandomGraph() {
    let size = 10;
    const creator = new GraphCreator(size + 1);

    let schedule = [];
    for(let i=0; i<size; i++){
        let s = getRandomInt(0, 7);
        let e = getRandomInt(0, 7);
        while( s === e ){
            s = getRandomInt(0, 7);
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
            }

        }
    }

    return creator.getGraph;
}

function getMinColoring(graph){
    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();
    let color = new IntervalGraphColoring(graph);

    color.coloring(order);

    return color.maxColor;
}

function bruteForceOutput(graph, order, end){
    let combinations = permutate(order, [], end );
    let color = new IntervalGraphColoring(graph);

    let min = 1000000;

    for(let x of combinations){
        let color = new IntervalGraphColoring(graph);
        for(let y of x)
            color.assignMinFreeColor(y);
        if( min > color.maxColor )
            min = color.maxColor;
    }

    return min;
}


for(let i=0; i<10; i++){
    test('Random data tests', function (){
        const graph = buildRandomGraph();

        const lexBfs = new LexBfs(graph);
        let order = lexBfs.doLexBfs();

        let countOfColors = getMinColoring(graph);
        expect( countOfColors ).toBe( bruteForceOutput(graph, order, order.length) );
    });
}
