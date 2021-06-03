import {Graph} from '../src/algorithms/CriticalPath/Graph.js';
import {CriticalPath} from '../src/algorithms/CriticalPath/CriticalPath.js';


function test1Graph(){
    let graph = new Graph(13);
    graph.addEdge(1,4,2);
    graph.addEdge(1,2, 2);
    graph.addEdge(1,3,2);
    graph.addEdge(4,5,5);
    graph.addEdge(4,6,5);
    graph.addEdge(2,6,3);
    graph.addEdge(2,5,3);
    graph.addEdge(3,5,7);
    graph.addEdge(3,6,7);
    graph.addEdge(5,7,14);
    graph.addEdge(2,5,3);
    graph.addEdge(6,8,12);
    graph.addEdge(6,9,12);
    graph.addEdge(6,10,12);
    graph.addEdge(7,8,3);
    graph.addEdge(7,9,3);
    graph.addEdge(7,10,3);
    graph.addEdge(10,11,7);
    graph.addEdge(9,11,14);
    graph.addEdge(8,11,28);
    graph.addEdge(11,12,2);

    return graph;
}
function test2Graph(){
    let graph = new Graph(7);
    graph.addEdge(0,1, 1);
    graph.addEdge(1,2, 1);
    graph.addEdge(2,3, 1);
    graph.addEdge(3,4, 1);
    graph.addEdge(4,5, 1);
    graph.addEdge(5,6, 1);
    graph.addEdge(0,6, 6);

    return graph;
}

function test3Graph(){
    let graph = new Graph(8);
    graph.addEdge(0,1, 1);
    graph.addEdge(0,2, 1);
    graph.addEdge(1,2, 3);
    graph.addEdge(2, 7, 4);
    graph.addEdge(2, 3, 1);
    graph.addEdge(3, 4, 1);
    graph.addEdge(2, 4, 1);
    graph.addEdge(4, 5, 1);
    graph.addEdge(5, 6, 1);
    graph.addEdge(6, 7, 1);

    return graph;
}

function test4Graph(){
    let graph = new Graph(12);
    graph.addEdge(0,1, 2);
    graph.addEdge(1,2, 4);
    graph.addEdge(1,4, 3);
    graph.addEdge(2,3, 6);
    graph.addEdge(4,5, 5);
    graph.addEdge(5,3, 1);
    graph.addEdge(3,7, 1);
    graph.addEdge(0,8, 10);
    graph.addEdge(0,9, 2);
    graph.addEdge(8,10, 4);
    graph.addEdge(9,10, 3);
    graph.addEdge(10,11, 15);

    return graph;
}

function test5Graph(){
    let graph = new Graph(12);
    graph.addEdge(0,1, 2);
    graph.addEdge(1,2, 4);
    graph.addEdge(1,4, 3);
    graph.addEdge(2,3, 6);
    graph.addEdge(4,5, 5);
    graph.addEdge(5,3, 1);
    graph.addEdge(3,7, 1);
    graph.addEdge(0,8, 10);
    graph.addEdge(0,9, 2);
    graph.addEdge(8,10, 4);
    graph.addEdge(9,10, 3);
    graph.addEdge(10,11, 15);
    graph.addEdge(11,7, 2);

    return graph;
}

function test6Graph(){
    let graph = new Graph(7);
    graph.addEdge(0, 1, 1);
    graph.addEdge(1, 4, 1);
    graph.addEdge(4, 5, 1);
    graph.addEdge(5, 6, 1);
    graph.addEdge(6, 3, 1);
    graph.addEdge(0, 2, 2);
    graph.addEdge(2, 3, 2);

    return graph;
}

function doCriticalPath(){

    let graph = test1Graph();
    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    graph = test1Graph()
    criticalPath.criticalPath(graph, order);

    return criticalPath.getLongestPathValue();
}



function doCriticalPath2(){

    let graph = test2Graph();
    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    graph = test2Graph();
    criticalPath.criticalPath(graph, order);

    return criticalPath.getLongestPathValue();
}

