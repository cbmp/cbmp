/* eslint-disable react/jsx-filename-extension */
import React, { Fragment } from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Grid from '../components/Grid';
import Layout from '../components/Layout';
import LabStatsContainer from '../components/Plots/LabStatsContainer';

const StyledSoftware = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items:center;
    flex-direction: column;
    margin-top:80px;
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
        width: 80%;
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
                } 
            }
        }
        allDlStatsJson {
            edges {
              node {
                lab
                stats {
                  downloads
                  month
                  year
                }
              }
            }
            distinct(field: lab)
          }
    }
`;

const Software = () => (
  <Layout page="Software">
    <StyledSoftware>
      <div className="container">
        <StaticQuery
          query={SoftwareQuery}
          render={(data) => (
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
                  <LabStatsContainer data={data.allDlStatsJson.edges} pisRaw={data.allDlStatsJson.distinct} />
                </TabPanel>
              </Tabs>
            </>
          )}
        />
      </div>

    </StyledSoftware>
  </Layout>

);

export default Software;
