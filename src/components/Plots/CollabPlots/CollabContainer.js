import React, { useState } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as d3 from 'd3';
import UpsetPlot from './UpsetPlot';
import NetworkPlot from './NetworkPlot';
import CircosPlot from './CircosPlot1';

const StyledCollabContainer = styled.div`
  display:flex;
  justify-content: center;
  margin-top:50px;

  #networkPlot, #upsetPlot {
    display:flex;
    justify-content:center;
  }

  .toggle {
    width:15%;
}
  .plot-container {
    width:85%;
  }
`;

const formatIntersectionData = (data) => {
  // compiling solo member data - how many publications per person
  const soloSets = [];

  // nameStr is for the setName, which makes it easy to compile
  // intersection names (7 letters for 7 members)
  const nameStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, data.length);
  data.forEach((x, i) => {
    soloSets.push({
      name: x.node.name,
      setName: nameStr.substr(i, 1),
      value: x.node.pubs.length,
      pubs: x.node.pubs,
    });
  });

  // compiling list of intersection names recursively
  // ["A", "AB", "ABC", ...]
  const getIntNames = (start, end, nameStr) => {
    // eg. BCD
    const name = nameStr.substring(start, end);

    // when reaching the last letter
    if (name.length === 1) {
      return [name];
    }
    const retArr = getIntNames(start + 1, end, nameStr);

    // eg. for name = BCD, would return [B] + [BC,BCD,BD] + [C,CD,D]
    return [name[0]].concat(retArr.map((x) => name[0] + x), retArr);
  };

  let intNames = getIntNames(0, nameStr.length, nameStr);

  // removing solo names
  intNames = intNames.filter((x) => x.length !== 1);

  let intersections = [];

  // compile intersections of publications for each intersection name
  intNames.forEach((intName) => {
    // collecting all publications: [pub1arr, pub2arr, ...]
    const pubs = intName.split('').map((set) => soloSets.find((x) => x.setName === set).pubs);

    // getting intersection
    // https://stackoverflow.com/questions/37320296/how-to-calculate-intersection-of-multiple-arrays-in-javascript-and-what-does-e
    const result = pubs.reduce((a, b) => a.filter((c) => b.includes(c)));
    intersections.push({
      name: intName.split('').map((set) => soloSets.find((x) => x.setName === set).name).join(' + '),
      setName: intName,
      value: result.length,
      pubs: result,
    });
  });

  // taking out all 0s
  intersections = intersections.filter((x) => x.value !== 0);
  return { intersections, soloSets };
};

const formatNetworkData = (intersections, data) => {
  const nameStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, data.length);
  const edgesRaw = intersections.filter((x) => x.setName.length === 2);

  // calculating thickness of edge by log scaling
  const max = d3.max(edgesRaw.map((n) => n.value));
  const thickestEdge = 40;
  const b = Math.pow(max, (1 / thickestEdge));

  // formatting to [{source: 0, target: 1, thickness: 3, value: 5}, ...]
  const edges = [];
  edgesRaw.forEach((x) => {
    const thickness = (Math.log10(x.value + 1)) / (Math.log10(b));
    edges.push({
      source: x.name.split(' + ')[0],
      target: x.name.split(' + ')[1],
      name: x.name,
      value: x.value,
      thickness,
    });
  });
  return edges;
};

const formatChordData = (data, pairs) => {
  const chordData = {};
  const nodes = [];
  data.forEach((x) => {
    nodes.push(x.node.name);
  });
  chordData.chordNodes = nodes;

  const links = [];
  const chord = [];
  nodes.forEach(() => {
    const pair = [];
    nodes.forEach(() => {
      pair.push(0);
    });
    links.push(pair);
  });

  nodes.forEach(() => {
    const pair = [];
    nodes.forEach(() => {
      pair.push(1);
    });
    chord.push(pair);
  });
  chordData.chordArcs = chord;

  pairs.forEach((z) => {
    const source = nodes.findIndex((item) => item === z.source.id);
    const target = nodes.findIndex((item) => item === z.target.id);
    links[source][target] = z.value;
    links[target][source] = z.value;
  });
  chordData.chordLinks = links;
  return chordData;
};

