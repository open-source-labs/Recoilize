import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import makeRelationshipLinks from '../../utils/makeRelationshipLinks';
import {useAppSelector} from '../../state-management/hooks';
import {filteredSnapshot} from '../../../types';

const AtomNetworkVisual: React.FC = () => {
  //Retrieve snapshotHistory State from Redux Store
  const snapshotHistory = useAppSelector(
    state => state.snapshot.snapshotHistory,
  );
  const renderIndex = useAppSelector(state => state.snapshot.renderIndex);
  const filteredCurSnap = snapshotHistory[renderIndex].filteredSnapshot;
  //Retrieve atomNetworkSearch State from Redux Store
  const searchValue = useAppSelector(state => state.atomNetwork.searchValue);

  useEffect(() => {
    // new filtered snap object to be constructed with search value
    const newFilteredCurSnap: any = {};

    // filters filteredCurSnap object with atoms and selectors that includes are search value
    const filter = (filteredCurSnap: filteredSnapshot) => {
      for (let key in filteredCurSnap) {
        if (key.toLowerCase().includes(searchValue.toLowerCase())) {
          newFilteredCurSnap[key] = filteredCurSnap[key];
          grabNodeToNodeSubscriptions(newFilteredCurSnap[key]);
          grabNodeDeps(newFilteredCurSnap[key]);
        }
      }
    };

    // helper functions to recursively include searched atoms/selectors' subscriptions
    const grabNodeToNodeSubscriptions = (node: any) => {
      let nodeSubscriptionLength = node.nodeToNodeSubscriptions.length;
      if (nodeSubscriptionLength > 0) {
        for (let i = 0; i < nodeSubscriptionLength; i += 1) {
          let currSN = node.nodeToNodeSubscriptions[i];
          newFilteredCurSnap[currSN] = filteredCurSnap[currSN];
          grabNodeToNodeSubscriptions(filteredCurSnap[currSN]);
        }
      }
    };
    const grabNodeDeps = (node: any) => {
      let nodeDepsLength = node.nodeDeps.length;
      if (nodeDepsLength > 0) {
        for (let i = 0; i < nodeDepsLength; i += 1) {
          let currDepNode = node.nodeDeps[i];
          newFilteredCurSnap[currDepNode] = filteredCurSnap[currDepNode];
          grabNodeDeps(filteredCurSnap[currDepNode]);
        }
      }
    };

    // invoke filter to populate newFilteredCurSnap
    filter(filteredCurSnap);
    document.getElementById('networkCanvas').innerHTML = '';

    let edgepaths: any;
    let edgelabels: any;

    const networkContainer = document.querySelector('.networkContainer');
    const width = networkContainer.clientWidth;
    const height = networkContainer.clientHeight;

    // snap will be newFilteredCurSnap if searchValue exists, if not original
    let snap: any = searchValue ? newFilteredCurSnap : filteredCurSnap;

    // TRANSFORM DATA INTO D3 SUPPORTED FORMAT FOR NETWORK GRAPH
    const networkData: any = makeRelationshipLinks(snap);

    //Create Disjoint Force-Directed Graph

    const chart = (data: any) => {
      const links = data.links.map((d: any) => Object.create(d));
      const nodes = data.nodes.map((d: any) => {
        return Object.create(d);
      });

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3.forceLink(links).id((d: any) => d.id),
        )
        .force('charge', d3.forceManyBody())
        .force('x', d3.forceX())
        .force('y', d3.forceY());

      const svg = d3
        // .create('svg')
        .select('#networkCanvas')
        .attr('viewBox', [-width / 2, -height / 2, width, height]);

      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', (d: any) => Math.sqrt(d.value));

      const node = svg
        .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 5)
        .style('fill', function (d: any, i: any) {
          return d.name === 'Atom' ? '#9580FF' : '#FF80BF';
        });

      node
        .append('title')
        .attr('dx', 12)
        // .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .text((d: any) => d.label)
        .attr('stroke', 'white')
        .attr('stroke-width', 3);

      node
        .append('text')
        .attr('dx', 12)
        .attr('dy', '.35em')
        .text(function (d: any) {
          return d.name;
        });

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
      });

      simulation.alpha(1).restart();

      return svg.node();
    };

    chart(networkData);
  }); //end of useEffect

  return (
    <div className="Network">
      <svg data-testid="networkCanvas" id="networkCanvas"></svg>
    </div>
  );
};

export default AtomNetworkVisual;
