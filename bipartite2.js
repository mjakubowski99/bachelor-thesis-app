class Node{
    constructor(vertex){
        this.vertex = vertex;
        this.neighbours = [];
    }

    addEdge(neighbour){
        this.neighbours.push(neighbour);
    }
}

class BipartiteGraph{
    constructor(V){
        this.graph = new Array(V+1);
        this.maxVertex = V+1;
        this.countEdges = 0;
        this.maxDegree = 0;
    }

    getGraph(){
        return this.graph;
    }

    initVertexIfNotExists(v){
        if( this.graph[v] === undefined ){
            this.graph[v] = new Node(v);
            this.graph[v].vertex = v;
        }
    }

    createEdge(v,w){
        this.initVertexIfNotExists(v);
        this.initVertexIfNotExists(w);

        this.graph[v].addEdge(w);
        this.graph[w].addEdge(v);

        if( this.graph[v].neighbours.length > this.maxDegree )
            this.maxDegree = this.graph[v].neighbours.length;
        if( this.graph[w].neighbours.length > this.maxDegree )
            this.maxDegree = this.graph[w].neighbours.length;

        this.countEdges++;
    }

    deleteEdge(v,w){

        let index = this.graph[v].neighbours.indexOf(w);
        if (index > -1) {
            this.graph[v].neighbours.splice(index, 1);
        }

        index = this.graph[w].neighbours.indexOf(v);
        if (index > -1) {
            this.graph[w].neighbours.splice(index, 1);
        }

        if( this.graph[v].neighbours.length === 0 )
            this.graph[v] = undefined;
        if( this.graph[w].neighbours.length === 0 )
            this.graph[w] = undefined; 
    }
   
}

function compare(a, b){
    return b.neighbours.length - a.neighbours.length;
}

class EdgeColoring{

    constructor(){
        this.a = 0;
    }

    orderVertices(bipGraph){
        let order = [ ...bipGraph ];
        order.sort( compare );
        
        return order;
    }

    vertexNotAttachedToColor(M, u, v){
        for(let i=0; i<M.length; i++){
            let edge = M[i];
            if( edge[0] === u || edge[0] === v || edge[1] === u || edge[1] === v){
                return false;
            }
        }
        return true;
    }

    edgeColor(graph, colorsCount){
        let bipGraph = graph.getGraph();
        let order = this.orderVertices(bipGraph);

        let deleted = 0;
        let c = 0;
      
        while( deleted < graph.countEdges ){

            let M = [];
            for(let i=0; i<order.length; i++){
                if( order[i] !== undefined && bipGraph[ order[i].vertex ] !== undefined ){
                    for(let j=0; j<bipGraph[ order[i].vertex ].neighbours.length; j++){
                        let u = order[i].vertex;
                        let v = bipGraph[u].neighbours[j];
                        if( this.vertexNotAttachedToColor(M, u, v) ){
                            graph.deleteEdge(u,v);
                            M.push([u,v]);
                            deleted++;
                            break;
                        }
                    }

                    if( M.length === colorsCount ){
                        break;
                    }
                }
            }
            c++;
            bipGraph = graph.getGraph();
            order = this.orderVertices(bipGraph);
        
        }

        console.log(c);
        console.log('Liczba krawedzi: ', graph.countEdges);
        console.log('Liczba usunietych: ', deleted);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let bip = new BipartiteGraph(20000);
let range1 = 1000;
let range2 = 2000;

for(let i = 0; i<100000; i++){
    let a =  getRandomInt(1, range1);
    let b = getRandomInt(range1+1, range2+1);
    bip.createEdge(a,b);
}


console.log("Maksymalny stopien: ", bip.maxDegree);
let coloring = new EdgeColoring();
coloring.edgeColor(bip, 100000);
