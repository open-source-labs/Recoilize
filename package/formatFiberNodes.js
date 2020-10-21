// node parameter should be root of the fiber node tree, can be grapped with startNode from below
// const startNode = document.getElementById('root')._reactRootContainer._internalRoot.current;

const formatFiberNodes = node => {
  const formattedNode = {
    // this function grabs a 'name' based on the tag of the node
    name: assignName(node),
    tag: node.tag,
    children: [],
    recoilNodes: createAtomsSelectorArray(node),
    actualDuration: node.actualDuration,
    treeBaseDuration: node.treeBaseDuration,
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

const createAtomsSelectorArray = node => {
  // initialize empty array for all atoms and selectors.  Elements will be all atom and selector names, as strings
  const recoilNodes = [];

  //start the pointer at node.memoizedState. All nodes should have this key.
  let currentNode = node.memoizedState;

  // Traverse through the memoizedStates and look for the deps key which holds selectors or state.
  while (currentNode) {
    // if the memoizedState has a deps key, and that deps key is an array of length 2 then the first value of that array will be an atom or selector
    if (
      currentNode.deps &&
      Array.isArray(currentNode.deps) &&
      currentNode.deps.length === 2
    ) {
      // if the atom/selector already exist in the recoilNodes array then break from this while loop. At this point you are traversing through previous atom/selector deps.
      if (recoilNodes.includes(currentNode.deps[0].key)) break;
      recoilNodes.push(currentNode.deps[0].key);

      // if an atom/selector was successfully pushed into the recoilNodes array then the pointer should now point to the next key, which will have its own deps key if there is another atom/selector
      currentNode = currentNode.next;
    } else {
      // This is the case where there is no atom/selector in the memoizedState. Look into the memoized state of the next key. If that doesn't exist then break from the while loop because there are no atoms/selectors at this point.
      if (!currentNode.next) break;
      if (!currentNode.next.memoizedState) break;
      currentNode = currentNode.next.memoizedState;
    }
  }
  return recoilNodes;
};

// keep an eye on this section as we test bigger and bigger applications SEAN
const assignName = node => {
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
  // Tag 6 === HostText
  if (node.tag === 6) return node.memoizedProps;
  // Tag 7 === Fragment
  if (node.tag === 7) return 'Fragment';
};

module.exports = {formatFiberNodes};

// if testing this function on the browser, use line below to log the formatted tree in the console
//let formattedFiberNodes = formatFiberNodes(document.getElementById('root')._reactRootContainer._internalRoot.current)
