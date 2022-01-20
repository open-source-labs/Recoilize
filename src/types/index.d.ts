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
};

export type filteredSnapshot = {
  // key of atom name with the value of an atom
  [atomName: string]: node;
};

export type filteredSnapshotDiff = {
  [atomName: string]: nodeDiff;
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

export type nodeDiff = {
  string?: string | string[];
  contents?: any;
  nodeDeps?: string[] | string[][];
  nodeToNodeSubscription?: string[] | string[][];
};

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
  actualDuration: number | number[];
  treeBaseDuration: number | number[];
  wasSuspended: boolean | boolean[];
};

export type dataDuration = {
  [name: string]: any;
};

export type dataDurationArr = dataDuration[];

//! not possible to be typed better
// atom is an object consisting of
// atom state names and their values.
// Since state can be anything (num, bool, str, etc.)
// it's impossible to say what properties
// atom can hold other than some generic key name and
// a type of any
export type atom = {
  [name: string]: any;
};

//! not possible to be typed better
// selector is an object consisting of
// selector state names and their values.
// Since state can be anything (num, bool, str, etc.)
// it's impossible to say what properties
// selector can hold other than some generic key name and
// a type of any
export type selector = {
  [name: string]: any;
};

export type selectedTypes = {
  [name: string]: string;
};
