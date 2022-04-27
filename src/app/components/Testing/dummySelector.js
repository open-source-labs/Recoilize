import {atom, selector} from 'recoil';

export const dummySelector = selector({
  key: 'dummySelector',
  get: ({ get }) => {return},
  set: ({ set }) => {return}
});

export const dummyAtom = atom({
  key: 'dummyAtom',
  default: 'I am not a real atom'
})