const formatCircosData = (edges, soloSets) => {
  const circosLayout = [];
  const circosChords = [];
  const color = d3.scaleOrdinal(d3.schemeTableau10);

  soloSets.forEach((x) => {
    circosLayout.push({
      id: x.name,
      label: x.name,
      color: color(x.value),
      len: 0, // calculated based on the person with the most collaborations
      value: x.value,
      totalThickness: 0, // total space for chords
      startFrom: 0, // chords start off from this value
    });
  });

  // calculating thickness of edge by log scaling
  const max = d3.max(edges.map((n) => n.value));
  const thickestEdge = 20;
  const b = Math.pow(max, (1 / thickestEdge));

  // finding total chord space for each PI
  edges.forEach((x) => {
    // log10(1) = 0, and there are 1s, so I added 1 to each value
    const thickness = (Math.log10(x.value + 1)) / (Math.log10(b));

    // find index of source and target to add to thickness
    // adding 0.5 for spacing
    let ind = circosLayout.findIndex((item) => item.id === x.source);
    circosLayout[ind].totalThickness += thickness + 0.5;

    ind = circosLayout.findIndex((item) => item.id === x.target);
    circosLayout[ind].totalThickness += thickness + 0.5;
  });

  // find max total thickness for length
  const maxThickness = d3.max(circosLayout.map((x) => x.totalThickness));
  circosLayout.forEach((x) => {
    // x.len = maxThickness - 0.5; //Wasn't sure to deduct 0.5
    x.len = maxThickness; // this way works better, fixes start point for max node
  });

  // finding chord start for every PI
  // starting from the middle of the arc, place all the chords
  // in the middle, so find the half of total thickness and
  // subtract it from the arc middle
  circosLayout.forEach((x) => {
    x.startFrom = x.len / 2 - x.totalThickness / 2;
  });

  edges.forEach((x) => {
    // find index of source and target to add to startFrom
    const sInd = circosLayout.findIndex((item) => item.id === x.source);
    const tInd = circosLayout.findIndex((item) => item.id === x.target);

    // log10(1) = 0, and there are 1s, so I added 1 to each value
    const thickness = (Math.log10(x.value + 1)) / (Math.log10(b));

    circosChords.push({
      source: {
        id: x.source,
        start: circosLayout[sInd].startFrom,
        end: circosLayout[sInd].startFrom + thickness,
      },
      target: {
        id: x.target,
        start: circosLayout[tInd].startFrom,
        end: circosLayout[tInd].startFrom + thickness,
      },
      value: x.value,
    });
    // dynamically calculating the next startFrom point
    // and adding 0.5 for spacing
    circosLayout[sInd].startFrom += thickness + 0.5;
    circosLayout[tInd].startFrom += thickness + 0.5;
  });
  return { circosLayout, circosChords, maxThickness };
};

/**
 * Publications/Collaborations container, with selection for 3 plot views.
 */
const CollabContainer = (props) => {
  const [viewSelected, setViewSelected] = useState('Circos Plot');
  const data = props.data.allCollabStatsJson.edges;
  const { intersections, soloSets } = formatIntersectionData(data);

  // NOTE: edges are mutated in network plot, and the mutation reflects here
  const networkEdges = formatNetworkData(intersections, data);
  const { circosLayout, circosChords, maxThickness } = formatCircosData(networkEdges, soloSets);
  const chordData = formatChordData(data, circosChords);

  const handleChange = (event) => {
    setViewSelected(event.target.value);
  };

  // choosing which plot to view
  const views = ['Circos Plot', 'Graph Network', 'Upset Plot'];
  return (
    <StyledCollabContainer>
      <FormControl component="fieldset" className="toggle">
        <FormLabel component="legend">Choose the view:</FormLabel>
        <RadioGroup aria-label="pis" name="pis" value={viewSelected} onChange={handleChange}>
          {views.map((x) => <FormControlLabel key={x} value={x} control={<Radio color="primary" />} label={x} />)}
        </RadioGroup>
      </FormControl>
      <div className="plot-container">
        <NetworkPlot
          nodes={soloSets}
          links={networkEdges}
          plotId="networkPlot"
          hidden={viewSelected !== 'Graph Network'}
        />
        <UpsetPlot
          data={intersections}
          soloSets={soloSets}
          plotId="upsetPlot"
          hidden={viewSelected !== 'Upset Plot'}
        />
        <CircosPlot
          chordData={chordData}
          chords={circosChords}
          maxArc={maxThickness}
          plotId="chordPlot"
          hidden={viewSelected !== 'Circos Plot'}
        />
      </div>

    </StyledCollabContainer>
  );
};

export default CollabContainer;
