export class Vertex{
    constructor(){
        this.neighbours = [];
        this.inEdges = [];
        this.weight = [];
    }

    get getNeighbours(){
        return this.neighbours;
    }

    get getInEdges(){
        return this.inEdges;
    }

    addNeighbour(neighbour){
        this.neighbours.push(neighbour);
    }

    addWeight(w){
        this.weight.push(w);
    }

    addInEdge(v){
        this.inEdges.push(v);
    }
}