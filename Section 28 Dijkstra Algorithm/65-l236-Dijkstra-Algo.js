/*

Lecture 236.

Dijkstra's shortest path algorithm

Find the shortest path from A to E

1. Pick the smallest value, i.e., the shortest distance from A, to the node that
we haven't visited.

Start with this "shortest distances" table, and update the distance if we
discover a shorter one:

Vertex | Shortest distance from A so far
A      | 0
B      | Inf, 4
C      | Inf, 2
D      | Inf, 4
E      | Inf, 7, 6
F      | Inf, 6, 5

And keep track of the visited nodes, as well as the previous node visited
visited = [A, C]
previous = {
  A: null;
  B: A;
  C: A;
  D: C;
  E: F;
  F: D;
}

Good explanation on YouTube:
Dijkstras Shortest Path Algorithm Explained | With Example | Graph Theory
By FelixTechTips
https://www.youtube.com/watch?v=bZkzH5x0SKU

Or search this:
"dijkstra algorithm javascript how to return array of nodes to target node"

*/

// Simple priority queue implemented with a JS array. Not as efficient as the
// one we built before, but much simpler to read.
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(item, priority) {
    this.items.push({ item, priority });
    this.sort();
  }
  dequeue() {
    return this.items.shift();
  }
  sort() {
    this.items.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    // If it doesn't already exist then initialize an empty array at that spot.
    // That means, there are no adjacent vertices yet.
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Remember, in a regular unweighted graph, we define an edge as a pair of
  // adjacencies, e.g., A connects to B, and B connects to A. We can store
  // simple string identifiers in the adjacency list. But in a weighted graph,
  // we must store objects in the adjacency list, because we need not only a
  // node/vertex identifier but also a weight for that edge.

  // --> Regular graph with unweighted edges:
  // this.adjacencyList = {
  //   A: ["B", "C"]
  //   B: ["A", "E"]
  //   C: ["A", "D"]
  //   E: ["B"]
  //   D: ["C"]
  // }

  // --> Weighted graph:
  // this.adjacencyList = {
  //   A: [{id: "B", weight: 4}, {id: "C", weight: 2}]
  //   B: [{id: "A", weight: 4}, {id: "E", weight: 3}]
  //   C: [{id: "C", weight: 2}, {id: "D", weight: 2}]
  //   E: [{id: "B", weight: 3}]
  //   D: [{id: "C", weight: 2}]
  // }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ id: v2, weight });
    this.adjacencyList[v2].push({ id: v1, weight });
  }

  // Naming conventions: "node" and "vertex" are interchangeable. We should
  // probably prefer "vertex" in the context of graphs, but "node" is shorter,
  // so we'll use "node". However, we'll think of a node as a "node object" when
  // we store it in an adjacency list array (id: id, weight: 4) or in the
  // priority queue (item: id, priority: 0).
  //
  // Returns an object like this:
  // {
  //   shortestDistance: number,
  //   path: ["A", "B"],
  //   allDistances: {A: 0, B: 2},
  // };
  dijkstra(startNode, endNode) {
    // For this PriorityQueue, "priority" means "distance" or "edge weight"
    const pq = new PriorityQueue();
    // {node: current shortest distance from start to this node}
    const distances = {};
    // {node: previous node that gets us there with the shortest distance}
    const previous = {};
    const path = []; // to return at end
    let nodeShortest;

    // Initialize the shortest distances map
    for (const node in this.adjacencyList) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;

    // Let us begin: Enqueue the start node with a priority of 0.
    pq.enqueue(startNode, 0);

    // As long as there is something to visit, i.e. there is a node remaining
    // in the node priority queue
    while (pq.items && pq.items.length > 0) {
      // Get the one with the current shortest distance from start
      nodeShortest = pq.dequeue().item;
      const nodeShortestNeighbors = this.adjacencyList[nodeShortest];
      if (nodeShortest || distances[nodeShortest] !== Infinity) {
        // For each neighboring node
        for (const neighbor of nodeShortestNeighbors) {
          let neighborId = neighbor.id;
          // Calculate new distance to this neighboring node
          let candidate = distances[nodeShortest] + neighbor.weight;
          // Check if this is smaller than what we currently have stored for that neighbor
          if (candidate < distances[neighborId]) {
            // If it is, update with the new smallest distance to neighbor
            distances[neighborId] = candidate;
            // Update previous - how we got to neighbor
            previous[neighborId] = nodeShortest;
            // Enqueue in priority queue with new priority
            pq.enqueue(neighborId, candidate);
          }
        }
      }
    }

    let current = endNode;
    while (current) {
      path.push(current);
      current = previous[current];
    }

    // return {
    //   shortestDistance: distances[endNode],
    //   path: path.reverse(),
    //   allDistances: distances,
    // };

    // Return value for the Udemy course exercise
    return [distances[endNode], path.reverse()];
  }
}

