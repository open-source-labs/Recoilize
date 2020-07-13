// snapshot taken by recoilize module
export type stateSnapshot = {
  //
  filteredSnapshot: filteredSnapshot;
  componentAtomTree: componentAtomTree;
};

export type filteredSnapshot = {
  // key of atom name with the value of an atom
  [atomName: string]: node;
};

// object of either atom or selector
export type node = {
  // recoil defined string that determines wether an atom or selector distinguished by 'RecoilState' or 'RecoilValueReadOnly'
  type: string;
  // user defined node state
  contents: any;
  // current node is dependent on this array
  nodeDeps: string[];
  // current node is a dependency for the array of nodes
  nodeToNodeSubscription: string[];
};

export type componentAtomTree = {
  children: object[];
  name: string;
  tag: number;
};
