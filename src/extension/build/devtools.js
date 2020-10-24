// The initial script that loads the extension into the DevTools panel.
chrome.devtools.panels.create(
  'Recoilize', // title of devtool panel
  '../assets/covalent-recoil-logo.jpg', // icon of devtool panel
  'panel.html', // html of devtool panel
);
