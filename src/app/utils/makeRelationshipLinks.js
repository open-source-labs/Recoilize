const makeRelationshipLinks = obj => {
  const relationships = {nodes: [], links: []};

  if (!obj) return relationships;

  // relationships.nodes = makeNodes(obj);

  // to help with O(1) look up for nodeKeys & target => source combinations
  const nodeCache = {};
  const sourceTargetCache = {};

  // loops and push nodes into nodes array
  relationships.nodes = Object.keys(obj).map((nodeKey, index) => {
    nodeCache[nodeKey] = index;

    // make the node object and properties
    return {
      name: obj[nodeKey].type === 'RecoilState' ? 'Atom' : 'Selector',
      label: nodeKey,
      id: index,
    };
  });

  // loops node Data and push links into array
  Object.keys(obj).forEach((nodeKey, index) => {
    // check all nodeToNode subscriptions (atoms to selectors)
    obj[nodeKey].nodeToNodeSubscriptions.forEach(nodeToNodeSubscription => {
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
    });

    // check all nodeDeps subscriptions (selectors to atoms)
    obj[nodeKey].nodeDeps.forEach(nodeDeps => {
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

module.exports = {makeRelationshipLinks};
