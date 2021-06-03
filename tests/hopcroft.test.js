import {Graph} from '../src/algorithms/HopcroftKarp/Graph.js'
import {HopcroftKarp} from '../src/algorithms/HopcroftKarp/Hopcroft.js'

function doMatching(bipartiteGraph){
    let A = bipartiteGraph.getA();
    let B = bipartiteGraph.getB();

    let hopcroftKarp = new HopcroftKarp(A,B);
    hopcroftKarp.hopcroftKarpAlgorithm();

    return hopcroftKarp.matchingSize;
}

test('Test one vertex', () => {
    let bipartite = new Graph(1,1);
    bipartite.addEdge(1,1);

    expect( doMatching(bipartite) ).toBe(1);
});

test('Test no vertex', () => {
    let bipartite = new Graph(1,1);

    expect( doMatching(bipartite) ).toBe(0);
});

test( 'Test four vertices', () => {
    let bipartite = new Graph(3,3)
    bipartite.addEdge(1,2);
    bipartite.addEdge(1,3);
    bipartite.addEdge(3,2);

    expect( doMatching(bipartite) ).toBe(2);
})

test( 'Test 1', () => {
    let bipartite = new Graph(7,6)
    bipartite.addEdge(1,2);
    bipartite.addEdge(1,3);
    bipartite.addEdge(3,2);
    bipartite.addEdge(3,4);
    bipartite.addEdge(4,4);
    bipartite.addEdge(5,5);
    bipartite.addEdge(5,6);
    bipartite.addEdge(7,5);

    expect( doMatching(bipartite) ).toBe(5);
})

test( 'Test 2', () => {
    let bipartite = new Graph(6,6);
    bipartite.addEdge(1,2);
    bipartite.addEdge(2,1);
    bipartite.addEdge(2,3);
    bipartite.addEdge(3,3);
    bipartite.addEdge(3,4);
    bipartite.addEdge(4,4);
    bipartite.addEdge(4,5);
    bipartite.addEdge(5,5);
    bipartite.addEdge(6,5);
    bipartite.addEdge(6,6);

    expect( doMatching(bipartite) ).toBe(6);
});

test( 'Test 3', () => {
    let bipartite = new Graph(7,8);
    bipartite.addEdge(2,3);
    bipartite.addEdge(2,4);
    bipartite.addEdge(5,6);
    bipartite.addEdge(7,8);
    bipartite.addEdge(1,6);


    expect( doMatching(bipartite) ).toBe(3);
});

test( 'Test 4', () => {
    let bipartite = new Graph(7,8);
    bipartite.addEdge(1,1);
    bipartite.addEdge(1,2);
    bipartite.addEdge(2,1);
    bipartite.addEdge(2,2);
    bipartite.addEdge(3,2);
    bipartite.addEdge(3,3);
    bipartite.addEdge(3,4);
    bipartite.addEdge(4,3);


    expect( doMatching(bipartite) ).toBe(4);
});

