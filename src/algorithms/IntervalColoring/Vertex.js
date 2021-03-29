export class Vertex{
    constructor(v){
        this.v = v;
        this.neighbours = [];
    }

    get vertex(){
        return this.v;
    }
    
    get getNeighbours(){
        return this.neighbours;
    }

    addNeighbour(neighbour){
        this.neighbours.push(neighbour);
    }
}
