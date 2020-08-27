/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import gradstop from 'gradstop';
import StatsPlot from './StatsPlot';

const StyledLabStatsContainer = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: row;

    .tab-container {
      display:flex;
      flex-direction: row;
      height: 500px;
      margin-top:30px;
      width: 80%;
    }

    .piPlotContainer {
      width: 85%;
    }
    
    .piPlot {
      width: 100%;
    }

    .toggle {
        width: 15%;
    }
`;

/**
 * Shows a bar plot with total stats of the lab, with a selection for PI.
 *
 */
const LabStatsContainer = (props) => {
  const { data, pisRaw } = props;
  const pis = pisRaw.sort((a, b) => a - b);
  const [piSelected, setPiSelected] = useState(pis[0]);

  const handleChange = (event) => {
    setPiSelected(event.target.value);
  };

  // formatting into { PI: { 2017: [], 2018: [], ...}, ...}
  const piMap = {};
  pis.forEach((x) => {
    piMap[x] = {};
  });

  data.forEach((x) => {
    x.node.stats.forEach((n) => {
      // if year hasn't been initialized
      if (piMap[x.node.lab][n.year] === undefined) {
        piMap[x.node.lab][n.year] = [];
      } else {
        piMap[x.node.lab][n.year].push(parseInt(n.downloads));
      }
    });
  });

  // formatting into { PI: {x:[], y:[], etc}}
  const piData = {};
  pis.forEach((x) => {
    piData[x] = {
      x: [],
      y: [],
      type: 'bar',
      marker: {},
    };

    piData[x].x = Object.keys(piMap[x]).sort((a, b) => a - b);

    // getting sums of years
    const temp = [];
    piData[x].x.forEach((m) => {
      temp.push(piMap[x][m].reduce((a, b) => a + b, 0));
    });
    piData[x].y = temp;

    // making gradients for the bar charts to make it ~pretty~
    if (piData[x].x.length < 2) {
      piData[x].marker.color = '#78d9ff';
    } else {
      piData[x].marker.color = gradstop({
        stops: piData[x].x.length,
        inputFormat: 'hex',
        colorArray: ['#78d9ff', '#02577b'], // reverse order
      });
    }
  });

  const layout = {
    title: 'Downloads Per Year',
    autosize: true,
    font: {
      size: '1em',
    },
    xaxis: {
      tickformat: 'd',
    },
    showlegend: false,
  };

  return (
    <StyledLabStatsContainer>
      <div className="tab-container">
        <FormControl component="fieldset" className="toggle">
          <FormLabel component="legend">Members</FormLabel>
          <RadioGroup aria-label="pis" name="pis" value={piSelected} onChange={handleChange}>
            {pis.map((y) => <FormControlLabel key={y} value={y} control={<Radio color="primary" />} label={y} />)}
          </RadioGroup>
        </FormControl>
        <div className="piPlotContainer">
          {piData[piSelected].x.length === 0 ? (
            <span>No data available.</span>
          ) : (
            <StatsPlot
              data={piData[piSelected]}
              layout={layout}
              className="piPlot"
            />
          )}
        </div>
      </div>
    </StyledLabStatsContainer>
  );
};

export default LabStatsContainer;
