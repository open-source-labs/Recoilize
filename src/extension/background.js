console.log('bg new');

// LISTEN for initial connection from "index"???
chrome.runtime.onConnect.addListener(port => {
  // console.log('inside inital connect on bg line 5');
  // console.log('right before port')
  // console.log(port, ' <-- do we know the port')
  // console.log('after port')
  const listenTempFunc = (msg, port) => {
    console.log('in the listenTempFunc')
    // console.log('inside line 8 of bg script')
    console.log('the msg: ', msg);
    // console.log('the port: ', port);
    // console.log('-----')
  }

  // begin LISTENING
  port.onMessage.addListener(listenTempFunc)

  // ENDS listening
  port.onDisconnect.addListener(port => {
    console.log('the port is closing');
    port.onMessage.removeListener(listenTempFunc)
  })
})

chrome.runtime.onMessage.addListener(function(msg, sender){
  // console.log('in the chrome.runtime.onmessage');
  console.log('*INSIDE*');
  console.log(msg);
  //console.log(sender);
  console.log('*INSIDE*');
  // console.log(sender);
  
  // console.log('-----')
  return true;
})