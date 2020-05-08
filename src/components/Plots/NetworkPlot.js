import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const StyledNetworkPlot = styled.div`
    line{
        fill: none;
        stroke: #666;
        stroke-width: 4px;
    }
`;

const NetworkPlot = (props) => {
  const { nodes, links, plotId } = props;

  useEffect(() => {
    const margin = {
      top: 20,
      right: 200,
      bottom: 90,
      left: 70,
    };

    const width = 1000;
    const height = 600;

    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.name))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('y', d3.forceY().y((d) => 0));

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g');

    const circles = node.append('circle')
      .attr('r', 60)
      .attr('fill', 'black')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    const labels = node.append('text')
      .text((d) => d.name)
      .attr('x', 0)
      .attr('y', 3)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white');

    // hover
    node.append('title')
      .text((d) => d.name);

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation.force('link')
      .links(links)
      .distance(400);

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('transform', (d) => `translate(${d.x},${d.y})`);
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return function cleanup() {
      d3.select(`#${plotId}`).remove();
    };
  }, []);
  return (
    <StyledNetworkPlot>
      <div id={plotId} className="plot" />
    </StyledNetworkPlot>
  );
};

export default NetworkPlot;
