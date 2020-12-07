<meta name='keywords' content='Recoil, Recoil.js, Recoil Dev Tool, Recoilize, Chrome Dev Tool, Recoil Chrome'>

<p align='center'>
<img src='./src/extension/build/assets/cover-photo-logo-recoilize.jpg' width=100%>
</p>

<h1>Recoil 애플리케이션을 위한 디버깅 개발도구</h1>

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oslabs-beta/Recoilize/blob/staging/LICENSE) [![npm version](https://img.shields.io/npm/v/recoilize)](https://www.npmjs.com/package/recoilize) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

[영어 README](README.md)

<h1>Recoilize에 대해서</h1>
<p>
Recoilize는 Recoil 상태관리 라이브러리를 사용하여 만들어진 애플리케이션을 디버깅 할수있는 Chrome Dev Tool입니다.

Recoil 상태를 기록하여 유저들이 애플리케이션을 편하게 디버깅 할수 있도록 도와주는 기능들을 가지고 있습니다. 리액트 컴포넌트를 시각화 하여 그래프로 보여줌과 동시에 스냅샷을 이요하여 이전 상태로 시간이동을 가능하게 만들어줄수있는 도구입니다.

</p>
<p>
<a href='https://chrome.google.com/webstore/detail/recoilize/jhfmmdhbinleghabnblahfjfalfgidik'>크롬 스토어</a> 에서 다운로드 받으실수 있습니다.
</p>

<!-- <p>데모  <a href='https://github.com/justinchoo93/recoil-paint'>페인트 애플리케이션</a></p> -->
<p>데모를 위해서는 <a href='https://www.recoilize.io/'>Recoilize</a> 웹사이트를 방문하십시오.</p>

<h2>
** 현재는 베타 버젼입니다 **
</h2>

<p>Recoilize는 현재 베타버젼 입니다. 툴을 계속 개선하고 새로운 이슈들을 수정해 나갈것이고, 혹시 다른 버그들이나 이슈들이 나타난다면 언제든지 이슈 탭에 글을 작성하시거나 PR을 해주시면 감사하겠습니다.</p>

<h1>
설치 방법
</h1>

#### Recoilize 모듈 설치

```js
npm install recoilize
```

### ** 중요 **

#### Recoilize모듈에서 RecoilizeDebugger를 import해줘야 합니다

```js
import RecoilizeDebugger from 'recoilize';
```

####RecoilizeDebugger를 recoil root 안에 리액트 컴포넌트로 넣어야 합니다

```js
import RecoilizeDebugger from 'recoilize';
import RecoilRoot from 'recoil';

ReactDOM.render(
  <RecoilRoot>
    <RecoilizeDebugger />
    <App />
  </RecoilRoot>,
  document.getElementById('root'),
);
```

#### Recoilize는 리액트 애플리케이션을 주입시키기 위해 쓴 HTML 엘리먼트의 아이디를 'root'으로 가정합니다.아닐경우 RecoilizeDebugger에 'root'속성을 만들고 HTML 엘리먼트를 패스하십시오.

```js
import RecoilizeDebugger from 'recoilize';
import RecoilRoot from 'recoil';

//If your app injects on an element with ID of 'app'
const app = document.getElementById('app');

ReactDOM.render(
  <RecoilRoot>
    <RecoilizeDebugger root={app} />
    <App />
  </RecoilRoot>,
  app,
);
```

#### 애플리케이션을 크롬 브라우저에서 열고 Recoilize 디버깅툴을 실행하시면 됩니다.

##### (현재 Recoil을 상태관리 라이브러리로 사용하는 리액트 애플리케이션만 지원합니다.)

<h1>새로운 기능</h1>
<h3>Recoil 0.1.2를 지원합니다</h3>
<p>Recoilize는 최신 버전과 구버전의 Recoil과 호환이 됩니다</p>

<h3>스냅샷 클리어</h3>
<p>Previous와 Forward 버튼을 넣어 선택된 스냅샵의 전이나 후에 있는 스냅샷을 지울 수 있게 했습니다</p>

<h3>컴포넌트 그래프</h3>
<h4>호버</h4>
<p>그래프의 노드를 호버했을 때 안의 텍스트가 보이는 형태를 개선하였습니다</p>
<h4>atom 범례</h4>
<p>범례의 텍스트가 클릭되면 드롭다운 형태의 atom이나 selector 리스트가 보이게 하였습니다</p>
<p>드롭다운 리스트에 있는 각각의 atom이나 selector를 누를 경우 해당 atom이나 selector를 쓰는 컴포넌트가 하이라이트되도록 바꾸었습니다</p>

<h3>atom 네트워크</h3>
<h4>atom 범례</h4>
<p>범례의 텍스트가 클릭되면 드롭다운 형태의 atom이나 selector 리스트가 보이게 하였습니다</p>
<p>드롭다운 리스트에 있는 각각의 atom이나 selector를 누를 경우 관련 atom이나 selector 노드가 보이도록 했습니다</p>
<h4>그래프</h4>
<p>여러개의 그래프가 겹치지 않도록 조정하였습니다</p>
<h4>검색 창</h4>
<p>검색 창이 탐색 버튼과 겹치지 않도록 변경하였습니다</p>

<h3>Ranked 그래프</h3>
<p>애니메이션을 없애서 전과 후 상태비교가 쉽게 보이도록 바꾸었습니다</p>

<h1>기능</h1>
<h3>Concurrent 모드 지원</h3>
<p>만약 컴포넌트를 보류시키기 위해 Suspense 컴포넌트가 사용됐을 경우, 해당 컴포넌트의 노드 주위에 빨간 테두리로 표시하여 컴포넌트가 나타나기까지 지연되었음을 알려줄 것입니다</p>

<h3>퍼포먼스 측정 그래프</h3>
<p>'Metrics' 탭에 있는 두가지 그래프는 렌더링 시간을 보여줍니다</p>
<p>Flame 그래프는 각각의 컴포넌트와 자식 컴포넌트가 나타나기까지 걸린 합산된 시간을 보여주고 Ranked 그래프는 각각의 컴포넌트가 나오기까지 걸린 시간을 보여줍니다</p>

<h3>시간 이동</h3>
<p>Recoilize의 주요 기능 중 하나로, 이 도구는 사용자가 이전의 모든 스냅샷으로 이동할 수 있게 해줍니다. 각 스냅샷 옆에 있는 점프 버튼을 누르면 해당 스냅샷으로 상태를 설정하여 DOM이 변경됩니다.<p>

<p align='center'> 
<img src='./src/extension/build/assets/timeTravel.gif' width=600 height=300/>
</p>

<h3>시각화</h3>
<p>사용자는 개별 스냅샷을 클릭하여 애플리케이션 상태에 대한 시각화된 그래프를 볼수있고, 컴포넌트 트리와 다른 그래프 뿐만 아니라 State tree를 JSON 형식으로 지원합니다<p>

<p align='center'> 
<img src='./src/extension/build/assets/components.gif' width=600 height=300/>
</p>

<h3>쓰로틀링</h3>
<p>대규모 애플리케이션 또는 상태를 빠르게 변경하는 모든 애플리케이션에 대해 쓰로틀링(ms)을 설정할 수 있습니다. 기본값은 70ms로 설정되어 있습니다.<p>

<h3>상태 유지 (베타)</h3>
<p>Recoilize는 사용자가 새로 고침을 했을 경우에도 응용 프로그램의 상태를 유지할 수 있도록 해줍니다. 이때 사용자는 개발 도구에서는 이전 상태를 볼 수 있지만, 새로고침 전에 상태로의 시간 이동은 할 수 없습니다. 우리 팀은 여전히 이 기능을 완성하기 위해 노력하고 있습니다.</p>

<h3>부가 기능</h3>
<ul><li>컴포넌트 그래프에 마우스를 올렸을때 관련있는 atom과 selector들이 나타납니다</li></ul>
<ul><li>컴포넌트 그래프 안에 오른쪽 작은 창에서 관련된 상태들을 선택하여 볼  있습니다</li></ul>
<ul><li>컴포넌트 그래프 안에 Expand 버튼을 누르면 확장된 컴포넌트 그래프를 볼 수 있습니다</li></ul>
<ul><li>네트워크 그래프 안에 atom과 selector들을 볼수있고 필터링도 가능합니다.</li></ul>
<ul><li>설정탭에서 atom과 selector key를 사용하여 관련된 스냅샷들을 필터링 할 수 있습니다</li></ul>

<h2>우리는 Recoil의 업데이트와 함께 Recoilize를 계속 업데이트 할 것 입니다</h2>

<h1>
 기여
</h1>

<h4>Bren Yamaguchi <a href='https://github.com/brenyama' target="_blank">@github </a><a  href='https://www.linkedin.com/in/brenyamaguchi/' target="_blank">@linkedin</a></h4>

<h4>Saejin Kang <a  href='https://github.com/skang1004' target="_blank">@github </a><a  href='https://www.linkedin.com/in/saejinkang1004/' target="_blank">@linkedin</a></h4>

<h4>Jonathan Escamila <a  href='https://github.com/jonescamilla' target="_blank">@github </a><a  href='https://www.linkedin.com/in/jon-escamilla/' target="_blank">@linkedin</a> </h4>

<h4>Sean Smith <a  href='https://github.com/SmithSean17' target="_blank">@github </a><a  href='https://www.linkedin.com/in/sean-smith17/' target="_blank">@linkedin</a> </h4>

<h4>Justin Choo <a href='https://github.com/justinchoo93' target="_blank">@github </a><a  href='https://www.linkedin.com/in/justinchoo93/' target="_blank">@linkedin</a></h4>

<h4>Anthony Lin <a  href='https://github.com/anthonylin198' target="_blank">@github </a><a  href='https://www.linkedin.com/in/anthony-lin/' target="_blank">@linkedin</a></h4>

<h4>Spenser Schwartz <a  href='https://github.com/spenserschwartz' target="_blank">@github </a><a  href='https://www.linkedin.com/in/spenser-schwartz/' target="_blank">@linkedin</a> </h4>

<h4>Steven Nguyen <a  href='https://github.com/Steven-Nguyen-T' target="_blank">@github </a><a  href='https://www.linkedin.com/in/steven-nguyen-t/' target="_blank">@linkedin</a> </h4>

<h4>Henry Taing <a  href='https://github.com/henrytaing' target="_blank">@github </a><a  href='https://www.linkedin.com/in/henrytaing/' target="_blank">@linkedin</a> </h4>

<h4>Seungho Baek <a  href='https://github.com/hobaek' target="_blank">@github </a><a  href='https://www.linkedin.com/in/s2unghobaek/' target="_blank">@linkedin</a> </h4>

<h4>Aaron Yang <a  href='https://github.com/aaronyang24' target="_blank">@github </a><a  href='https://www.linkedin.com/in/aaronyang24/' target="_blank">@linkedin</a> </h4>

<h4>Jesus Vargas <a  href='https://github.com/jmodestov' target="_blank">@github </a><a  href='https://www.linkedin.com/in/jesus-modesto-vargas/' target="_blank">@linkedin</a> </h4>

<h4>Davide Molino <a  href='https://github.com/davidemmolino' target="_blank">@github </a><a  href='https://www.linkedin.com/in/davide-molino/' target="_blank">@linkedin</a> </h4>

<h4>Taven Shumaker <a  href='https://github.com/TavenShumaker' target="_blank">@github </a><a  href='https://www.linkedin.com/in/Taven-Shumaker/' target="_blank">@linkedin</a> </h4>

<h4>Janis Hernandez <a  href='https://github.com/Janis-H' target="_blank">@github </a><a  href='https://www.linkedin.com/in/janis-hernandez-aguilar/' target="_blank">@linkedin</a> </h4>

<h4>Jaime Baik <a  href='https://github.com/jaimebaik' target="_blank">@github </a><a  href='https://www.linkedin.com/in/jaime-baik/' target="_blank">@linkedin</a> </h4>

<h4>Anthony Magallanes <a  href='https://github.com/amagalla' target="_blank">@github </a><a  href='https://www.linkedin.com/in/anthony-magallanes/' target="_blank">@linkedin</a> </h4>

<h4>Edward Shei <a  href='https://github.com/calibeach' target="_blank">@github </a><a  href='https://www.linkedin.com/in/edwardshei/' target="_blank">@linkedin</a> </h4>
