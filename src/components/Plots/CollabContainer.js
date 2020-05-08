import React from 'react';
import styled from 'styled-components';
import NetworkPlot from './NetworkPlot';

const StyledCollabContainer = styled.div`
  display:flex;
  justify-content: center;
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

  // formatting to [{source: 0, target: 1, thickness: 3, value: 5}, ...]
  const edges = [];
  edgesRaw.forEach((x) => {
    edges.push({
      source: x.name.split(' + ')[0], // nameStr.indexOf(x.setName[0])
      target: x.name.split(' + ')[1], // nameStr.indexOf(x.setName[1])
      name: x.name,
      value: x.value,
    });
  });

  return edges;
};

const CollabContainer = (props) => {
  const data = props.data.allCollabStatsJson.edges;
  const { intersections, soloSets } = formatIntersectionData(data);

  // edges are mutated in network plot, and the mutation reflects here
  const networkEdges = formatNetworkData(intersections, data);
  return (
    <StyledCollabContainer>
      <NetworkPlot nodes={soloSets} links={networkEdges} plotId="networkPlot" />
    </StyledCollabContainer>
  );
};

export default CollabContainer;
