export class CriticalPath{

    getVertexWithZeroInEdges(graph){
        let queue = [];
        for(let i = 0; i<graph.length; i++){
            if( graph[i] !== undefined && graph[i].getInEdges.length === 0 )
                queue.push(i);
        }

        return queue;
    }

    topologicalSort(graph, queue){

        let topological_order = [];
        while(queue.length !==0 ){
            let n = queue[0];
            queue.shift();
            topological_order.push(n);

            if( graph[n] !== undefined ) {
                while (graph[n].neighbours.length != 0) {
                    let neighbour = graph[n].neighbours[0];
                    graph[n].neighbours.shift();

                    if( graph[neighbour] !== undefined ) {
                        graph[neighbour].inEdges.shift();
                        if (graph[neighbour].inEdges.length === 0) {
                            queue.push(neighbour);
                        }
                    }
                }
            }
        }

        for(let i=0; i<graph.length; i++ )
            if( graph[i] !== undefined && graph[i].neighbours.length !== 0 )
                return "Graf zawiera cykl";

        return topological_order;
    }

    criticalPath(graphClass, order){
        let graph = graphClass.getGraph;
        let distance = new Array(graphClass.getSize).fill(0);
        console.log(graph);
        for(let i=0; i<order.length; i++){
            let v = order[i];

            for (let j = 0; j < graph[v].neighbours.length; j++) {
                    let neighbour = graph[v].neighbours[j];
                    let weight = graph[v].weight[j];

                    if (distance[neighbour] < distance[v] + weight) {
                        distance[neighbour] = distance[v] + weight;
                    }
            }
        }
        return distance[ order[order.length-1] ];
    }
}


//let graph = new Graph(9);
// graph.addEdge(1,2,);
// graph.addEdge(1,4);
// graph.addEdge(1,6);
// graph.addEdge(6,7);
// graph.addEdge(7,8);
// graph.addEdge(7,9);
// graph.addEdge(4,5);
// graph.addEdge(2,3);
// graph.addEdge(5,3);
// graph.addEdge(9,1);

//graph.addEdge(1,2, 2);
//graph.addEdge(2,3, 4);
//graph.addEdge(1,4, 5);

//let queue = getVertexWithZeroInEdges(graph.getGraph);

//let order = topologicalSort(graph.getGraph, queue);
//console.log(order);
//console.log( criticalPath(graph, order, 3) );
