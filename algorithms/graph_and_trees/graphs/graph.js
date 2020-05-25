
class Vertex {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return `Vertex ${this.value}`;
  }
}

class Edge {
  constructor(u, v, value) {
    this.u = u;
    this.v = v;
    this.value = value;
  }

  opposite(v) {
    return v === this.u ? this.v : this.u;
  }

  toString() {
    return `Edge <${this.u}, ${this.v}> ${this.value}`;
  }
}

export class Graph {
  constructor(isDirected = false) {
    this.outgoing = new Map();
    this.incoming = isDirected ? new Map() : this.outgoing;
  }

  get isDirected() {
    return this.outgoing !== this.incoming;
  }

  addVertex(data) {
    const vertex = new Vertex(data);
    this.outgoing.set(vertex, new Map());
    if (this.isDirected) this.incoming.set(vertex, new Map());
    return vertex;
  }

  addEdge(u, v, value) {
    const edge = new Edge(u, v, value);
    this.outgoing.get(u).set(v, edge);
    this.incoming.get(v).set(u, edge);
    return edge;
  }

  get vertices() {
    return [...this.outgoing.keys()];
  }

  get transpose() {
    const graph = new Graph(true);

    for (const i of this.outgoing.keys()) {
      graph.incoming.set(i, new Map());
    }

    for (const j of this.incoming.keys()) {
      graph.outgoing.set(j, new Map());
    }

    for (const i of this.outgoing.keys()) {
      for (const j of this.outgoing.get(i).keys()) {
        graph.addEdge(j, i, null);
      }
    }

    return graph;
  }

  get edges() {
    return [...new Set(
      [...this.outgoing.entries()]
      .flatMap(
        ([k, incidentEdges]) => [...incidentEdges.entries()]
          .map(([v, edge]) => edge)
      )
    )];
  }

  getEdge(u, v) {
    return (this.outgoing.get(u) || new Map()).get(v);
  }

  getIncidentEdges(v, outGoing = true) {
    return (outGoing ? this.outgoing : this.incoming).get(v)
  }

  getDegree(v, outGoing = true) {
    return this.getIncidentEdges(v, outGoing).size;
  }
}
