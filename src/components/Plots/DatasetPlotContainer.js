import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
  return plotData;
};

const DatasetPlotContainer = (props) => {
  const { data } = props;
  const [samplesData, setSamplesData] = useState([]);
  const memberData = {};

  // show filtered data based on selected members
  const handleMembersChange = (event) => {
    if (event === null || event.length === 0) {
    //   setGridData(data);
      console.log('null');
    } else {
      setSamplesData(formatSamplesData(memberData, event));
    }
  };

  // formatting data into {pi: [data], pi: [data],...}
  data.allDatasetsCsv.edges.forEach((x) => {
    if (Object.keys(memberData).indexOf(x.node.lab) === -1) {
      memberData[x.node.lab] = [x.node];
    } else {
      memberData[x.node.lab].push(x.node);
    }
  });

  const memberOptions = Object.keys(memberData).map((x) => ({ value: x, label: x }));

  useEffect(() => {
    setSamplesData(formatSamplesData(memberData, memberOptions));
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
      <StatsPlot
        data={samplesData}
        layout={samplesLayout}
        className="samplesPlot"
      />
    </>
  );
};

export default DatasetPlotContainer;
