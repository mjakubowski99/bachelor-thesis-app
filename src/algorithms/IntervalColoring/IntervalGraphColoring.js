export class IntervalGraphColoring{

    constructor(graph){
        this.graph = graph;
        this.color = new Array( graph.length ).fill(-1);
        this.freeColor = new Array(  graph.length-1 ).fill(true);
        this.maxColor = 0;
    }

    assignMinFreeColor(vertex){

        this.freeColor.fill(true, 0, this.maxColor+2);

        for(let n of this.graph[vertex].neighbours ){
            if( this.color[n] !== -1 ){
                let color = this.color[n];
                this.freeColor[color] = false;
            }
        }

        for(let i=0; i<this.maxColor+2; i++){
            if( this.freeColor[i] ){
                this.color[vertex] = i;
                break;
            }
        }

        if( this.color[vertex] > this.maxColor )
            this.maxColor = this.color[vertex];
    }

    coloring(order){

        for(let vertex of order){
            this.assignMinFreeColor(vertex);
        }

        return this.color;
    }

    printColoring(){
        for(let i = 0; i<this.color.length; i++){
            if( this.color[i] != -1 )
                console.log(i, '->', this.color[i] );
        }
    }
}

//const creator = new GraphCreator(5);
//creator.addEdge(1,2);
//creator.addEdge(1,3);
//creator.addEdge(3,4);
//creator.addEdge(2,3);
//creator.addEdge(1,3);
//creator.addEdge(2,4);
//creator.addEdge(4,7);
//creator.addEdge(4,6);
//creator.addEdge(6,7);
//creator.addEdge(5,6);
//creator.addEdge(5,7);

//const graph = creator.getGraph;
//const lexBfs = new LexBfs(graph);
//let order = lexBfs.doLexBfs();
//console.log(order);


//let color = new IntervalGraphColoring(graph);
//color.coloring(order);