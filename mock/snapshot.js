export const filteredCurSnapMock = {
  dummyAtom1: {
    contents: {hello: [], hi: []},
    nodeDeps: [],
    nodeToNodeSubscriptions: [],
    type: 'RecoilState',
  },
  listState: {
    contents: [{text: 'list item'}, {text: 'list item'}, {text: 'list item'}],
    nodeDeps: [],
    nodeToNodeSubscriptions: ['selectorTest', 'stateLengths'],
    type: 'RecoilState',
  },
  listState2: {
    contents: [{text: 'list item'}, {text: 'list item'}, {text: 'list item'}],
    nodeDeps: [],
    nodeToNodeSubscriptions: ['stateLengths'],
    type: 'RecoilState',
  },
  selectorTest: {
    contents: 'test',
    nodeDeps: ['listState'],
    nodeToNodeSubscriptions: [],
    type: 'RecoilValueReadOnly',
  },
  stateLengths: {
    contents: 6,
    nodeDeps: ['listState', 'listState2'],
    nodeToNodeSubscriptions: [],
    type: 'RecoilValueReadOnly',
  },
};

export const filteredPrevSnapMock = {
  dummyAtom1: {
    contents: {hello: [], hi: []},
    nodeDeps: [],
    nodeToNodeSubscriptions: [],
    type: 'RecoilState',
  },
  listState: {
    contents: [{text: 'list item'}, {text: 'list item'}, {text: 'list item'}],
    nodeDeps: [],
    nodeToNodeSubscriptions: ['selectorTest', 'stateLengths'],
    type: 'RecoilState',
  },
  listState2: {
    contents: [
      {text: 'list item'},
      {text: 'list item'},
      {text: 'list item'},
      {text: 'list item'},
    ],
    nodeDeps: [],
    nodeToNodeSubscriptions: ['stateLengths'],
    type: 'RecoilState',
  },
  selectorTest: {
    contents: 'test',
    nodeDeps: ['listState'],
    nodeToNodeSubscriptions: [],
    type: 'RecoilValueReadOnly',
  },
  stateLengths: {
    contents: 6,
    nodeDeps: ['listState', 'listState2'],
    nodeToNodeSubscriptions: [],
    type: 'RecoilValueReadOnly',
  },
};

export const componentAtomTreeMock = {
  children: [
    {
      children: [],
      name: '',
      tag: 0,
    },
    {
      children: [
        {
          children: [],
          name: '',
          tag: 0,
        },
        {
          children: [
            {
              children: [],
              name: '',
              tag: 0,
            },
            {
              children: [
                {
                  children: [],
                  name: '',
                  tag: 0,
                },
              ],
              name: '',
              tag: 0,
            },
          ],
          name: '',
          tag: 0,
        },
      ],
      name: '',
      tag: 0,
    },
    {
      children: [
        {
          children: [],
          name: '',
          tag: 0,
        },
        {
          children: [],
          name: '',
          tag: 0,
        },
      ],
      name: '',
      tag: 0,
    },
  ],
  name: '',
  tag: 0,
};
