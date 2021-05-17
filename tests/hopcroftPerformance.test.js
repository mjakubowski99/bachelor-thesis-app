import {Graph} from '../src/algorithms/HopcroftKarp/Graph.js'
import {HopcroftKarp} from '../src/algorithms/HopcroftKarp/Hopcroft.js'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function doMatching(bipartiteGraph){
    let A = bipartiteGraph.getA();
    let B = bipartiteGraph.getB();

    let hopcroftKarp = new HopcroftKarp(A,B);
    hopcroftKarp.hopcroftKarpAlgorithm();

    return hopcroftKarp.matchingSize;
}

for(let i=0; i<10; i++){
    test('Performance random test', () => {
        let bipartite = new Graph(10000,10000);
        for(let i = 0; i<1000000; i++)
            bipartite.addEdge( getRandomInt(0, 1000), getRandomInt(0,1000) );

        doMatching(bipartite)


        expect( 1 ).toBe(1);
    });
}