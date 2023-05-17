import {componentAtomTree} from '../../types';

const generateCleanComponentAtomTree = (
    inputObj: componentAtomTree,
  ): componentAtomTree => {
    const obj = {} as componentAtomTree;
    let counter = 0;

    const innerClean = (inputObj: any, outputObj: any, counter: number = 0) => {
      if (
        (inputObj.tag === 0 || inputObj.tag === 2) &&
        inputObj.name !== 'RecoilRoot' &&
        inputObj.name !== 'Batcher' &&
        inputObj.name !== 'RecoilizeDebugger' &&
        inputObj.name !== 'CssBaseline'
      ) {
        // if the obj is empty, we do this
        if (Object.keys(obj).length === 0) {
          outputObj.children = [];
          outputObj.name = inputObj.name;
          outputObj.recoilNodes = inputObj.recoilNodes;
          outputObj.tag = inputObj.tag;
          outputObj = outputObj.children;
        }
        // create another conditional
        else {
          const deepCopy: componentAtomTree = JSON.parse(
            JSON.stringify(inputObj),
          );
          deepCopy.children = [];
          outputObj.push(deepCopy);
          if (outputObj.length > 1) {
            outputObj = outputObj[outputObj.length - 1].children;
          } else {
            outputObj = outputObj[0].children;
          }
        }
      }

      // recursive call running through the whole component atom tree -- understand this better
      for (let i = 0; i < inputObj.children.length; i++) {
        innerClean(inputObj.children[i], outputObj, counter);
      }
      return outputObj;
    };
    
    innerClean(inputObj, obj, counter);
  
    //ensure that the root element's actual duration is included in outObj
    if (inputObj.actualDuration) {
      obj.actualDuration = inputObj.actualDuration;
    }
  
    // returning the new object that we create
    return obj;
  };

  export default generateCleanComponentAtomTree;