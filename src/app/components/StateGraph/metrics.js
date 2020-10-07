// import React, { useState } from 'react';
// import { hierarchy } from 'd3-hierarchy';
// import { ParentSize } from '@vx/responsive';
// import IcicleVertical from './IcicleVertical';
// import {componentAtomTree} from '../../../types';

// interface VisualizerProps {
//   componentAtomTree: componentAtomTree;
// }

// // const root = hierarchy(data)
// //   .sum(d => d.size);

// const root = hierarchy(data)
//   .eachBefore(
//     d => (d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name)
//   )
//   .sum(d => d.size)
//   .sort((a, b) => b.value - a.value);

// export default function Metrics() {
//   const [layout, setLayout] = useState('horizontal');

//   return (
//     <div>
//       <span>Test</span>
//       <div
//         style={{
//           display: 'inline-grid',
//           gridGap: 8,
//           gridAutoFlow: 'column',
//           gridAutoColumns: 'auto'
//         }}
//       >
//         <label>
//           <input
//             type="radio"
//             checked={layout === 'vertical'}
//             onChange={() => setLayout('vertical')}
//           />
//           Vertical
//         </label>
//         <label>
//           <input
//             type="radio"
//             checked={layout === 'horizontal'}
//             onChange={() => setLayout('horizontal')}
//           />
//           Horizontal
//         </label>
//       </div>

//       <ParentSize>
//         {size =>
//           size.ref &&
//           <IcicleVertical root={root} width={size.width} height={600} />
//         }
//       </ParentSize>
//     </div>
//   );
// }

