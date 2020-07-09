


// node parameter should be root of the fiber node tree, can be grapped with startNode from below
// const startNode = document.getElementById('root')._reactRootContainer._internalRoot.current;

const formatFiberNodes = (node) => {
  // initialize empty array for all atoms and selectors.  Elements will be all atom and selector names, as strings
  const recoilNodes = [];
  // function returns boolean with whether 'node' contains atoms/selector
  if (checkForAtoms(node)){
    let current = node.memoizedState;
    while (current) {
      if (current.memoizedState && Array.isArray(current.memoizedState) && typeof current.memoizedState[0] === 'function' && current.memoizedState[1].length === 2) {
        
        for ([key, value] of current.memoizedState[1][1].current) {
          recoilNodes.push(key)
        }

      }
      current = current.next;
    }
  }
  
  const formattedNode = {
    name: assignName(node),
    //recoilNodes: recoilNodes,
    tag: node.tag,
    children: []
  }

  if (recoilNodes.length) formattedNode.recoilNodes = recoilNodes;
  
  let currentNode = node.child;
  while (currentNode) {
    formattedNode.children.push(formatFiberNodes(currentNode));
    currentNode = currentNode.sibling
  }
  
  return formattedNode
  
}

function checkForAtoms(node){
  if (node.memoizedState && node.memoizedState.next && node.memoizedState.next.memoizedState && node.memoizedState.next.memoizedState.current) {
    return true;
  }
}

const assignName = (node) => {
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
  if (node.tag === 7) return "Fragment";
};

export default formatFiberNodes;


  // const convertState = (node) => {
  //   if (!node.memoizedState) return null;
  //   return {
  //     key: 'State',
  //     // Spread operator prevents unwanted circular references
  //     value: JSON.parse(JSON.stringify(node.memoizedState)),
  //     type: (node.memoizedState.memoizedState && node._debugHookTypes[0] === 'useState') ? 'hook' : 'componentState',
  //   }
  // };


// const tempNodesWithAtoms = [];
// const formatNodes = (node) => {
//   const atoms = [];
//   if (checkForAtoms(node)){
//     console.log('ever show up')
//     let current = node.memoizedState;
//     tempNodesWithAtoms.push(node);
//     while (current) {
//       if (current.memoizedState && Array.isArray(current.memoizedState) && typeof current.memoizedState[0] === 'function' && current.memoizedState[1].length === 2) {
  
//         for ([key, value] of current.memoizedState[1][1].current) {
//           atoms.push(key)
//         }
//         console.log('showing up')
//       }
//       current = current.next;
//     }
//   }
//   const formattedNode = {
//     tag: node.tag,
//     atoms: atoms,
//     sibling: null,
//     children: [node.child],
//     name: null
//   }
//   let siblingNode = node.sibling;
//   while (siblingNode){
//     formattedNode.children.push(formatNodes(node.sibling));
//     siblingNode = siblingNode.sibling;
//   }
//   if (node.child){
//     formattedNode.next = formatNodes(node.child)
//   }
//   if (node.type){
//     formattedNode.name = node.type.name
//   }
//   return formattedNode;

// }