console.log('this is the content script refreshed');

const sendMessage = (message) => {
  console.log('in the send message in the content script');
  console.log('*');
  console.log('        ', message, ' <-- message');
  console.log('*');

  chrome.runtime.sendMessage(message);
};

// Listening for message from injected script - inject.js
window.addEventListener('message', (e) => {
  //console.log('what do i look like in the window event listener?')
  // console.log(e.data, ' <--- e.data')
  // console.log('----')
  // Making sure the event listened too is from the window
  sendMessage(e.data);
});
