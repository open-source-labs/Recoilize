// filterFunc compares states. if there is no change to the state, it will return false (5.2023)

/* function params:
  - i - will import counter from for loop in SnapshotContainer
  - filterData and selected are both utilized in snapshot container. these are used to compare states
*/
const filterFunc = (i, filterData, selected): boolean => {
  // i = 0 is first state, automatically no change
  if (i === 0) return true;

  // checks if the filteredSnapshot object at index i has a key (atom or selector) found in the selected array. This would indicate that there was a change to that state/selector because filter is an array of objects containing differences between snapshots.
  if (filterData[i]) {
    for (let key in filterData[i].filteredSnapshot) {
      for (let j = 0; j < selected.length; j++) {
        if (key === selected[j].name) return true;
      };
    };
  };
  return false;
};

export default filterFunc;