import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../../../styles/index.css';
// import Circos from 'react-circos';
import Loadable from 'react-loadable';

const StyledCircosPlot = styled.div`
    display: ${(props) => props.display};
    margin-left: 10vw;
`;

// need this so it doesn't interfere with SSR
const CircosLoaded = Loadable({
  loader: () => import(`react-circos`),
  loading: ({ timedOut }) =>
    timedOut ? (
      <blockquote>Error: Loading Circos timed out.</blockquote>
    ) : (
      <div>Loading... </div>
    ),
  timeout: 10000,
});

const CircosPlot = (props) => {
  const { chords, layout, hidden } = props;
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    if (hidden) {
      setDisplay('none');
    } else {
      setDisplay('block');
    }
  }, [hidden]);

  const size = 800;
  return (
    <StyledCircosPlot display={display}>
      <CircosLoaded
        layout={layout}
        config={{
          innerRadius: size / 2 - 80,
          outerRadius: size / 2 - 30,
          ticks: {
            display: false,
          },
          labels: {
            position: 'center',
            display: true,
            size: 16,
            color: 'white',
            radialOffset: 15,
          },
        }}
        tracks={[{
          type: 'CHORDS',
          data: chords,
          config: {
            radius: (d) => {
              if (d.source.id === 'chr1') {
                return 0.5;
              }
              return null;
            },
            logScale: false,
            opacity: 0.5,
            color: '#1d7597',
            tooltipContent: (d, i) => `${d.source.id} + ${d.target.id}: 
                      ${d.value} publication${d.value === 1 ? '' : 's'}`,
          },
        }]}
        size={size}
      />

    </StyledCircosPlot>
  );
};

export default CircosPlot;
