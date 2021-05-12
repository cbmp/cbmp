// This component is implemented from scratch using d3.js, and uses collabContainer functions
// to calculate ribbons placing.
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import '../../../styles/index.css';

const StyledCircosPlot = styled.div`
  display: ${(props) => props.display};
  margin-left: 10vw;
`;

const CircosPlot = (props) => {
  const {
    chordData, chords, maxArc, plotId, hidden,
  } = props;
  const [display, setDisplay] = useState('none');
  const nodes = chordData.chordNodes; // an array containing Name of PIs
  const arcs = chordData.chordArcs; // matrix n*n of 1s; used for equal arcs for each PI
  const data = chordData.chordLinks; // matrix n*n of #colls PIs, used as input d3.chord()
  console.log(nodes, data, arcs);

  useEffect(() => {
    const margin = {
      top: 20,
      right: 200,
      bottom: 90,
      left: 70,
    };

    const width = 900;
    const height = 800;

    const outerRadius = Math.min(width, height) * 0.55 - 60;
    const innerRadius = outerRadius * 0.87;

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const chord = d3.chord()
      .padAngle(12 / innerRadius);

    const arcChords = chord(arcs);
    const ribbons = chord(data);
    // calculating length of each node
    const totalPadding = chord.padAngle() * nodes.length; // deducting padding gaps
    const coef = ((2 * Math.PI) - totalPadding) / (nodes.length * (maxArc));
    // Calculate ribbons angles for each ribbon
    // uses circosChords calculations in collabContainer for scaling
    for (let i = 0; i < ribbons.length; i += 1) {
      const sIndex = nodes.findIndex((item) => item === chords[i].source.id);
      const tIndex = nodes.findIndex((item) => item === chords[i].target.id);
      ribbons[i].source.startAngle = chords[i].source.start * coef
                + arcChords.groups[sIndex].startAngle;
      ribbons[i].source.endAngle = chords[i].source.end * coef
                + arcChords.groups[sIndex].startAngle;
      ribbons[i].target.startAngle = chords[i].target.start * coef
                + arcChords.groups[tIndex].startAngle;
      ribbons[i].target.endAngle = chords[i].target.end * coef
                + arcChords.groups[tIndex].startAngle;
    }
    console.log(ribbons);
    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .append('g')
      .attr('transform',
        `translate(${width / 2},${width / 2})`);

    // initiate arc for the nodes (PIs)
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const group = svg.append('g')
      .attr('font-size', 16)
      .attr('font-family', 'sans-serif')
      .selectAll('g')
      .data(arcChords.groups)
      .join('g');

    // Draw the nodes (PIs) with specific colors
    group.append('path')
      .attr('fill', (d) => color(nodes[d.index]))
      .attr('d', arc);

    // Labels -> PI names
    group.append('text')
      .each((d) => { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr('dy', '.35em')
      .attr('class', 'titles')
      .attr('text-anchor', 'middle')
      .attr('transform', (d) => `rotate(${(d.angle * 180) / Math.PI - 90})`
                + `translate(${(outerRadius + innerRadius) / 2 - 5}) rotate(${d.angle < 180 ? 90 : 180})`)
      .text((d, i) => nodes[i])
      .style('fill', 'white');

    // initiate ribbons
    const ribbon = d3.ribbon()
      .radius(innerRadius);

    // initiate tooltip
    const tooltip = d3.select(`#${plotId}`)
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('color', 'white')
      .style('opacity', '0.9')
      .style('padding', '0px 10px')
      .style('background', '#001315')
      .style('border-radius', '1px')
      .text('hehe'); // it changes, don't worry

    // Draw ribbons and tooltips
    svg.append('g')
      .attr('fill-opacity', 0.8)
      .selectAll('path')
      .data(ribbons)
      .join('path')
      .style('mix-blend-mode', 'multiply')
      .attr('fill', '#13708d')
      .attr('opacity', '0.6')
      .attr('d', ribbon)
      .on('mouseover', (d) => {
        tooltip.text(`${nodes[d.source.index]} + ${nodes[d.target.index]}: ${d.source.value} publications`)
          .style('visibility', 'visible');
      })
      .on('mousemove', () => {
        tooltip.style('top', `${d3.event.pageY - 20}px`).style('left', `${d3.event.pageX + 20}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // Labels -> value numbers
    // Labels for sources
    svg.append('g')
      .selectAll('text')
      .each((d) => { d.sourceAngle = (d.source.startAngle + d.source.endAngle) / 2; })
      .data(ribbons)
      .join('text')
      .attr('dy', '.1em')
      .attr('class', 'titles')
      .attr('text-anchor', 'middle')
      .each((d) => { d.angle = (d.source.startAngle + d.source.endAngle) / 2; })
      .attr('transform', (d) => `rotate(${((d.angle) * 180 / Math.PI - 90)})`
                + `translate(${innerRadius * 0.95}) rotate(${180 - (d.angle) * 180 / Math.PI - 90})`)
      .text((d) => `${d.source.value}`)
      .style('fill', '#001f21')
      .attr('font-size', 12);
    // Labels for targets
    svg.append('g')
      .selectAll('text')
      .data(ribbons)
      .join('text')
      .attr('dy', '.1em')
      .attr('class', 'titles')
      .attr('text-anchor', 'middle')
      .each((d) => { d.angle = (d.target.startAngle + d.target.endAngle) / 2; })
      .attr('transform', (d) => `rotate(${((d.angle) * 180 / Math.PI - 90)})`
                + `translate(${innerRadius * 0.95}) rotate(${(180 - (d.angle) * 180 / Math.PI - 90)})`)
      .text((d) => `${d.target.value}`)
      .style('fill', '#001f21')
      .attr('font-size', 12);

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
    <StyledCircosPlot display={display}>
      <div id={plotId} className="plot" />
    </StyledCircosPlot>
  );
};

export default CircosPlot;
