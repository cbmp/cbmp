import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import '../../../styles/index.css';

const StyledUpsetPlot = styled.div`
    display: ${(props) => props.display};

    .plot {
      width: 100%;
    }

    .plot svg {
      display: block;
      width: 100%;
      height: auto;
    }
`;

const UpsetPlot = (props) => {
  const {
    data, soloSets, plotId, hidden,
  } = props;
  const [display, setDisplay] = useState('none');
  useEffect(() => {
    // all sets
    const allSetNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, soloSets.length).split('');

    // position and dimensions
    const labelFontSize = 20;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `${labelFontSize}px sans-serif`;
    const widestLabel = d3.max(soloSets, (set) => context.measureText(set.name).width) || 0;
    const margin = {
      top: 0,
      right: 0,
      bottom: 300,
      left: Math.max(90, Math.ceil(widestLabel + 30)),
    };
    const rad = 13;
    const columnSpacing = rad * 2.7;
    const width = columnSpacing * data.length;
    const height = 400;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + 300 + margin.top + margin.bottom;

    // make the canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`)
      .attr('fill', 'white');

    // make a group for the upset circle intersection things
    const upsetCircles = svg.append('g')
      .attr('id', 'upsetCircles')
      .attr('transform', `translate(20,${height + 40})`);

    // making dataset labels
    soloSets.forEach((x, i) => {
      upsetCircles.append('text')
        .attr('dx', -30)
        .attr('dy', 5 + i * (rad * 2.7))
        .attr('text-anchor', 'end')
        .attr('fill', 'black')
        .style('font-size', `${labelFontSize}px`)
        .text(x.name);
    });

    // sort data decreasing
    data.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));

    // make the bars
    const upsetBars = svg.append('g')
      .attr('id', 'upsetBars');

    const nums = data.map((x) => x.value);

    // set range for data by domain, and scale by range
    const xrange = d3.scaleLinear()
      .domain([0, nums.length])
      .range([0, width]);

    const yrange = d3.scaleLinear()
      .domain([0, d3.max(nums)])
      .range([height, 0]);

    // set axes for graph
    const xAxis = d3.axisBottom()
      .scale(xrange)
      .tickPadding(2)
      .tickFormat((d, i) => data[i].setName)
      .tickValues(d3.range(data.length));

    const yAxis = d3.axisLeft()
      .scale(yrange)
      .tickSize(5);

    // add X axis
    upsetBars.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .call(xAxis)
      .selectAll('.tick')
      .remove();


    // Add the Y Axis
    upsetBars.append('g')
      .attr('class', 'y axis')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .call(yAxis)
      .selectAll('text')
      .attr('fill', 'black')
      .attr('stroke', 'none')
      .style('font-size', '20px');


    const chart = upsetBars.append('g')
      .attr('transform', 'translate(1,0)')
      .attr('id', 'chart');

    // adding each bar
    const bars = chart.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('width', 20)
      .attr('x', (d, i) => 9 + i * (rad * 2.7))
      .attr('y', (d) => yrange(d.value))
      .style('fill', '#02577b')
      .attr('height', (d) => height - yrange(d.value));

    // circles
    data.forEach((x, i) => {
      allSetNames.forEach((y, j) => {
        upsetCircles.append('circle')
          .attr('cx', i * (rad * 2.7))
          .attr('cy', j * (rad * 2.7))
          .attr('r', rad)
          .attr('class', `set-${x.setName}`)
          .style('opacity', 1)
          .attr('fill', () => {
            if (x.setName.indexOf(y) !== -1) {
              return '#02577b';
            }
            return 'silver';
          });
      });

      // lines between circles
      upsetCircles.append('line')
        .attr('id', `setline${i}`)
        .attr('x1', i * (rad * 2.7))
        .attr('y1', allSetNames.indexOf(x.setName[0]) * (rad * 2.7))
        .attr('x2', i * (rad * 2.7))
        .attr('y2', allSetNames.indexOf(x.setName[x.setName.length - 1]) * (rad * 2.7))
        .style('stroke', '#02577b')
        .attr('stroke-width', 4);
    });

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

    bars.on('mouseover', (d) => {
      tooltip.text(`${d.name}: ${d.value} collaboration${d.value === 1 ? '' : 's'}`).style('visibility', 'visible');
    })
      .on('mousemove', () => {
        tooltip.style('top', `${d3.event.pageY - 20}px`).style('left', `${d3.event.pageX + 20}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });


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
    <StyledUpsetPlot display={display}>
      <div id={plotId} className="plot" />
    </StyledUpsetPlot>
  );
};

export default UpsetPlot;
