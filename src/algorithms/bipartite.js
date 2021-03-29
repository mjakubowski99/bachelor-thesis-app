class Element{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    empty(){
        return this.head === null;
    }

    pop(){
        let first = this.head.value;
        if( this.size === 1 ){
            this.head = null;
            this.tail = null;
        }
        else{
            this.head = this.head.next;
        }
        this.size--;

        return first;
    }

    push(value){
        let newElement = new Element(value);
        if( this.head === null ){
            this.head = newElement;
            this.tail = this.head;
        }
        else{
            this.tail.next = newElement;
            this.tail = newElement;
        }
        this.size++;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    first(){
        return this.head.value;
    }

    push(value){
        let newElement = new Element(value);
        if( this.head === null ){
            this.head = newElement;
            this.tail = this.head;
        }
        else{
            this.tail.next = newElement;
            this.tail = newElement;
        }
        this.size++;
    }

    print(){
        let el = this.head;
        while( el !== null ){
            console.log(el.value);
            el = el.next;
        }
    }

    search(value){
        let el = this.head;
        let prev = null;
        while( el !== null ){
            if( el.value === value ){
                return { element: el, previous: prev };
            }
            prev = el;
            el = el.next;
        } 
        return null;
    }

    delete(value){
        let founded = this.search(value);
        if( founded !== null ){
            let actual = founded.element;
            let previous = founded.previous;

            if( this.size === 1 ){
                this.head = null;
                this.tail = null;
            }
            else if( previous === null ){
                this.head = actual.next;
            }
            else{
                previous.next = actual.next;
                if( actual.next == null )
                    this.tail = previous;
            }
        }
        this.size--;
    }
}

class Node{
    constructor(vertex){
        this.vertex = vertex;
        this.neighbours = new LinkedList();
    }

    addEdge(neighbour){
        this.neighbours.push(neighbour);
    }
}

class BipartiteGraph{
    constructor(V){
        this.graph = new Array(V+1);
        this.maxVertex = V+1;
        this.S = [ [], [] ];
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

        this.S[0].push(v);
        this.S[1].push(w);

        this.graph[v].addEdge(w);
        this.graph[w].addEdge(v);
    }

    deleteEdge(v, w){
        this.graph[v].neighbours.delete(w);
        this.graph[w].neighbours.delete(v);
    }
}

class EulerPartition{

    constructor(){
        this.queue = new Queue();
    }

    fillQueue(graph, if_odd){
        graph.forEach( (el) => {
            if( el !== undefined && el.neighbours.size !== 0 ){
                if( if_odd ){
                    if( el.neighbours.size%2 != 0 ){
                        this.queue.push(el.vertex);
                    }
                }
                else{
                    if( el.neighbours.size%2 == 0 ){
                        this.queue.push(el.vertex);
                    } 
                }
            }
        });
    }

    eulerPartition(graph_class){
        let graph = graph_class.graph;

        this.fillQueue(graph, true);
        this.fillQueue(graph, false);

        let queue = this.queue;
        let paths = [];

        while( !this.queue.empty() ){
            let actual = queue.pop();
            if( graph[actual].neighbours.size != 0 ){
                let v = actual;
                let path = [];

                while( graph[v].neighbours.size != 0 ){
                    let w = graph[v].neighbours.first();
                    graph_class.deleteEdge(v,w);
                    path.push([v,w]);
                    v = w;
                }

                paths.push( path );
                if( graph[actual].neighbours.size != 0 )
                    queue.push(actual);
            }
        }

        console.log( JSON.stringify(paths) );
    }

}

class MD{

    constructor(){
        this.max_edges = [];
        this.rest_edges = [];
    }

    combineVertexWithMaxDegree(M, max_degree){

        for(let i=0; i<M[0].length; i++){
            let vertex = M[0][i];
            let neighbours = this.G[vertex].neighbours;

            for(let j=0; j<neighbours.size; j++){
                let neighbour = neighbours[j];
                if( this.G[neighbour].neighbours.size == max_degree )
                    this.max_edges.push( [vertex, neighbour] );
                else
                    this.rest_edges.push( [vertex, neighbour] );
            }
        }

        for(let i=0; i<M[1].length; i++){
            let vertex = M[1][i];
            let neighbours = this.G[vertex].neighbours;

            for(let j=0; j<neighbours.size; j++){
                let neighbour = neighbours[j];
                if( this.G[neighbour].neighbours.size != max_degree )
                    this.rest_edges.push( [neighbour, vertex] );
            }
        }
    }
    
    procedure_md(graph, max_degree){
       let M = [ [], [] ];
       let S = graph.S;
       let G = graph.getGraph();
       
       for(let i=0; i<2; i++){

           for(let j=0; j<S[i].length; j++){
                let vertex = S[i][j];
                let degree = this.graph[vertex].neighbours.size;
                if( degree == max_degree )
                    M[i].push(vertex);
           }
       }

       this.combineVertexWithMaxDegree(M, max_degree)
       let M = this.max_edges;
       let N = this.rest_edges; 

       foreach( C of N){
           let C; //sekwencja krawędzi połączonych ze sobą e1, ..., er
           //C zaczyna się od wierzchołka z maksymalnym stopniem
           
           for(let i=1; i<=r; i+=2){
               //put E1 in M
           }
       }

    }
}

class EdgeColoring{

    EC(){
        let G;
        //usun wszystkie wierzchołki o stopniu 0 z G
        let degree = maxDegree();
        this.REC(degree);
    } 

    REC(degree){
        if( degree % 2 != 0 ){
            let M;
            if( degree == 1 ){
                M = G;
            }
            else{
                let matching = new MD();
                M = matching.procedure_md(G);
            }

            let c; //nowy kolor 
            foreach(e in M){
                color(e) = c;
                delete edge from G;
            }
        }

        P = eulerParitition(G);

        if( !P.empty() ){
            L1 = [];
            L2 = [];

            foreach( path p in P ){
                p //sekwencja krawędzi e1, ..., er

                for( i to R ){
                    if( i % 2 != 0 ){
                        L1.append(ei);
                    }
                    else{
                        L2.append(ei);
                    }
                }
            }
        }

        for(let i=0; i<2; i++){
            let Gi; //graf zawierający wszystkie krawędzie z L1 i powiązane z nimi wierzchołki
            this.REC(degree/2);
        }
    }
}












/*function test1(){
    let graph = new BipartiteGraph(10);
    graph.createEdge(1,6);
    graph.createEdge(1,6);
    graph.createEdge(1,7);
    graph.createEdge(2,6);
    graph.createEdge(2,7);
    graph.createEdge(3,8);
    graph.createEdge(3,8);
    graph.createEdge(4,8);
    graph.createEdge(4,9);
    graph.createEdge(4,10);
    graph.createEdge(5,9);
    graph.createEdge(5,10);

    let partition = new EulerPartition();
    partition.eulerPartition(graph);  
}

function test2(){
    let graph = new BipartiteGraph(10);
    graph.createEdge(1,2);
    graph.createEdge(1,3);

    let partition = new EulerPartition();
    partition.eulerPartition(graph);  
}

test1();
test2();

*/







