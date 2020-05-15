import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import '../../styles/index.css';
import Circos, { CHORDS } from 'react-circos';

const StyledCircosPlot = styled.div`
    display: ${(props) => props.display};
    margin-left: 10vw;
`;

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
      <Circos
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
          type: CHORDS,
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
