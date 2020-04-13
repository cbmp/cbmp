import React, {Fragment} from "react";
import styled from 'styled-components';
import Plotly from 'react-plotly.js';

const StyledDownloadStatsPlot = styled.div`
    background: white;
`;

// https://elcess.us/Integrating-Plotly-with-Gatsby/ for build
const statsBarplot = () => {

}

const DownloadStatsPlot = (props) => {
    const { name, data} = props;
    console.log(data)
    return (
        <StyledDownloadStatsPlot>
            <Fragment>
            {/* <Plotly
                    data={data}
                    layout={layout}
                    graphDiv={plotId}
                    config={{
                        responsive: true,
                        displayModeBar: false,
                    }}
                /> */}
            </Fragment>
        </StyledDownloadStatsPlot>
    );
}

export default DownloadStatsPlot;
