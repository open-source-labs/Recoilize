<meta name='keywords' content='Recoil, Recoil.js, Recoil Dev Tool, Recoilize, Chrome Dev Tool, Recoil Chrome'>

<p align='center'>
<img src='./src/extension/build/assets/Recoilize.png' width=150rem>
</p>

<h1 align='center'>
Recoilize
</h1>

<p>
Recoilize is a debugger tool for application that use the state management library Recoil (ADD LINK TO RECOIL LANDING PAGE OR CHROME DEV STORE)
</p>

<h1>
** NOTE: STILL IN BETA **
</h1>

<h1 align='center'>
Installation
</h1>

#### Install Recoilize Module

```js
npm install recoilize
```

#### ** IMPORTANT **

#### Inject the Recoilize module into the RecoilRoot of your application

##### Must import all Atoms and Selectors and pass them into the Recoilize component as shown below

```js
ReactDOM.render(
  <RecoilRoot>
    <Recoilize nodes={nodes} />
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
);
```

#### Install Recoilize from Chrome Dev Tools

#### Open your application on the Chrome Browser and start debugging with Recoilize!

### Supported only with Recoil applications

<h2 align='center'> 
We will keep updating Recoilize alongside the updates from the Recoil.js team!
</h2>

<h1>
 Contributors
</h1>

<h4>Bren Yamaguchi <a href='https://github.com/brenyama'>@brenyama</a></h4>

<h4>Saejin Kang <a href='https://github.com/skang1004'>@skang1004</a></h4>

<h4>Jonathan Escamilla <a href='https://github.com/jonescamilla'>@jonescamilla</a> </h4>

<h4>Sean Smith <a href='https://github.com/SmithSean17'>@SmithSean17</a> </h4>
