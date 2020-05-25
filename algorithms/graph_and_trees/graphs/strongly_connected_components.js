
// https://www.geeksforgeeks.org/strongly-connected-components/
// http://www.personal.kent.edu/~rmuhamma/Algorithms/MyAlgorithms/GraphAlgor/strongComponent.htm

export function dfs(graph, start, discovered, collect = []) {
  collect.push(start);
  discovered.set(start, true);
  graph.getIncidentEdges(start).forEach((edge) => {
    const next = edge.opposite(start);
    if (!discovered.get(next)) {
      dfs(graph, next, discovered, collect);
    }
  });
  return collect;
}

function fillOrder(graph, v, visited = new Map(), stack = []) {
  visited.set(v, true);
  for (const opposite of graph.getIncidentEdges(v).keys()) {
    if (!visited.get(opposite)) {
      fillOrder(graph, opposite, visited, stack);
    }
  }
  stack.push(v);
  return stack;
}

export function stronglyConnectedComponents(graph, start) {
  const ssc = [];
  const graphTransposed = graph.transpose;
  const stack = fillOrder(graph, start);
  const stackCopy = [...stack];
  const visited = new Map();
  while (stack.length) {
    const i = stack.pop();
    if (!visited.get(i)) {
      ssc.push(dfs(graphTransposed, i, visited).map((vertex) => vertex.value))
    }
  }
  return { ssc, stack: stackCopy, graph: graph.edges.map((e) => e.toString()), graphTransposed: graphTransposed.edges.map((e) => e.toString()) };
}
