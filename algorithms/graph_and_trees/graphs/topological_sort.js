// O(n + m) // n vertices, m edges
export function topologicalSort(graph) {
  // Return a list of verticies of directed acyclic graph g in topological order.
  // If graph g has a cycle, the result will be incomplete.
  const topo = []; // a list of vertices placed in topological order
  const ready = []; // list of vertices that have no remaining constraints
  const inCount = new Map(); // keep track of in-degree for each vertex

  for (const vertex of graph.vertices) {
    const incomingEdges = graph.getIncidentEdges(vertex, false).size;
    inCount.set(vertex, incomingEdges);
    // if u has no incoming edges, it is free of constraints
    if (!incomingEdges) { ready.push(vertex); }
  }

  while(ready.length) {
    const vertex = ready.pop(); // u is free of constraints
    topo.push(vertex); // add u to the topological order

    for (const [v, _] of graph.getIncidentEdges(vertex)) { // consider all outgoing neighbors of u
      inCount.set(v, inCount.get(v) - 1); // v has one less constraint without u
      if (inCount.get(v) === 0) {
        ready.push(v);
      }
    }
  }

  return topo;
}