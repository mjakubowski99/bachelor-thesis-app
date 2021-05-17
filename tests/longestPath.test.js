import {Graph} from '../src/algorithms/CriticalPath/Graph.js';
import {CriticalPath} from '../src/algorithms/CriticalPath/CriticalPath.js';

function doCriticalPath(graph){

    let criticalPath = new CriticalPath();
    let queue = criticalPath.getVertexWithZeroInEdges(graph.getGraph);
    let order = criticalPath.topologicalSort(graph.getGraph, queue);

    graph = new Graph(13);
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
    criticalPath.criticalPath(graph, order);

    return criticalPath.getLongestPathValue();
}

test( 'Longest path test 1', () => {
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

    expect( doCriticalPath(graph) ).toBe( 56 );
});