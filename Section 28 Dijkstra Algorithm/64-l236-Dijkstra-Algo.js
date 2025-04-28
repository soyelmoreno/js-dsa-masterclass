/*

Lecture 236.

Dijkstra's shortest path algorithm

Find the shortest path from A to E

1. Pick the smallest value, i.e., the shortest distance from A, to the node that
we haven't visited.

Start with this "distances" table:

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
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
  }

  // Returns an object like this:
  // {
  //   shortestDistance: number,
  //   path: ["A", "B"],
  //   allDistances: {A: 0, B: 2},
  // };

  // Naming conventions:
  // Where you see "node", it's just the letter.
  // Where you see "vertex", it's an object with the node (letter) and the weight.
  dijkstra(startNode, endNode) {
    const pq = new PriorityQueue();
    const distances = {}; // node: current shortest distance from start to this node
    const previous = {}; // node: previous node that gets us there with the shortest distance
    const path = []; // to return at end
    let smallestNode;

    // Init
    for (const node in this.adjacencyList) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;
    pq.enqueue(startNode, 0);

    // As long as there is a vertex in the vertex priority queue
    while (pq.values.length > 0) {
      // Get the one with the current shortest distance from start
      smallestNode = pq.dequeue().val;

      if (smallestNode || distances[smallestNode] !== Infinity) {
        for (const neighbor in this.adjacencyList[smallestNode]) {
          // Find a neighboring node
          let nextNode = this.adjacencyList[smallestNode][neighbor];
          // Calculate new distance to this neighboring node
          let candidate = distances[smallestNode] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          // Check if this is smaller than what we currently have stored for that neighbor
          if (candidate < distances[nextNeighbor]) {
            // If it is, update with the new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // Update previous - how we got to neighbor
            previous[nextNeighbor] = smallestNode;
            // Enqueue in priority queue with new priority
            pq.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }

    let current = endNode;
    while (current) {
      path.push(current);
      current = previous[current];
    }

    return {
      shortestDistance: distances[endNode],
      path: path.reverse(),
      allDistances: distances,
    };
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
