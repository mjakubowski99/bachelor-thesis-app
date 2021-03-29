let dummy = 0;
const INFINITY = Number.MAX_SAFE_INTEGER;

class Node{
    constructor(v){
        this.vertex = v;
        this.neighbours = [];
    }
}

class Graph{

    constructor(V){
        this.A = new Array(V+1);
        this.B = new Array(V+1);
    }

    addEdge(a,b){
        if( this.A[a] === undefined )
            this.A[a] = new Node(a);
        if( this.B[b] === undefined )
            this.B[b] = new Node(b);

        this.A[a].neighbours.push(b);
        this.B[b].neighbours.push(a);
    }

    getA(){
        return this.A;
    }

    getB(b){
        return this.B;
    }

}

class HopcroftKarp{

    constructor(A,B){

        this.A = A;
        this.B = B; 
        this.matchedToA = new Array(this.A.length).fill(dummy);
        this.matchedToB = new Array(this.B.length).fill(dummy);
        this.distances = new Array(this.A.length).fill(dummy);
        this.matching = [];

    }

    vertexExists(v){
        return this.A[v] !== undefined;
    }

    hopcroftKarpAlgorithm(){

        let matching = 0;
        while( this.BFS() ){
            for(let i=0; i<this.A.length; i++){
                if( this.vertexExists(i) && !this.matchedToA[i] && this.DFS(i) )
                    matching+=1;
            }
        }

        console.log(matching);
        /*console.log('Edges in matching: ');
        for(let i=0; i<this.matchedToA.length; i++){
            if( this.matchedToA[i] !== undefined && this.matchedToA[i] !== dummy )
                console.log('(', i, ',', this.matchedToA[i], ')');
        }*/
    }

    initQueue(){
        let queue = [];
        this.distances[ dummy ] = INFINITY;

        for(let i=0; i<this.A.length; i++){
            let a = this.A[i];

            if( a !== undefined ){
                if( this.matchedToA[i] ){
                    this.distances[i] = INFINITY;
                }
                else{
                    queue.push(i);
                    this.distances[i] = dummy;
                }
            }
        }


        return queue;
    }

    BFS(){
        let queue = this.initQueue()
        let q_index = 0;

        while( true ){
            let a = queue[q_index];
            if( a === undefined )
                break;

            q_index++;

            if( this.distances[a] < this.distances[dummy] ){
                let neighbours = this.A[a].neighbours;
                for( let b of neighbours ){

                    let matched = this.matchedToB[b];
                    if( this.distances[ matched ] === INFINITY ){
                        this.distances[matched] = this.distances[a] + 1;
                        queue.push(matched);
                    }
                }
            }
        }

        if( this.distances[dummy] === INFINITY )
            return false;
        return true;
    }

    DFS(a){
        if( a !== dummy ){
            let neighbours = this.A[a].neighbours;

            for( let b of neighbours ){

                let matched = this.matchedToB[b];
                if( this.distances[matched] === this.distances[a] + 1 && this.DFS(matched) ){
                    this.matchedToA[a] = b;
                    this.matchedToB[b] = a;

                    return true;
                }
            }

            this.distances[a] = INFINITY;
            return false;
        }

        return true;
    }


}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let bipartite = new Graph(1000);

let x = 10000000;
let y = 10000000;
for(let i=0; i<x; i++){
    bipartite.addEdge(  getRandomInt(1, y), getRandomInt(1, y),)
}

let A = bipartite.getA();
let B = bipartite.getB();

let hopcroftKarp = new HopcroftKarp(A,B);
hopcroftKarp.hopcroftKarpAlgorithm();
