import {Node} from './Node.js'

export class Graph{

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

    getB(){
        return this.B;
    }

}