import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import '../../../styles/index.css';

const StyledNetworkPlot = styled.div`
    line{
        fill: none;
        stroke: var(--main-color-lighter);
        stroke-opacity: 0.5;
    }

    circle {
        opacity: 1;
    }
    font-size: 16px;
    display: ${(props) => props.display};
`;

const NetworkPlot = (props) => {
  const {
    nodes, links, plotId, hidden,
  } = props;
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    const margin = {
      top: 20,
      right: 200,
      bottom: 90,
      left: 70,
    };

    const width = 900;
    const height = 800;

    const color = d3.scaleOrdinal(d3.schemeTableau10);


    const scale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, 0.5]);

    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .append('g')
      .attr('transform',
        `translate(${svgWidth / 2 - scale(width / 2)},${svgHeight / 2 - scale(height)})`);

    // Initialize a simulation
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d.name)) // push links together or apart according to distance
      .force('charge', d3.forceManyBody().strength(-1000)) // force applied mutually amongst all nodes
      .force('center', d3.forceCenter(width / 2, height / 2)) // mean position of nodes
      .force('y', d3.forceY().y((d) => 0)); // positioning on the y axis

    // edges of network
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => d.thickness);

    // nodes of network
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g');

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

    // add draggable circle for each node
    const circles = node.append('circle')
      .attr('r', (d) => 50)
      .attr('fill', (d) => color(d.value))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // label for each node
    const labels = node.append('text')
      .text((d) => d.name)
      .attr('x', 0)
      .attr('y', 3)
      .attr('font-size', (d) => 15)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white');

    // tooltip
    const tooltip = d3.select(`#${plotId}`)
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('color', 'white')
      .style('padding', '0px 10px')
      .style('background', '#02577b')
      .style('border-radius', '12px')
      .text('hehe'); // it changes, don't worry

    // handle tooltip for nodes
    circles.on('mouseover', (d) => {
      tooltip.text(`${d.name}: ${d.value} publications`).style('visibility', 'visible');
    })
      .on('mousemove', () => {
        tooltip.style('top', `${d3.event.pageY - 20}px`).style('left', `${d3.event.pageX + 20}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // handle tooltip for edges
    link.on('mouseover', (d) => {
      tooltip.text(`${d.name}: ${d.value} collaboration${d.value === 1 ? '' : 's'}`).style('visibility', 'visible');
    })
      .on('mousemove', () => {
        tooltip.style('top', `${d3.event.pageY - 20}px`).style('left', `${d3.event.pageX + 20}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    function ticked() {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('transform', (d) => `translate(${d.x},${d.y})`);
    }

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation.force('link')
      .links(links)
      .distance(400);

    // unmount network
    return function cleanup() {
      console.log(d3.select(`#${plotId}`));
      d3.select(`#${plotId}`).remove();
    };
  }, []);

  useEffect(() => {
    if (hidden) {
      setDisplay('none');
    } else {
      setDisplay('block');
    }
  }, [hidden]);

  return (
    <StyledNetworkPlot display={display}>
      <div id={plotId} className="plot" />
    </StyledNetworkPlot>
  );
};

export default NetworkPlot;
