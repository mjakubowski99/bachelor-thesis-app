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


function getColoring(graph){
    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();
    let color = new IntervalGraphColoring(graph);

    return color.coloring(order);
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

function test1(){
    const creator = new GraphCreator(5);
    creator.addEdge(1,2);
    creator.addEdge(1,3);
    creator.addEdge(3,4);
    const graph = creator.getGraph;

    return getColoring(graph);
}

function test2(){
    const creator = new GraphCreator(2);
    creator.checkIfVertexExistIfNotCreate(1);
    const graph = creator.getGraph;
    return getColoring(graph);
}

function test3(){
    const creator = new GraphCreator(3);
    creator.checkIfVertexExistIfNotCreate(1);
    creator.checkIfVertexExistIfNotCreate(2);
    const graph = creator.getGraph;

    return getColoring(graph);
}

function test4(){
    const creator = new GraphCreator(6);
    creator.addEdge(1,2);
    creator.addEdge(2,3);
    creator.addEdge(1,3);
    creator.addEdge(4,5);
    const graph = creator.getGraph;

    return getColoring(graph);
}

function test5(){
    const creator = new GraphCreator(11);
    creator.addEdge(1,2);
    creator.addEdge(2,3);
    creator.addEdge(4,5);
    creator.addEdge(4,6);
    creator.addEdge(4,7);
    creator.addEdge(5,6);
    creator.addEdge(6,7);

    creator.checkIfVertexExistIfNotCreate(8);
    creator.addEdge(9, 10);
    const graph = creator.getGraph;

    return getColoring(graph);
}

function createGraphForTest6(){
    const creator = new GraphCreator(20);
    creator.addEdge(1,2);
    creator.addEdge(2,3);
    creator.addEdge(4,5);
    creator.addEdge(4,6);
    creator.addEdge(4,7);
    creator.addEdge(5,6);
    creator.addEdge(6,7);

    return creator;
}

function test6(){
    let creator = createGraphForTest6();
    let graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();
    let color = new IntervalGraphColoring(graph);

    color.coloring(order);

    return color.maxColor;
}

function createGraphForTest7(){
    const creator = new GraphCreator(20);
    creator.addEdge(1,3);
    creator.addEdge(1,4);
    creator.addEdge(1,6);
    creator.addEdge(1,7);
    creator.addEdge(1,5);
    creator.addEdge(1,10);
    creator.addEdge(1,12);

    creator.addEdge(2,3);
    creator.addEdge(2,6);
    creator.addEdge(2, 8);
    creator.addEdge(2,9);
    creator.addEdge(2,11);
    creator.addEdge(2,12);

    creator.addEdge(3, 4);
    creator.addEdge(3,6);
    creator.addEdge(3,5);
    creator.addEdge(3,7);
    creator.addEdge(3, 8);
    creator.addEdge(3,9);
    creator.addEdge(3,10);
    creator.addEdge(3,11);
    creator.addEdge(3,12);

    creator.addEdge(4,5);
    creator.addEdge(5,10);
    creator.addEdge(6,7);
    creator.addEdge(6,8);
    creator.addEdge(6,9);
    creator.addEdge(6,10);
    creator.addEdge(6,11);
    creator.addEdge(6,12);

    creator.addEdge(7, 10);
    creator.addEdge(7,11);
    creator.addEdge(7,12);

    creator.addEdge(8,9);
    creator.addEdge(8,11);

    creator.addEdge(9,11);
    creator.addEdge(9,12);

    creator.addEdge(10,12);
    creator.addEdge(11,12);
    creator.addEdge(13,14);
    creator.addEdge(13,15);
    creator.addEdge(14,15);

    return creator;
}

function test7(){
    let creator = createGraphForTest7();
    let graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();
    let color = new IntervalGraphColoring(graph);

    color.coloring(order);

    return color.maxColor;
}

function createGraphForTest8(){
    const creator = new GraphCreator(11);
    creator.addEdge(1,2);
    creator.addEdge(2,3);
    creator.addEdge(4,5);
    creator.addEdge(4,6);
    creator.addEdge(4,7);
    creator.addEdge(5,6);
    creator.addEdge(6,7);

    return creator;
}

function test8(){
    let creator = createGraphForTest8();
    let graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();
    let color = new IntervalGraphColoring(graph);

    color.coloring(order);

    return color.maxColor;
}

test('Basic coloring example', () =>{
    expect( test1() ).toEqual([-1, 0, 1, 1, 0]); //array of color -1 mean vertex not added
});

test('Coloring one vertex existing', () => {
    expect( test2() ).toEqual( [-1, 0] );
});

test('Coloring many separated vertex', () => {
    expect( test3() ).toEqual( [-1, 0, 0] );
});

test( 'Coloring graph with many components', () => {
    expect( test4() ).toEqual( [-1, 0, 1, 2, 0, 1] );
});

test( 'Coloring graph with many components second variant', () => {
    expect( test5() ).toEqual( [-1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 1] );
});

test( 'Check minimal coloring 1', () => {
    const creator = new GraphCreator(5);
    creator.addEdge(0,1);
    creator.addEdge(0,2);
    creator.addEdge(1,2);
    creator.addEdge(1,3);
    creator.addEdge(3,4);
    const graph = creator.getGraph;

    expect( getMinColoring(graph) ).toBe( 2 );
});

test( 'Check minimal coloring 2', () => {
    const creator = new GraphCreator(5);
    creator.addEdge(0,1);
    creator.addEdge(1,2);
    creator.addEdge(0,3);
    creator.addEdge(3,4);
    const graph = creator.getGraph;

    expect( getMinColoring(graph) ).toBe( 1 );
});

test( 'Check minimal coloring 3', () => {
    const creator = new GraphCreator(5);
    creator.addEdge(1,2);
    creator.addEdge(1,3);
    creator.addEdge(3,4);
    const graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();

    expect( getMinColoring(graph) ).toBe( bruteForceOutput(graph, order, order.length) );
});

test( 'Check minimal coloring 4', () => {
    const creator = new GraphCreator(11);

    creator.addEdge(1,2);
    creator.addEdge(1,5);
    creator.addEdge(1,4);
    creator.addEdge(1,6);
    creator.addEdge(1,7);
    creator.addEdge(1, 9);
    creator.addEdge(1,10);
    creator.addEdge(2,4);
    creator.addEdge(2,3);
    creator.addEdge(2,5);
    creator.addEdge(2,6);
    creator.addEdge(2,7);
    creator.addEdge(2,8);
    creator.addEdge(2,9);
    creator.addEdge(2,10);
    creator.addEdge(3,7);
    creator.addEdge(3,10);
    creator.addEdge(4,5);
    creator.addEdge(4,6);
    creator.addEdge(4,7);
    creator.addEdge(4,9);
    creator.addEdge(4,10);
    creator.addEdge(5,6);
    creator.addEdge(5,7);
    creator.addEdge(5,9);
    creator.addEdge(5,10);
    creator.addEdge(6,8);
    creator.addEdge(6,7);
    creator.addEdge(6,9);
    creator.addEdge(6,10);
    creator.addEdge(7,8);
    creator.addEdge(7,9);
    creator.addEdge(7,10);
    creator.addEdge(8,9);
    creator.addEdge(8,10);
    creator.addEdge(9,10);


    const graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();

    expect( getMinColoring(graph) ).toBe( bruteForceOutput(graph, order, order.length) );
});

test( 'Check minimal coloring 5', () => {
    const creator = new GraphCreator(6);
    creator.addEdge(1,2);
    creator.addEdge(1,3);
    creator.addEdge(1,4);
    creator.addEdge(1,5);
    creator.addEdge(2,3);
    creator.addEdge(2,4);
    creator.addEdge(2,5);
    creator.addEdge(3,4);
    creator.addEdge(3,5);
    creator.addEdge(4,5);
    const graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();

    expect( getMinColoring(graph) ).toBe( bruteForceOutput(graph, order, order.length) );
});

test( 'Check minimal coloring for many components 1', () => {
    const creator = new GraphCreator(14);
    creator.addEdge(0,1);
    creator.addEdge(1,2);
    creator.addEdge(0,2);
    creator.addEdge(3,4);
    creator.addEdge(4,5);
    creator.addEdge(3,5);
    creator.addEdge(6,7);
    creator.addEdge(8,9);
    creator.addEdge(10,11);
    creator.addEdge(11,12);
    creator.addEdge(12,13);
    creator.addEdge(10,13);
    creator.addEdge(10,12);

    const graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();

    expect( getMinColoring(graph) ).toBe( 2 );
})

test( 'Check minimal coloring for many components 2', () => {
    const creator = new GraphCreator(6);
    creator.addEdge(0,1);
    creator.addEdge(2,3);
    creator.addEdge(4,5);
    const graph = creator.getGraph;

    const lexBfs = new LexBfs(graph);
    let order = lexBfs.doLexBfs();

    expect( getMinColoring(graph) ).toBe( 1 );
})



