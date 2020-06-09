import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import gradstop from 'gradstop';
import styled from 'styled-components';
import StatsPlot from './StatsPlot';

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

  const plotData = {
    x: [],
    y: [],
    type: 'bar',
    marker: {},
  };
  const years = [...new Set(rawData.map((x) => parseInt(x.year_created)))].sort((a, b) => a - b);
  years.forEach((year) => {
    // adding in year data
    plotData.x.push(year);
    // summing year data up
    let total = 0;
    rawData.forEach((item) => {
      if (parseInt(item.year_created) === year && item.num_samples !== '') {
        total += parseInt(item.num_samples);
      }
    });
    plotData.y.push(total);
  });

  // // making gradients for the bar charts to make it ~pretty~
  // if (plotData.x.length < 2) {
  //   plotData.marker.color = '#78d9ff';
  // } else {
  //   plotData.marker.color = gradstop({
  //     stops: plotData.x.length,
  //     inputFormat: 'hex',
  //     colorArray: ['#78d9ff', '#02577b'], // reverse order
  //   });
  // }
  plotData.marker.color = ['#5096B5', '#E15759', '#F28E2C', '#BC80BD', '#A6D854', '#FF9DA7'];


  return plotData;
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
`;

const DatasetPlotContainer = (props) => {
  const { data } = props;
  const [samplesData, setSamplesData] = useState({});
  const [platformData, setPlatformData] = useState({});
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
    showlegend: false,
    width: 550,
    height: 500,
  };

  const platformLayout = {
    title: 'Platforms Hosted On',
    autosize: true,
    showlegend: false,
    width: 550,
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

        <StatsPlot
          data={samplesData}
          layout={samplesLayout}
          className="samplesPlot"
        />
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
