<h1 align='center'>
Recoilize
</h1>
<p>
Recoilize is a debugger tool for application that use the state management library Recoil (ADD LINK TO RECOIL LANDING PAGE OR CHROME DEV STORE)
</p>

<h1 align='center'>
Installation
</h1>

#### Install Recoilize Module

```js
npm install recoilize
```

#### Inject Recoilize into the root your Recoil Application

#### ** IMPORTANT **

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

#### Contributors

##### Bren Yamaguchi @brenyama

##### Saejin Kang @skang1004

##### Jonathan Escamilla @jonescamilla

##### Sean Smith @SmithSean17
