let dummy = 0;
const INFINITY = Number.MAX_SAFE_INTEGER;

export class HopcroftKarp{

    constructor(A,B){

        this.A = A;
        this.B = B;
        this.matchedToA = new Array(this.A.length).fill(dummy);
        this.matchedToB = new Array(this.B.length).fill(dummy);
        this.distances = new Array(this.A.length).fill(dummy);
        this.matching = [];

    }

    vertexExists(v){
        return this.A[v] !== undefined;
    }

    hopcroftKarpAlgorithm(){

        let matching = 0;
        while( this.BFS() ){
            for(let i=0; i<this.A.length; i++){
                if( this.vertexExists(i) && !this.matchedToA[i] && this.DFS(i) )
                    matching+=1;
            }
        }

        console.log(matching);
        /*console.log('Edges in matching: ');
        for(let i=0; i<this.matchedToA.length; i++){
            if( this.matchedToA[i] !== undefined && this.matchedToA[i] !== dummy )
                console.log('(', i, ',', this.matchedToA[i], ')');
        }*/
    }

    initQueue(){
        let queue = [];
        this.distances[ dummy ] = INFINITY;

        for(let i=0; i<this.A.length; i++){
            let a = this.A[i];

            if( a !== undefined ){
                if( this.matchedToA[i] ){
                    this.distances[i] = INFINITY;
                }
                else{
                    queue.push(i);
                    this.distances[i] = dummy;
                }
            }
        }


        return queue;
    }

    BFS(){
        let queue = this.initQueue()
        let q_index = 0;
        let val = true;

        while( val === true ){
            let a = queue[q_index];
            if( a === undefined )
                break;

            q_index++;

            if( this.distances[a] < this.distances[dummy] ){
                let neighbours = this.A[a].neighbours;
                for( let b of neighbours ){

                    let matched = this.matchedToB[b];
                    if( this.distances[ matched ] === INFINITY ){
                        this.distances[matched] = this.distances[a] + 1;
                        queue.push(matched);
                    }
                }
            }
        }

        if( this.distances[dummy] === INFINITY )
            return false;
        return true;
    }

    DFS(a){
        if( a !== dummy ){
            let neighbours = this.A[a].neighbours;

            for( let b of neighbours ){

                let matched = this.matchedToB[b];
                if( this.distances[matched] === this.distances[a] + 1 && this.DFS(matched) ){
                    this.matchedToA[a] = b;
                    this.matchedToB[b] = a;

                    return true;
                }
            }

            this.distances[a] = INFINITY;
            return false;
        }

        return true;
    }


}