function doCriticalPath3(){

    let graph = test3Graph();
    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    graph = test3Graph();
    criticalPath.criticalPath(graph, order);

    return criticalPath.getLongestPathValue();
}

function doCriticalPath4(){

    let graph = test4Graph();
    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    graph = test4Graph();
    criticalPath.criticalPath(graph, order);

    return criticalPath.getLongestPathValue();
}

function doCriticalPath5(){

    let graph = test5Graph();
    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    graph = test5Graph();
    criticalPath.criticalPath(graph, order);

    return criticalPath.getLongestPathValue();
}

function doCriticalPath6(){

    let graph = test6Graph();
    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    graph = test6Graph();
    criticalPath.criticalPath(graph, order);

    return criticalPath.getLongestPathValue();
}

test('Finding cycle in graph test 1', () => {
    let graph = new Graph(3);
    graph.addEdge(0, 1, 1);
    graph.addEdge(1, 2, 1);
    graph.addEdge(2, 0, 1);

    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    expect( order ).toBe( "Graf zawiera cykl" );
})

test('Finding cycle in graph test 2', () => {
    let graph = new Graph(8);
    graph.addEdge(0,1, 1);
    graph.addEdge(0,2, 1);
    graph.addEdge(1,2, 3);
    graph.addEdge(2, 7, 4);
    graph.addEdge(2, 3, 1);
    graph.addEdge(3, 4, 1);
    graph.addEdge(4, 2, 1);
    graph.addEdge(4, 5, 1);
    graph.addEdge(5, 6, 1);
    graph.addEdge(6, 7, 1);

    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    expect( order ).toBe( "Graf zawiera cykl" );
})

test('Finding cycle in graph test 3', () => {
    let graph = new Graph(3);
    graph.addEdge(0, 1, 1);
    graph.addEdge(1,0, 1);

    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    expect( order ).toBe( "Graf zawiera cykl" );
})

test('Finding cycle in graph test 4', () => {
    let graph = new Graph(10);
    graph.addEdge(0, 1, 1);
    graph.addEdge(1,2,1);
    graph.addEdge(2,3,1);
    graph.addEdge(3,4,1);
    graph.addEdge(4,5,1);
    graph.addEdge(5,1,1);


    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    expect( order ).toBe( "Graf zawiera cykl" );
})

test( 'Topological sort order', () => {
    let graph = new Graph(4);
    graph.addEdge(0,1, 1);
    graph.addEdge(0,2, 1);
    graph.addEdge(1,2, 1);
    graph.addEdge(1,3, 1);
    graph.addEdge(2,3, 1);

    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    expect( order ).toEqual( [0, 1, 2, 3] );
})

test( 'Topological sort order 2', ()=>{
    let graph = new Graph(4);
    graph.addEdge(0,1, 1);
    graph.addEdge(0,2, 1);
    graph.addEdge(1,2, 1);
    graph.addEdge(1,3, 1);
    graph.addEdge(2,3, 1);
    graph.addEdge(2,4, 1);
    graph.addEdge(3,4, 1);
    graph.addEdge(4,7, 1);
    graph.addEdge(4,5, 1);
    graph.addEdge(5,6, 1);
    graph.addEdge(6,7, 1);

    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    expect( order ).toEqual( [0,1,2,3,4,5,6,7] );
})

test( 'Longest path test 1', () => {
    expect( doCriticalPath() ).toBe( 56 );
});

test('Longest path test 2', () => {
    expect( doCriticalPath2() ).toBe( 6 );
})

test('Longest path test 3', () => {
    expect( doCriticalPath3() ).toBe( 9 );
})

test('Longest path test 4', () => {
    expect( doCriticalPath4() ).toBe( 29 );
})

test('Longest path test 5', () => {
    expect( doCriticalPath5() ).toBe( 31 );
})

test('Longest path test 6', () => {
    expect( doCriticalPath6() ).toBe( 5 );
})
