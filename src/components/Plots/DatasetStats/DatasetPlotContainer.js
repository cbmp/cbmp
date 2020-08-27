/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import gradstop from 'gradstop';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import StatsPlot from '../Stats/StatsPlot';

const customFilterOption = (option, rawInput) => {
  const words = rawInput.split(' ');
  return words.reduce(
    (acc, cur) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
    true,
  );
};

// format data to send to plotly
const formatSamplesData = (data, options) => {
  let rawData = [];
  options.forEach((x) => {
    rawData = rawData.concat(data[x.value]);
  });

  // calculating yearly data
  const yearlyData = {
    x: [],
    y: [],
    mode: 'lines+markers',
  };
  const years = [...new Set(rawData.map((x) => parseInt(x.year_created)))].sort((a, b) => a - b);
  years.forEach((year) => {
    // adding in year data
    yearlyData.x.push(year);
    // summing year data up
    let total = 0;
    rawData.forEach((item) => {
      if (parseInt(item.year_created) === year && item.num_samples !== '-') {
        total += parseInt(item.num_samples);
      }
    });
    yearlyData.y.push(total);
  });

  // calculating cumulative data based on yearly
  const cumulData = {
    x: [],
    y: [],
    mode: 'lines+markers',
  };

  // for each yearlyData value, add the one before it
  cumulData.x = yearlyData.x;
  yearlyData.y.forEach((d, i) => {
    if (i === 0) {
      cumulData.y.push(d);
    } else {
      cumulData.y.push(d + cumulData.y[i - 1]);
    }
  });


  return {
    cumulative: cumulData,
    yearly: yearlyData,
  };
};

const formatPlatformData = (data, options) => {
  let rawData = [];
  options.forEach((x) => {
    rawData = rawData.concat(data[x.value]);
  });
  const plotData = {
    labels: [],
    values: [],
    marker: {},
    hoverinfo: 'label+percent',
    textinfo: 'label',
    hole: 0.5,
    type: 'pie',
    textfont: {
      color: 'white',
      size: 14,
    },
    hoverlabel: {
      font: {
        color: 'white',
        size: 14,
      },

    },
  };

  const platforms = [...new Set(rawData.map((x) => x.platform))].sort((a, b) => a - b);
  platforms.forEach((platform) => {
    // adding in platform data
    plotData.labels.push(platform);
    // summing platform data up
    let total = 0;
    rawData.forEach((item) => {
      if (item.platform === platform) {
        total += 1;
      }
    });
    plotData.values.push(total);
  });
  // plotData.marker.colors = ['#BEBADA', '#FB8072', '#80B1D3', '#FDB462', '#B3DE69', '#E78AC3', '#FCCDE5'];
  plotData.marker.colors = ['#5096B5', '#E15759', '#F28E2C', '#BC80BD', '#A6D854', '#FF9DA7'];
  return plotData;
};

const StyledDatasetPlotContainer = styled.div`
  display:flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;

  &* {
    width: 50%;
  }
  
  .samples-container {
    display:flex;
    flex-direction:column;
  }
`;

/**
 * Dataset plot container (with line chart and donut)
 */
const DatasetPlotContainer = (props) => {
  const { data } = props;
  const [samplesData, setSamplesData] = useState({});
  const [platformData, setPlatformData] = useState({});
  const [sampleModeSelected, setSampleModeSelected] = useState('cumulative');
  const memberData = {};

  // show filtered data based on selected members
  const handleMembersChange = (event) => {
    if (event === null || event.length === 0) {
      setSamplesData(formatSamplesData([], []));
      setPlatformData(formatPlatformData([], []));
    } else {
      setSamplesData(formatSamplesData(memberData, event));
      setPlatformData(formatPlatformData(memberData, event));
    }
  };

  // for sample toggle
  const handleSampleChange = (event) => {
    setSampleModeSelected(event.target.value);
  };

  // formatting data into {pi: [data], pi: [data],...}
  data.forEach((x) => {
    if (Object.keys(memberData).indexOf(x.node.lab) === -1) {
      memberData[x.node.lab] = [x.node];
    } else {
      memberData[x.node.lab].push(x.node);
    }
  });

  const memberOptions = Object.keys(memberData).map((x) => ({ value: x, label: x }));

  useEffect(() => {
    setSamplesData(formatSamplesData(memberData, memberOptions));
    setPlatformData(formatPlatformData(memberData, memberOptions));
  }, []);

  const samplesLayout = {
    title: 'Number of Samples Per Year',
    autosize: true,
    font: {
      size: '1em',
    },
    xaxis: {
      tickformat: 'd',
      showticklabel: true,
      type: 'category',
    },
    yaxis: {
      type: 'log',
      // autorange: true,
      dtick: 1,
      range: [0, 5],
    },
    showlegend: false,
    width: 500,
    height: 500,
  };

  const platformLayout = {
    title: 'Platforms Hosted On',
    autosize: true,
    showlegend: false,
    width: 500,
    height: 500,
  };

  return (
    <>
      <Select
        isMulti
        defaultValue={memberOptions}
        filterOption={customFilterOption}
        options={memberOptions}
        placeholder="Select members to include..."
        onChange={handleMembersChange}
      />
      <StyledDatasetPlotContainer>

        <div className="samples-container">
          <StatsPlot
            data={samplesData[sampleModeSelected]}
            layout={samplesLayout}
            className="samplesPlot"
          />
          <FormControl component="fieldset" className="toggle">
            <FormLabel component="legend">Mode</FormLabel>
            <RadioGroup aria-label="Mode" name="Mode" value={sampleModeSelected} onChange={handleSampleChange}>
              <FormControlLabel value="cumulative" control={<Radio color="primary" />} label="cumulative" />
              <FormControlLabel value="yearly" control={<Radio color="primary" />} label="yearly" />
            </RadioGroup>
          </FormControl>
        </div>
        <StatsPlot
          data={platformData}
          layout={platformLayout}
          className="platformPlot"
        />
      </StyledDatasetPlotContainer>
    </>
  );
};

export default DatasetPlotContainer;
