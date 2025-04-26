/*

Lecture 214.

Graphs

We are building an undirected graph.

*/

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Exercise 73.
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  // Exercise 74.
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  // Exercise 75.
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (vertex) => vertex !== v2
    );
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (vertex) => vertex !== v1
    );
  }

  // Exercise 76.
  removeVertex(vertex) {
    let cities = this.adjacencyList[vertex];
    for (const city of cities) {
      this.removeEdge(vertex, city);
    }
    delete this.adjacencyList[vertex];
  }
}

var g = new Graph();
g.addVertex("Dallas");
g.addVertex("Tokyo");
g.addVertex("Aspen");
g.addVertex("Los Angeles");
g.addVertex("Hong Kong");
g.addEdge("Dallas", "Tokyo");
g.addEdge("Dallas", "Aspen");
g.addEdge("Hong Kong", "Tokyo");
g.addEdge("Hong Kong", "Dallas");
g.addEdge("Los Angeles", "Hong Kong");
g.addEdge("Los Angeles", "Aspen");

// g.removeEdge("Tokyo", "Dallas");
g.removeVertex("Hong Kong");
