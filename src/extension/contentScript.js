// once chrome tab connects with our content-script
window.postMessage({ action: 'contentScriptStarted' });

// Listen to messages from Recoilize module within dev webpage
window.addEventListener('message', (msg) => {
  chrome.runtime.sendMessage(msg.data);
});
