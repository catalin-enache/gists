
// https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/

export class Subset {
  /**
   *
   * @param parent Number
   * @param rank Number
   */
  constructor(parent, rank) {
    this.parent = parent;
    this.rank = rank;
  }
}


/**
 * A utility function to find set of an element
 * node(uses path compression technique)
 * @param subsets Array<Subset>
 * @param node Number
 * @return Number
 */
export function find(subsets, node) {
  if (subsets[node].parent !== node) {
    subsets[node].parent = find(subsets, subsets[node].parent);
  }
  return subsets[node].parent;
}


/**
 * A function that does union of two sets
 * of u and v(uses union by rank)
 * @param subsets Array<Subset>
 * @param u Number
 * @param v Number
 */
export function union(subsets, u, v) {
  const uParent = find(subsets, u);
  const vParent = find(subsets, v);
  // Attach smaller rank tree under root
  // of high rank tree(Union by Rank)
  if (subsets[uParent].rank > subsets[vParent].rank) {
    subsets[vParent].parent = uParent;
    subsets[uParent].rank += 1;
  } else {
    subsets[uParent].parent = vParent;
    subsets[vParent].rank += 1;
  }
}