import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import '../../styles/index.css';
import Circos, { CHORDS } from 'react-circos';

const CircosPlot = (props) => {
  const chords = [
    {
      source: { id: 'chr7', start: 40, end: 60 },
      target: { id: 'chr3', start: 40, end: 60 },
    },
    // {
    //   source: { id: 'chr4', start: 74807187, end: 78807187 },
    //   target: { id: 'chr1', start: 89852878, end: 93852878 },
    // },
    // {
    //   source: { id: 'chr5', start: 32372614, end: 36372614 },
    //   target: { id: 'chr4', start: 125650987, end: 129650987 },
    // },
    // {
    //   source: { id: 'chr3', start: 32372616, end: 36372616 },
    //   target: { id: 'chr2', start: 157440784, end: 161440784 },
    // },
    // {
    //   source: { id: 'chr2', start: 131012108, end: 135012108 },
    //   target: { id: 'chr5', start: 172541752, end: 176541752 },
    // },
    // {
    //   source: { id: 'chr7', start: 19265412, end: 23265412 },
    //   target: { id: 'chr4', start: 31478113, end: 35478113 },
    // },
    // {
    //   source: { id: 'chr1', start: 89852783, end: 93852783 },
    //   target: { id: 'chr2', start: 131036705, end: 135036705 },
    // },
    // {
    //   source: { id: 'chr3', start: 7827203, end: 11827203 },
    //   target: { id: 'chr4', start: 31478116, end: 35478116 },
    // },

  ];
  const layout = [
    {
      id: 'chr1', label: 'chr1', color: '#996600', len: 100,
    },
    {
      id: 'chr2', label: 'chr2', color: '#666600', len: 100,
    },
    {
      id: 'chr3', label: 'chr3', color: '#99991E', len: 100,
    },
    {
      id: 'chr4', label: 'chr4', color: '#CC0000', len: 100,
    },
    {
      id: 'chr5', label: 'chr5', color: '#FF0000', len: 100,
    },
    {
      id: 'chr6', label: 'chr6', color: '#FF00CC', len: 100,
    },
    {
      id: 'chr7', label: 'chr7', color: '#FFCCCC', len: 100,
    },
  ];
  const size = 800;
  return (
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
          size: 14,
          color: '#000',
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
          opacity: 0.7,
          color: '#ff5722',
        },
      }]}
      size={size}
    />
  );
};

export default CircosPlot;
