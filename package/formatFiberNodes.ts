// node parameter should be root of the fiber node tree, can be grapped with startNode from below
// const startNode = document.getElementById('root')._reactRootContainer._internalRoot.current;

type node = {
  tag: number;
  key: any;
  elementType: string;
  child: any;
  sibling: any;
  actualDuration: number;
  treeBaseDuration: number;
  return: any;
  memoizedState?: any;
  type?: any;
  memoizedProps?: any;
};

type formattedNode = {
  name: string;
  tag: number;
  children: any[];
  recoilNodes: any[];
  // adding in render time for fiber node
  actualDuration: number;
  treeBaseDuration: number;
  wasSuspended: boolean;
};

const formatFiberNodes = (node: node) => {
  const formattedNode: formattedNode = {
    actualDuration: node.actualDuration,
    treeBaseDuration: node.treeBaseDuration,
    // this function grabs a 'name' based on the tag of the node
    name: assignName(node),
    tag: node.tag,
    children: [],
    recoilNodes: createAtomsSelectorArray(node),
    wasSuspended: node.return && node.return.tag === 13 ? true : false,
  };

  // loop through and recursively call all nodes to format their 'sibling' and 'child' properties to our desired tree shape
  let currentNode = node.child;
  while (currentNode) {
    formattedNode.children.push(formatFiberNodes(currentNode));
    currentNode = currentNode.sibling;
  }

  return formattedNode;
};

const createAtomsSelectorArray = (node: any): any[] => {
  // initialize empty array for all atoms and selectors.  Elements will be all atom and selector names, as strings
  const recoilNodes: any[] = [];

  //start the pointer at node.memoizedState. All nodes should have this key.
  let currentNode = node.memoizedState;

  // Traverse through the memoizedStates and look for the deps key which holds selectors or state.

  while (currentNode) {
    // if the memoizedState has a deps key, and that deps key is an array
    // then the first value of that array will be an atom or selector
    if (
      typeof currentNode === 'object' &&
      currentNode.hasOwnProperty('memoizedState') &&
      typeof currentNode.memoizedState === 'object' &&
      currentNode.memoizedState !== null &&
      !Array.isArray(currentNode.memoizedState) &&
      currentNode.memoizedState.hasOwnProperty('deps')
    ) {
      if (
        Array.isArray(currentNode.memoizedState.deps) &&
        typeof currentNode.memoizedState.deps[0] === 'object' &&
        currentNode.memoizedState.deps[0] !== null
      ) {
        // if recoilNodes (arr) includes the current atom or selector
        if (!recoilNodes.includes(currentNode.memoizedState.deps[0].key)) {
          // otherwise push atom/selector to recoilNodes
          recoilNodes.push(currentNode.memoizedState.deps[0].key);
        }
      }
    }
    // move onto next node
    currentNode = currentNode.next;
  }
  return recoilNodes;
};

// keep an eye on this section as we test bigger and bigger applications
const assignName = (node: any) => {
  // Returns symbol key if $$typeof is defined. Some components, such as context providers, will have this value.
  if (node.type && node.type.$$typeof) return Symbol.keyFor(node.type.$$typeof);
  // Return suspense if tag is equal to 13, which is associated with Suspense components.
  if (node.tag === 13) return 'Suspense';
  // Find name of a class component
  if (node.type && node.type.name) return node.type.name;
  // Tag 5 === HostComponent
  if (node.tag === 5) return `${node.type}`;
  // Tag 3 === HostRoot
  if (node.tag === 3) return 'HR';
  // Tag 3 === HostText
  if (node.tag === 6) {
    return node.memoizedProps;
  }
  if (node.tag === 7) return 'Fragment';
};

export default formatFiberNodes;

// if testing this function on the browser, use line below to log the formatted tree in the console
//let formattedFiberNodes = formatFiberNodes(document.getElementById('root')._reactRootContainer._internalRoot.current)
