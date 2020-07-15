// node parameter should be root of the fiber node tree, can be grapped with startNode from below
// const startNode = document.getElementById('root')._reactRootContainer._internalRoot.current;

type node = {
  tag: number;
  key: any;
  elementType: string;
  child: any;
  sibling: any;
};

type formattedNode = {
  name: string,
  tag: number,
  children: any[];
  recoilNodes: any[];
}

const formatFiberNodes = (node: node) => {
  const formattedNode: formattedNode = {
    // this function grabs a 'name' based on the tag of the node
    name: assignName(node),
    tag: node.tag,
    children: [],
    recoilNodes: createAtomsSelectorArray(node),
  };

  // loop through and recursively call all nodes to format their 'sibling' and 'child' properties to our desired tree shape
  let currentNode = node.child;
  while (currentNode) {
    formattedNode.children.push(formatFiberNodes(currentNode));
    currentNode = currentNode.sibling;
  }

  return formattedNode;
};

const createAtomsSelectorArray = (node: any) => {
  // initialize empty array for all atoms and selectors.  Elements will be all atom and selector names, as strings
  const recoilNodes = [];
  // function that returns boolean with whether 'node' contains atoms or selectors
  if (checkForAtoms(node)) {
    let current = node.memoizedState;
    // loop through all memoizedStates in currentNode
    while (current) {
      // this is based on the way recoil atoms and selectors are showing in the window.  Currently best way to grab all names of atoms and selectors
      if (
        current.memoizedState &&
        Array.isArray(current.memoizedState) &&
        typeof current.memoizedState[0] === 'function' &&
        current.memoizedState[1].length === 2
      ) {
        // current.memoizedState[1][1].current is a Map that contains the a key, the key is the name of every atom/selector in that fiber node, that key is a string
        for (let [key, value] of current.memoizedState[1][1].current) {
          recoilNodes.push(key);
        }
      }
      current = current.next;
    }
  }
  return recoilNodes;
};

const checkForAtoms = (node: any) => {
  if (
    node.memoizedState &&
    node.memoizedState.next &&
    node.memoizedState.next.memoizedState &&
    node.memoizedState.next.memoizedState.current
  ) {
    return true;
  }
  return false;
};

// keep an eye on this section as we test bigger and bigger applications SEAN
const assignName = (node: any) => {
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
