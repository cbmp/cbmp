import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import '../../styles/index.css';
import Circos, { CHORDS } from 'react-circos';

const StyledCircosPlot = styled.div`
    display: ${(props) => props.display};
`;

const CircosPlot = (props) => {
  const {
    chords, layout, hidden, plotId,
  } = props;
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    const matrixData = {
      Occupants:
      [0, 10, 10, 10, 10, 0, 0, 0, 10, 10, 10, 10, 10],
      Flooring:
      [70, 0, 0, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0],
      Millwork:
      [40, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0],
      Ceilings:
      [60, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0],
      'Wet Applied Products':
      [60, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0],
      'Curtain Wall':
      [0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0],
      Environment:
      [0, 10, 10, 10, 10, 0, 10, 0, 10, 10, 10, 0, 10],
      Roofing:
      [0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0],
      Insulation:
      [50, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0],
      MEPFP:
      [40, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0],
      Structure:
      [50, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0],
      Furniture:
      [90, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0],
    };

    const matrix = Object.values(matrixData);
    const matrixKeys = Object.keys(matrixData);

    const margin = {
      top: 20,
      right: 200,
      bottom: 90,
      left: 70,
    };

    const width = 900;
    const height = 800;

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

    const outerRadius = Math.min(width, height) * 0.5 - 150;
    const innerRadius = outerRadius - 30;

    const formatValue = d3.formatPrefix(',.0', 1e3);

    const chord = d3.chord()
      .padAngle(0.024)
      .sortSubgroups(d3.descending);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const ribbon = d3.ribbon()
      .radius(innerRadius);

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2}) rotate(75)`)
      .datum(chord(matrix));

    const group = g.append('g')
      .attr('class', 'groups')
      .selectAll('g')
      .data((chords) => chords.groups)
      .enter()
      .append('g');

    group.append('path')
      .style('fill', (d) => color(d.index))
      .style('stroke', (d) => d3.rgb(color(d.index)).darker())
      .attr('d', arc);

    const groupTick = group.selectAll('.group-tick')
      .data((d) => groupTicks(d, 1e3))
      .enter().append('g')
      .attr('class', 'group-tick')
      .attr('transform', (d) => `rotate(${d.angle * 180 / Math.PI - 75
      }) translate(${outerRadius},2)`);

    groupTick.append('line')
      .attr('x2', 6);

    groupTick
      .filter((d) => d.value % 5e3 === 0)
      .append('text')
      .attr('x', 8)
      .attr('dy', '.35em')
      .attr('transform', (d) => (d.angle > Math.PI / 2 && d.angle < Math.PI * 3 / 2 ? 'rotate(180) translate(-16)' : null))
      .style('text-anchor', (d) => (d.angle > Math.PI / 2 && d.angle < Math.PI * 3 / 2 ? 'end' : null))
      .text((d) => matrixKeys[d.index]);

    g.append('g')
      .attr('class', 'ribbons')
      .selectAll('path')
      .data((chords) => chords)
      .enter()
      .append('path')
      .attr('d', ribbon)
      .style('fill', (d) => color(d.target.index))
      .style('stroke', (d) => d3.rgb(color(d.target.index)).darker());

    // Returns an array of tick angles and values for a given group and step.
    function groupTicks(d, step) {
      const k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, step).map((value) => ({
        index: d.index,
        value,
        angle: value * k + d.startAngle,
      }));
    }
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
