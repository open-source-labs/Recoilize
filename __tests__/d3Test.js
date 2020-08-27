import * as d3 from 'd3';

describe('The canvas ', () => {
  const getCanvas = () => {
    return d3.select('#canvas')
  }
  it('should be created ', () => {
    expect(getCanvas()).not.toBeNull();
  })
});