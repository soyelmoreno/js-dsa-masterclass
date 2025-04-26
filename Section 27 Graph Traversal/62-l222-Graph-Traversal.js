/*

Lecture 223.

Graph Traversal.

Traversing = visiting, updating, checking every vertex in a graph.

Trees: a special subset of graphs, where:
- there is only one starting point
- there is only one path to get to a node

Generic graph: 
- there is no specific staring point
- there are multiple paths to get to a node

Graph traversal use cases:
- Peer to peer networking
- Web crawlers
- Finding "closest" matches/recommendations
- Shortest path problems
  - GPS navigation
  - Solving mazes
  - AI (shortest path to win the game)

- DFS: visit children before siblings (deepening)
- BFS: visit siblings before children (broadening)

But in a graph, what is deeper vs broader? Depth means following neighbors
before backtracking.

*/

class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (vertex) => vertex !== v2
    );
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (vertex) => vertex !== v1
    );
  }
  removeVertex(vertex) {
    let cities = this.adjacencyList[vertex];
    for (const city of cities) {
      this.removeEdge(vertex, city);
    }
    delete this.adjacencyList[vertex];
  }

  // Exercise 77.
  depthFirstRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    }
    dfs(start);
    return result;
  }

  depthFirstIterative(start) {
    const visited = {};
    const result = [];
    let s = [];
    let current;

    s.push(start);
    while (s.length > 0) {
      current = s.pop();
      if (!visited[current]) {
        result.push(current);
        visited[current] = true;
        this.adjacencyList[current].forEach((neighbor) => {
          s.push(neighbor);
        });
      }
    }
    return result;
  }

  // Exercise 78
  breadthFirst(start) {
    const visited = {};
    const result = [];
    let q = [];
    let current;

    q.push(start);
    while (q.length > 0) {
      current = q.shift();
      if (!visited[current]) {
        result.push(current);
        visited[current] = true;
        this.adjacencyList[current].forEach((neighbor) => {
          q.push(neighbor);
        });
      }
    }
    return result;
  }
}

//     A
//   /   \
//  B     C
//  |     |
//  D --- E
//   \   /
//     F
var g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

g.depthFirstRecursive("A"); // ["A", "B", "D", "E", "C", "F"]
g.depthFirstIterative("A"); // ["A", "C", "E", "F", "D", "B"]
g.breadthFirst("A"); // ["A", "B", "C", "D", "E", "F"]
