/*

Lecture 235.

Weighted graph.



*/

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
}

//     A
//   /   \
//  C     B
//  |     |
//  D --- E
//   \   /
//     F
var g = new WeightedGraph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
// g.addVertex("D");
// g.addVertex("E");
// g.addVertex("F");
g.addEdge("A", "B", 9);
g.addEdge("A", "C", 5);
g.addEdge("B", "C", 7);
