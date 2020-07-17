import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import DatasetPlotContainer from '../components/Plots/DatasetPlotContainer';
import 'react-tabs/style/react-tabs.css';

import { Popup } from 'semantic-ui-react';
import Layout from '../components/Layout';
import 'semantic-ui-css/semantic.min.css';

import sortArrows from '../images/utils/sort-arrows.png';

const StyledDatasets = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items:center;
    flex-direction: column;
    margin-top:120px;
    padding: 30px 0px 80px 0px;
    
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 

        span {
            background: var(--main-color);
            color: white;
            font-size: calc(0.5vw + 0.5em);
            padding: 10px 12px;
            border-radius: 50%;
            margin-left:10px;
        }
    }
    .container {
        width: 80%;
        // padding-top: 30px;
    }

    .arrow {
        width: 5px !important;
        margin-left: 20px;
        margin-top: 7px;
        position: absolute;
        float: right;
    }

    .name-cell {
      display:flex;
      align-items:center;
      flex-direction:row;
      justify-content:flex-start;
      
      .qmark {
        font-size: 0.7em;
        font-weight: bold;
        align-self: flex-start;
        cursor: pointer;
        margin-left:6px;
      }
    }
    
`;

const DatasetsQuery = graphql`
    {
        allDatasetsCsv (
            sort: {
                fields: [name]
                order: ASC
            }
        ){
            edges {
                node {
                    name
                    lab
                    slug
                    platform
                    short_desc
                    technology
                    keywords
                    num_samples
                    year_created
                } 
            }
        }
    }
`;

const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  switch (typeof row[id]) {
  case 'object':
    // checks for metastasis label
    if (row[id] && row[id].origin) {
      return String('metastasis').includes(filter.value.toLowerCase());
    }
    // checks for disease name (additional check is to filter out null values)
    return row[id] && row[id].name
      ? String(row[id].name.toLowerCase()).includes(filter.value.toLowerCase())
      : false;
    // handles age filtering
  case 'number':
    return row[id].toString().includes(filter.value);
  case 'string':
    return String(row[id].toLowerCase()).includes(filter.value.toLowerCase());
  default:
    return false;
  }
};

const columns = [{
  Header: () => (
    <span>
      Name
      {' '}
      <img className="arrow" alt="arrow" src={sortArrows} />
    </span>
  ),
  width: 500,
  accessor: 'node.name',
  sortable: true,
  Cell: (row) => (
    <div className="name-cell">
      <Link to={`/datasets/${row.original.node.slug}`}>{row.value}</Link>
      <Popup hoverable trigger={<div className="qmark">(?)</div>}>
        <Popup.Content>
          {row.original.node.short_desc}
        </Popup.Content>
      </Popup>
    </div>
  ),
},
{
  Header: () => (
    <span>
      Number of Samples
      {' '}
      <img className="arrow" alt="arrow" src={sortArrows} />
    </span>
  ),
  sortMethod(a, b) { return b - a; },
  accessor: 'node.num_samples',
  sortable: true,
}, {
  Header: () => (
    <span>
      Technology
      {' '}
      <img className="arrow" alt="arrow" src={sortArrows} />
    </span>
  ),
  accessor: 'node.technology',
  sortable: true,
},
{
  Header: () => (
    <span>
      Year
      {' '}
      <img className="arrow" alt="arrow" src={sortArrows} />
    </span>
  ),
  accessor: 'node.year_created',
  sortable: true,
  sortMethod(a, b) { return b - a; },
}, {
  Header: () => (
    <span>
      Lab
      {' '}
      <img className="arrow" alt="arrow" src={sortArrows} />
    </span>
  ),
  accessor: 'node.lab',
  sortable: true,
},
];

const Datasets = () => (
  <Layout page="Datasets">
    <StyledDatasets>
      <div className="container">
        <StaticQuery
          query={DatasetsQuery}
          render={(data) => (
            <>
              <h1>
                Datasets
                <span className="count">{data.allDatasetsCsv.edges.length}</span>
              </h1>
              <Tabs>
                <TabList>
                  <Tab>Table of Datasets</Tab>
                  <Tab>Summary Plots</Tab>
                </TabList>

                <TabPanel>
                  <ReactTable
                    data={data.allDatasetsCsv.edges}
                    columns={columns}
                    filterable
                    defaultFilterMethod={filterCaseInsensitive}
                    className="-highlight"
                    showPagination={false}
                    pageSize={data.allDatasetsCsv.edges.length}
                  />
                </TabPanel>
                <TabPanel>
                  <DatasetPlotContainer
                    data={data.allDatasetsCsv.edges}
                  />
                </TabPanel>
              </Tabs>

            </>
          )}
        />
      </div>
    </StyledDatasets>
  </Layout>

);

export default Datasets;
