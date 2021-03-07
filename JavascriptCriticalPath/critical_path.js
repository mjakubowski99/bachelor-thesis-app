class Vertex{
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


class Graph{
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

function getVertexWithZeroInEdges(graph){
    let queue = [];
    for(let i = 0; i<graph.length; i++){
        if( graph[i] !== undefined && graph[i].getInEdges.length === 0 )
            queue.push(i);
    }

    return queue;
}

function topologicalSort(graph, queue){

    topological_order = [];
    while(queue.length !==0 ){
        n = queue[0];
        queue.shift();
        topological_order.push(n);

        while(graph[n].neighbours.length != 0){
            neighbour = graph[n].neighbours[0];
            graph[n].neighbours.shift();
            graph[neighbour].inEdges.shift();
            if( graph[neighbour].inEdges.length === 0 ){
                queue.push(neighbour);
            }

        }
    }

    for(let i=0; i<graph.length; i++ )
        if( graph[i] !== undefined && graph[i].neighbours.length !== 0 )
            return "Graf zawiera cykl";

    return topological_order;
}

function criticalPath(graph, order){
    let distance = new Array(graph[i].getSize).fill(0);
    for(let i=0; i<order; i++){
        v = order[i];
        for(let i=0; i<graph[v].neighbours.length; i++){
            neighbour = graph[v].neighbours[i];
            weight = graph[v].weight[i];

            if( distance[neighbour] < distance[v] + weight ){
                distance[neighbour] = distance[v] + weight;
            }
        }
    }
}

let graph = new Graph(9);
graph.addEdge(1,2,);
graph.addEdge(1,4);
graph.addEdge(1,6);
graph.addEdge(6,7);
graph.addEdge(7,8);
graph.addEdge(7,9);
graph.addEdge(4,5);
graph.addEdge(2,3);
graph.addEdge(5,3);
graph.addEdge(9,1);

let queue = getVertexWithZeroInEdges(graph.getGraph);

console.log( topologicalSort(graph.getGraph, queue) );
