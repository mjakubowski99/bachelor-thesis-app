import {Vertex} from './Vertex.js'

export class GraphCreator{
    constructor(V){
        this.V = V;
        this.graph = new Array(V);
    }

    get getGraph(){
        return this.graph;
    }

    checkIfVertexExistIfNotCreate(vertex){
        if( this.graph[vertex] === undefined )
            this.graph[vertex] = new Vertex(vertex); 
    }

    addEdge(v1, v2){
        this.checkIfVertexExistIfNotCreate(v1);
        this.checkIfVertexExistIfNotCreate(v2);

        this.graph[v1].addNeighbour(v2);
        this.graph[v2].addNeighbour(v1);
    }
}
