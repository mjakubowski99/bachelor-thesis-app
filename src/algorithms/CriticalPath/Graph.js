import {Vertex} from './Vertex.js'

export class Graph{
    constructor(V){
        this.V = V;
        this.vertexes = new Array(V+1);
    }

    get getSize(){
        return this.V;
    }

    addEdge(from, to, weight){
        if( this.vertexes[from] === undefined )
            this.vertexes[from] = new Vertex();
        if( this.vertexes[to] === undefined )
            this.vertexes[to] = new Vertex();

        this.vertexes[from].addNeighbour(to);
        this.vertexes[from].addWeight(weight);
        this.vertexes[to].addInEdge(from);
    }

    get getGraph(){
        return this.vertexes;
    }
}