//          A
//   2/           \4
//  C --2-- D       B
//    4\   1|  3\   |3
//          F --1-- E
// Find the shortest path from A to E
var g = new WeightedGraph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "E", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

g.dijkstra("A", "E");
// result = {
//   shortestDistance: 6,
//   path: ["A", "C", "D", "F", "E"],
//   allDistances: { A: 0, B: 4, C: 2, D: 4, E: 6, F: 5 },
// };
g.dijkstra("C", "B"); // ["C", "A", "B"]

//   A --1-- B --7-- F --8-- G
//   |      4|  \1   |3
//   |2      C       E
//   |   /5
//   D
// Find the shortest path from D to G
var g = new WeightedGraph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addVertex("G");
g.addEdge("A", "B", 1);
g.addEdge("A", "D", 2);
g.addEdge("B", "C", 4);
g.addEdge("B", "E", 1);
g.addEdge("B", "F", 7);
g.addEdge("D", "C", 5);
g.addEdge("E", "F", 3);
g.addEdge("F", "G", 8);

g.dijkstra("D", "G");
// result = {
//   shortestDistance: 15,
//   path: ["D", "A", "B", "E", "F", "G"],
//   allDistances: { A: 2, B: 3, C: 5, D: 0, E: 4, F: 7, G: 15 },
// };

g.dijkstra("G", "A"); // ["G", "F", "E", "B", "A"]

// Just one more!

// Find the shortest path from D to G
var g = new WeightedGraph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addVertex("G");
g.addVertex("H");
g.addEdge("A", "B", 4);
g.addEdge("A", "C", 4);
g.addEdge("A", "D", 2);
g.addEdge("A", "E", 2);
g.addEdge("B", "C", 3);
g.addEdge("B", "H", 1);
g.addEdge("C", "D", 7);
g.addEdge("C", "H", 9);
g.addEdge("D", "E", 3);
g.addEdge("D", "G", 2);
g.addEdge("E", "F", 4);
g.addEdge("E", "G", 5);
g.addEdge("F", "G", 6);

g.dijkstra("H", "F"); // ["H", "B", "A", "E", "F"]

///////// Dijkstra Exercise in the course
var g = new WeightedGraph();

g.addVertex("A");
g.addVertex("Z");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("H");
g.addVertex("Q");
g.addVertex("G");

g.addEdge("A", "Z", 7);
g.addEdge("A", "C", 8);
g.addEdge("Z", "Q", 2);
g.addEdge("C", "G", 4);
g.addEdge("D", "Q", 8);
g.addEdge("E", "H", 1);
g.addEdge("H", "Q", 3);
g.addEdge("Q", "C", 6);
g.addEdge("G", "Q", 9);

g.dijkstra("A", "E"); // [13, ["A", "Z", "Q", "H", "E"] ]
g.dijkstra("A", "Q"); // [9, ["A", "Z", "Q"] ]
g.dijkstra("A", "G"); // [12, ["A", "C", "G"] ]
g.dijkstra("A", "D"); // [17, ["A", "Z", "Q", "D"] ]
