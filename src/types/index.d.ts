// snapshot taken by recoilize module
export type stateSnapshot = {
  filteredSnapshot: filteredSnapshot;
  componentAtomTree: componentAtomTree;
  indexDiff?: number;
};

// used for the filter state hook
export type stateSnapshotDiff = {
  filteredSnapshot?: filteredSnapshotDiff;
  componentAtomTree?: componentAtomTreeDiff;
  indexDiff?: number;
}

export type filteredSnapshot = {
  // key of atom name with the value of an atom
  [atomName: string]: node;
};

export type filteredSnapshotDiff = {
  [atomName: string]: nodeDiff;
}

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

export type nodeDiff = {
  string?: string | string[];
  contents?: any;
  nodeDeps?: string[] | string[][];
  nodeToNodeSubscription?: string[] | string [][];
}

export type componentAtomTree = {
  children: object[];
  name: string;
  tag: number;
  recoilNodes: string[];
  actualDuration: number;
  treeBaseDuration: number;
  wasSuspended: boolean;
};

export type componentAtomTreeDiff = {
  children: object[] | object[][];
  name: string | string[];
  tag: number | number[];
  recoilNodes: string[] | string[][];
  actualDuration: number | number [];
  treeBaseDuration: number | number[];
  wasSuspended: boolean | boolean [];
}

//////////////////////////
// TODO BE BETTER TYPED //
//////////////////////////
export type atom = {
  [name: string]: any;
};

//////////////////////////
// TODO BE BETTER TYPED //
//////////////////////////
export type selector = {
  [name: string]: any;
};

export type selectedTypes = {
  [name: string]: string;
};
