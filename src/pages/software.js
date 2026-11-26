/* eslint-disable react/jsx-filename-extension */
import React, { Fragment } from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Grid from '../components/SoftwareGrid';
import Layout from '../components/Layout';
import LabStatsContainer from '../components/Plots/Stats/LabStatsContainer';

const StyledSoftware = styled.div`
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
            padding: 10px;
            border-radius: 50%;
            margin-left: 10px;
        }
    }
    .container {
        width: 90%;
        // padding-top: 30px;
    }
    .react-tabs__tab-list {
      margin-bottom:30px;
    }
    
`;

const SoftwareQuery = graphql`
    {
        allSoftwareCsv (
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
                    licensing
                    short_desc
                    keywords
                    implementation_language
                } 
            }
        }
        allDlStatsJson {
            edges {
              node {
                name
                stats {
                  downloads
                  month
                  year
                }
              }
            }
          }
    }
`;

const Software = () => (
  <Layout page="Software">
    <StyledSoftware>
      <div className="container">
        <StaticQuery
          query={SoftwareQuery}
          render={(data) => {
            const softwareByName = new Map(
              data.allSoftwareCsv.edges.map(({ node }) => [node.name, node]),
            );
            const labStatsData = data.allDlStatsJson.edges.reduce((stats, edge) => {
              const software = softwareByName.get(edge.node.name);
              if (software && software.lab) {
                stats.push({
                  node: Object.assign({}, edge.node, { lab: software.lab }),
                });
              }
              return stats;
            }, []);
            const pisRaw = [...new Set(
              data.allSoftwareCsv.edges
                .map(({ node }) => node.lab)
                .filter(Boolean),
            )];

            return (
              <>
                <h1>
                  Software
                  <span className="count">{data.allSoftwareCsv.edges.length}</span>
                </h1>
                <Tabs>
                  <TabList>
                    <Tab>All Software</Tab>
                    <Tab>Download Stats by Lab</Tab>
                  </TabList>

                  <TabPanel>
                    <Grid data={data.allSoftwareCsv.edges} type="software" />
                  </TabPanel>
                  <TabPanel>
                    <LabStatsContainer data={labStatsData} pisRaw={pisRaw} />
                  </TabPanel>
                </Tabs>
              </>
            );
          }}
        />
      </div>

    </StyledSoftware>
  </Layout>

);

export default Software;
