export class LexBfs{
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
        if( v === undefined ) {
            console.log('Blad we wczytaniu');
            return [];
        }


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
        return this.output;
    }
}