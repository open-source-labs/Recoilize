// the functionality of this and prevClr seem to be broken? moved to separate file to simplify snapshot container file

function fwrdClr(renderIndex) {
  const snapshotListArr = document.querySelectorAll('.individualSnapshot');

  for (let i = snapshotListArr.length - 1; i >= 0; i--) {
    let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);

    if (index > renderIndex) {
      snapshotListArr[i].parentNode.removeChild(snapshotListArr[i]);
    } else break;
  };
};

export default fwrdClr;