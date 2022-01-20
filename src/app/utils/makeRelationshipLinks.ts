type relationships = {
  nodes: any[];
  links: any[];
};

type caches = {
  [key: string]: any;
};

const makeRelationshipLinks = (obj: any) => {
  const relationships: relationships = {nodes: [], links: []};
  if (!obj) return relationships;

  // relationships.nodes = makeNodes(obj);

  // to help with O(1) look up for nodeKeys & target => source combinations
  const nodeCache: caches = {};
  const sourceTargetCache: caches = {};

  // loops and push nodes into nodes array
  relationships.nodes = Object.keys(obj).map((nodeKey, index) => {
    nodeCache[nodeKey] = index;

    // make the node object and properties
    const objToReturn = {
      name: obj[nodeKey].type === 'RecoilState' ? 'Atom' : 'Selector',
      label: nodeKey,
      id: index,
    };
    if (objToReturn.name === 'Atom') {
      if (obj[nodeKey].nodeDeps.length) {
        objToReturn.name = 'Selector';
      }
    }
    return objToReturn;
  });

  // loops node Data and push links into array
  Object.keys(obj).forEach((nodeKey, _index) => {
    // check all nodeToNode subscriptions (atoms to selectors)
    obj[nodeKey].nodeToNodeSubscriptions.forEach(
      (nodeToNodeSubscription: any) => {
        const targetSource = `${nodeCache[nodeKey]}${nodeCache[nodeToNodeSubscription]}`;

        if (
          nodeCache[nodeToNodeSubscription] &&
          !sourceTargetCache[targetSource]
        ) {
          sourceTargetCache[targetSource] = true;
          relationships.links.push({
            source: nodeCache[nodeKey],
            target: nodeCache[nodeToNodeSubscription],
          });
        }
      },
    );

    // check all nodeDeps subscriptions (selectors to atoms)
    obj[nodeKey].nodeDeps.forEach((nodeDeps: any) => {
      const targetSource = `${nodeCache[nodeDeps]}${nodeCache[nodeKey]}`;

      if (nodeCache[nodeDeps] && !sourceTargetCache[targetSource]) {
        sourceTargetCache[targetSource] = true;
        relationships.links.push({
          source: nodeCache[nodeDeps],
          target: nodeCache[nodeKey],
        });
      }
    });
  });

  return relationships;
};

export default makeRelationshipLinks;
