import React, {Fragment} from "react";
import styled from 'styled-components';
import Plotly from 'react-plotly.js';

const DownloadStatsPlot = (props) => {
    const { data, layout} = props;
    console.log(data)
    return (
        <Plotly
            data={[data]}
            layout={layout}
            config={{
                responsive: true,
                displayModeBar: false,
            }}
        />
    )
}

export default DownloadStatsPlot;