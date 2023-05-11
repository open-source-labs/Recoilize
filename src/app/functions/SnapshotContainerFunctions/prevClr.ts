// the functionality of this and fwrdClr seem to be broken? moved to separate file to simplify snapshot container file

function prevClr(renderIndex) {
  const snapshotListArr = document.querySelectorAll('.individualSnapshot');

  for (let i = 0; i < snapshotListArr.length; i++) {
    let index = parseInt(snapshotListArr[i].id.match(/\d+/g)[0]);

    if (index < renderIndex) {
      snapshotListArr[i].parentNode.removeChild(snapshotListArr[i]);
    } else break;
  }
};

export default prevClr;