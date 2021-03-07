class Vertex{
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

class GraphCreator{
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



class LexBfs{
    constructor(graph){
        this.graph = graph;
    }

    fillSetsAtStart(){
       let startSet = [];
       this.graph.forEach( (element) => {
            if( element !== undefined )
                startSet.push(element.vertex);
       });
       
       return [{
           set: startSet,
           modified: false
       }];
    }

    findNeighbourInSet(neighbour){
        let position = -1;
        let set_index = -1;
        let not_do = false;

        this.sets.forEach( (element, index) => {
            if( !not_do ){
                position = element.set.indexOf(neighbour);
                if( position !== -1 ){
                    set_index = index;
                    not_do = true;
                    return [set_index, position];
                } 
            }
        }); 

        return [set_index, position];
    }

    removeFirstElementFromSetAndGiveThisValue(){
        let v = this.sets[0].set[0];
        this.output.push(v);
        this.sets[0].set.splice(0, 1);
        if( this.sets[0].set.length === 0 )
            this.sets.splice(0, 1);

        this.sets.forEach( (el) => {
            el.modified = false;
        });

        return v;
    }

    clearModifiedValue(){
        this.sets.forEach( (el) => {
            el.modified = false;
        });
    }

    createNewSetBeforeAndGiveNewSetIndex(set_index){
        this.sets.splice(set_index, 0, { set: [], modified: false});
        set_index++;
        this.sets[set_index].modified = true;

        return set_index;
    }

    doLexBfs(){
        this.sets = this.fillSetsAtStart();
        this.output = [];
        let v = this.sets[0].set[0];
        if( v === undefined )
            console.log('Blad we wczytaniu');


        while( this.sets.length ){
            v = this.removeFirstElementFromSetAndGiveThisValue();
            this.clearModifiedValue();
            
            const neighbours = this.graph[v].getNeighbours;
            neighbours.forEach( (neighbour) => {
                let position = -1;
                let set_index = -1;

                let indexes = this.findNeighbourInSet(neighbour);
                set_index = indexes[0];
                position = indexes[1];

                if( set_index !== -1 ){               
                    if( !this.sets[set_index].modified )
                        set_index = this.createNewSetBeforeAndGiveNewSetIndex(set_index);
                
                    this.sets[set_index-1].set.push(neighbour);
                    this.sets[set_index].set.splice(position, 1);
        
                    if( this.sets[set_index].set.length == 0 )
                        this.sets.splice(set_index, 1);  
                }
            });
        }
        console.log( this.output );
    }
}

function test1(){
    const creator = new GraphCreator(8);
    creator.addEdge(1,3);
    creator.addEdge(1,2);
    creator.addEdge(1,4);
    creator.addEdge(2,5);
    creator.addEdge(4,5);
    const graph = creator.getGraph;
    const lexBfs = new LexBfs(graph);
    lexBfs.doLexBfs();

    /* [1,3,2,4,5] */
}

function test2(){
    const creator = new GraphCreator(8);
    creator.addEdge(1,2);
    creator.addEdge(1,3);
    creator.addEdge(1,7);
    creator.addEdge(2,3);
    creator.addEdge(3,4);
    creator.addEdge(2,4);
    creator.addEdge(3,6);
    creator.addEdge(3,5);
    creator.addEdge(4,5);
    creator.addEdge(4,6);
    creator.addEdge(4,7);
    creator.addEdge(5,6); 

    const graph = creator.getGraph;
    const lexBfs = new LexBfs(graph);
    lexBfs.doLexBfs();

    /* [1,2,3,7,4,5,6] */
}

function test3(){
    const creator = new GraphCreator(8);
    creator.addEdge(1,4);
    creator.addEdge(1,2);
    creator.addEdge(2,3);
    creator.addEdge(2,4);
    creator.addEdge(2,5);
    creator.addEdge(2,6);
    creator.addEdge(6,5);
    creator.addEdge(3,5);
    creator.addEdge(3,4);

    const graph = creator.getGraph;
    const lexBfs = new LexBfs(graph);
    lexBfs.doLexBfs();

    /* [1,4,2,3,5,6] */
}

function test4(){
    const creator = new GraphCreator(9);  
    creator.addEdge(1,4);
    creator.addEdge(1,3);
    creator.addEdge(1,6);
    creator.addEdge(1,7);
    creator.addEdge(4,5);
    creator.addEdge(3,5);
    creator.addEdge(4,9);
    creator.addEdge(5,9);
    creator.addEdge(5,8);
    creator.addEdge(9,8);
    creator.addEdge(6,8);
    creator.addEdge(7,8);
    creator.addEdge(6,7);
    creator.addEdge(3,6);

    const graph = creator.getGraph;
    const lexBfs = new LexBfs(graph);
    lexBfs.doLexBfs();

    /* [1, 4, 3, 6, 7, 5, 9, 8] */
}

function test5(){
    const creator = new GraphCreator(9);
    creator.addEdge(1,3);
    creator.addEdge(1,2);
    creator.addEdge(2,3);
    creator.addEdge(3,6);
    creator.addEdge(2,4);
    creator.addEdge(4,6);
    creator.addEdge(6,7);
    creator.addEdge(1,5);

    const graph = creator.getGraph;
    const lexBfs = new LexBfs(graph);
    lexBfs.doLexBfs();

    /* [1, 3, 2, 5, 6, 4, 7] */
}


test1();
test2();
test3();
test4();
test5();

