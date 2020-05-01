import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import gradstop from 'gradstop';
import DownloadStatsPlot from './DownloadStatsPlot';

const StyledDownloadStatsContainer = styled.div`
    background: white;
    display:flex;
    flex-direction: row;
    justify-content: center;
    height: 400px;
    margin-top:30px;
    & > * {
        width: 50%;
    }

    .toggle {
        width: 100px;
    }
`;

const DownloadStatsContainer = (props) => {
  const { data } = props;
  // get all years
  const years = [...new Set(data.map((x) => x.year))];
  const [yearSelected, setYearSelected] = useState(years[years.length >= 3 ? years.length - 3 : 0]);

  const handleChange = (event) => {
    setYearSelected(event.target.value);
  };

  /* FORMATTING DATA */
  // year data formatting
  const yearData = {
    x: [],
    y: [],
    type: 'bar',
    marker: {},
  };

  const monthData = {};
  years.forEach((year) => {
    // adding in year data
    yearData.x.push(year);
    let total = 0;

    // month data formatting
    monthData[year] = {
      x: [],
      y: [],
      type: 'bar',
      marker: {},
    };

    // Array.some acts like a for loop with break
    // you break on the return statement
    data.some((item) => {
      if (item.year === year) {
        // summing year data up
        total += parseInt(item.downloads);

        // adding in month data
        monthData[year].x.push(item.month);
        monthData[year].y.push(item.downloads);
      }
      return item.year > year;
    });

    // making gradients for the bar charts to make it ~pretty~
    if (monthData[year].x.length < 2) {
      monthData[year].marker.color = '#78d9ff';
    } else {
      monthData[year].marker.color = gradstop({
        stops: monthData[year].x.length,
        inputFormat: 'hex',
        colorArray: ['#78d9ff', '#02577b'], // reverse order
      });
    }

    yearData.y.push(total);
  });

  const yearLayout = {
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
  const monthLayout = {
    title: 'Downloads Per Month',
    autosize: true,
    font: {
      size: '1em',
    },
    showlegend: false,
  };

  // making gradients for the bar charts to make it ~pretty~
  if (years.length < 2) {
    yearData.marker.color = '#78d9ff';
  } else {
    yearData.marker.color = gradstop({
      stops: years.length,
      inputFormat: 'hex',
      colorArray: ['#78d9ff', '#02577b'], // reverse order
    });
  }


  return (
    <StyledDownloadStatsContainer className="container">
      <>
        <DownloadStatsPlot
          data={yearData}
          layout={yearLayout}
          className="yearPlot"
        />
        <DownloadStatsPlot
          data={monthData[yearSelected]}
          layout={monthLayout}
          className="monthPlot"
        />
        <FormControl component="fieldset" className="toggle">
          <FormLabel component="legend">Years</FormLabel>
          <RadioGroup aria-label="year" name="year" value={yearSelected} onChange={handleChange}>
            {years.slice(years.length >= 3 ? years.length - 3 : 0, years.length).map((y) => <FormControlLabel key={y} value={y} control={<Radio color="primary" />} label={y} />)}
          </RadioGroup>
        </FormControl>

      </>
    </StyledDownloadStatsContainer>
  );
};

export default DownloadStatsContainer;
