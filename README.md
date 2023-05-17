<meta name='keywords' content='Recoil, Recoil.js, Recoil Dev Tool, Recoilize, Chrome Dev Tool, Recoil Chrome'>

<p align='center'>
<img src='./src/extension/build/assets/cover-photo-logo-recoilize.jpg' width=100%>
</p>

# Dev Tool for Recoil Applications

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oslabs-beta/Recoilize/blob/staging/LICENSE) [![npm version](https://img.shields.io/npm/v/recoilize)](https://www.npmjs.com/package/recoilize) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

[Korean README 한국어](README_KO.md) (this README is not up to date with the latest README)

<br />

# About

Recoilize is a Chrome Dev Tool designed for debugging applications built with the Recoil.js state management library.

The tool records Recoil state and allows users to easily debug their applications with features such as: time travel to previous states, visualization of the component graph and display of the atom selector network.

<br />

Download Recoilize from the [Chrome Store](https://chrome.google.com/webstore/detail/recoilize/jhfmmdhbinleghabnblahfjfalfgidik)


Visit the Recoilize [landing page](https://www.recoilize.io/) to demo


<br />
<br />

# Installation
## Standard Installation:
<br />

Install Recoilize Module (only available as an npm package)
```js
npm install recoilize
```
<br />

Import RecoilizeDebugger from the Recoilize module

```js
import RecoilizeDebugger from 'recoilize';
```
<br />

Integrate RecoilizeDebugger as a React component within the recoil root:

```js
import RecoilizeDebugger from 'recoilize';
import RecoilRoot from 'recoil';

root.render(
  <RecoilRoot>
    <RecoilizeDebugger />
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
);
```

*Please note, Recoilize assumes that the HTML element used to inject your React application **has an ID of 'root'**. If it does not, the HTML element must be passed in as an attribute called 'root' to the RecoilizeDebugger component*

**Example:**

```js
import RecoilizeDebugger from 'recoilize';
import RecoilRoot from 'recoil';

//If your app injects on an element with ID of 'app'
const app = document.getElementById('app');

root.render(
  <RecoilRoot>
    <RecoilizeDebugger root={app} />
    <App />
  </RecoilRoot>,
  app,
);
```
<br />
<br />


## Using Next.js:
In order to integrate Next.js applications with RecoilizeDebugger, follow the example below. 

```js
//If your application uses Next.js modify the _app.js as follows
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {

  const [root, setRoot] = useState(null)
  const RecoilizeDebugger = dynamic(
	() => {
	  return import('recoilize');
	},
	{ ssr: false}
  );

  useEffect(() => {

    if (typeof window.document !== 'undefined') {
      setRoot(document.getElementById('__next'));
    }
  }, [root]);
 
  return (
    <>
    <RecoilRoot>
      <RecoilizeDebugger root = {root}/>
      <Component {...pageProps} />
    </RecoilRoot>
    </>
  );
}


export default MyApp;

```
<br />
<br />

Once you have completed the steps above, open your application in Chrome and you're ready to start debugging with Recoilize!

<br />

##### (Only supported with React applications using Recoil as state management)

<br />
<br />

# Updates for Version 4.0.0

### <u>Support for Recoil 0.1.3</u>

Recoilize now supports the most recent update to the Recoil library and is backwards compatible with older versions of Recoil.

<br />

### <u>Time Travel with ease</u>

If you had used Recoilize before, you would have noticed an annoying bug that sometimes breaks the app and won’t allow you to be productive. With the new version of Recoilize, that issue is forever gone. Users can now use the tool with confidence and worry-free.

The main mission of Recoilize 3.0 is to make it more user-friendly, so you will enjoy our brand new time travel feature — the time travel slider! Why click and scroll through snapshots when you can do it with a slider and some buttons, right?




<br />

<p align='center'> 
<img src='./src/extension/build/assets/timeslider-gif.gif' width=600 height=300/>
</p>

<br />

### <u>Customizable Component Graph</u>

This is one of the coolest updates of Recoilize 3.0. We understand that different users have different ways of thinking and visualizing, and for that reason, the component tree now is fully customizable. You can expand or collapse the components, choose vertical or horizontal displays or adjust the spacing between elements.

<br />

<p align='center'> 
<img src='./src/extension/build/assets/componentTree-gif.gif' width=600 height=300/>
</p>

<br />

### <u>Better User Experience with Atom Network</u>

The atom network is one of the key features that differentiate Recoil.js from other alternative state management libraries. However, the atom network will grow bigger together with the app. At some points, it will be unmanageable and hard to keep track of all of the atoms. To make this easier and pain-free, the new Atom Network will allow you to freely move and arrange them anywhere you want.

<br />

<p align='center'> 
<img src='./src/extension/build/assets/atomNetwork-gif.gif' width=600 height=300/>
</p>

<br />

# Features 
### <u>Snapshot Comparison</u>

Optimizing your app is key. Component rendering time can be difficult to keep track of if you have a long series of snapshots, and render time can vary depending on the browser and device used. Users can save a series of state snapshots and use it later to analyze and compare with the most up to date series.

<br />

<p align='center'> 
<img src='./src/extension/build/assets/snapshotcomparison-gif.gif' width=600 height=300/>
</p>


<br />

### <u>Performance Metrics</u>

In 'Metrics' tab, two graphs display component render times.

The flame graph displays the time a component took to render itself, and all of its child components. The bar graph displays the individual render times of each component.

<br />

### <u>Throttle</u>

In the settings tab, users are able to set throttle (in milliseconds) for large scale applications or any applications that changes state rapidly. The default is set at 70ms.

<br />

### <u>State Persistence</u>

Recoilize allows the users to persist their application's state through a refresh or reload. At this time, the user is able to view the previous states in the dev tool, but cannot time travel to the states before refresh.

<br />

### <u>Additional Features</u>

* legend to see relationship between component graph and state
* toggle to view raw component graph
* filter atom/selector network relationship
* filter snapshots by atom/selector keys

<br />

## We will continue updating Recoilize alongside Recoil's updates!

<br />

# Contributors

Bren Yamaguchi | [github](https://github.com/brenyama)  | [linkedin](https://www.linkedin.com/in/brenyamaguchi/)


Saejin Kang | [github](https://github.com/skang1004) | [linkedin](https://www.linkedin.com/in/saejinkang1004/)


Jonathan Escamila | [github](https://github.com/jonescamilla) | [linkedin](https://www.linkedin.com/in/jon-escamilla/)


Sean Smith | [github](https://github.com/SmithSean17) | [linkedin](https://www.linkedin.com/in/sean-smith17/)


Justin Choo | [github](https://github.com/justinchoo93) | [linkedin](https://www.linkedin.com/in/justinchoo93/)


Anthony Lin | [github](https://github.com/anthonylin198) | [linkedin](https://www.linkedin.com/in/anthony-lin/)


Spenser Schwartz | [github](https://github.com/spenserschwartz) | [linkedin](https://www.linkedin.com/in/spenser-schwartz/)


Steven Nguyen | [github](https://github.com/Steven-Nguyen-T) | [linkedin](https://www.linkedin.com/in/steven-nguyen-t/)


Henry Taing | [github](https://github.com/henrytaing) | [linkedin](https://www.linkedin.com/in/henrytaing/)


Seungho Baek | [github](https://github.com/hobaek) | [linkedin](https://www.linkedin.com/in/s2unghobaek/)


Aaron Yang | [github](https://github.com/aaronyang24) | [linkedin](https://www.linkedin.com/in/aaronyang24/)


Jesus Vargas | [github](https://github.com/jmodestov) | [linkedin](https://www.linkedin.com/in/jesus-modesto-vargas/)


Davide Molino | [github](https://github.com/davidemmolino) | [linkedin](https://www.linkedin.com/in/davide-molino/)


Taven Shumaker | [github](https://github.com/TavenShumaker) | [linkedin](https://www.linkedin.com/in/Taven-Shumaker/)


Janis Hernandez | [github](https://github.com/Janis-H) | [linkedin](https://www.linkedin.com/in/janis-h/)


Jaime Baik | [github](https://github.com/jaimebaik) | [linkedin](https://www.linkedin.com/in/jaime-baik/)


Anthony Magallanes | [github](https://github.com/amagalla) | [linkedin](https://www.linkedin.com/in/anthony-magallanes/)


Edward Shei | [github](https://github.com/calibeach) | [linkedin](https://www.linkedin.com/in/edwardshei/)


Nathan Bargers | [github](https://github.com/nbargers) | [linkedin](https://www.linkedin.com/in/nathan-bargers/)


Scott Campbell | [github](https://github.com/thisisscottcampbell) | [linkedin](https://www.linkedin.com/in/thisisscottcampbell/)


Steve Hong | [github](https://github.com/stevehong423) | [linkedin](https://www.linkedin.com/in/stevehongpa/)


Jason Lee | [github](https://github.com/j4s0n1020) | [linkedin](https://www.linkedin.com/in/jasonjml/)


Razana Nisathar | [github](https://github.com/razananisathar) | [linkedin](http://www.linkedin.com/in/razananisathar)


Harvey Nguyen | [github](https://github.com/harveynwynn) | [linkedin](https://www.linkedin.com/in/harveynwynn)


Joey Ma | [github](https://github.com/yoyoyojoe) | [linkedin](https://www.linkedin.com/in/joeyma)


Leonard Lew | [github](https://github.com/leolew97) | [linkedin](https://www.linkedin.com/in/leonardlew)


Victor Wang | [github](https://github.com/wangvwr) | [linkedin](https://www.linkedin.com/in/wangvwr)


Adam Allison | [github](https://github.com/allisonadam81) | [linkedin](https://www.linkedin.com/in/allisonadam81/)


William Chu | [github](https://github.com/wi11chu) | [linkedin](https://www.linkedin.com/in/williamchu9/)


Jordan Rice | [github](https://github.com/JordanMRice) | [linkedin](https://www.linkedin.com/in/theoriginaljordanrice/)


Ryan Wallace | [github](https://github.com/RWallie) | [linkedin](https://www.linkedin.com/in/rwallie/)


Alejandro Florez | [github](https://github.com/AlejandroFlorez) | [linkedin](https://www.linkedin.com/in/florezalejandro/)


Anne-lise Emig | [github](https://github.com/annelise08) | [linkedin](https://www.linkedin.com/in/anne-lise-emig/)


Giovana De La Cruz | [github](https://github.com/giovanacdlc) | [linkedin]()


Kasey Wolff | [github](https://github.com/kaseywolff) | [linkedin](https://www.linkedin.com/in/kaseywolff/)