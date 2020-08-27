import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import '../styles/index.css';
import styled from 'styled-components';
import Layout from '../components/Layout';
import CollabContainer from '../components/Plots/CollabPlots/CollabContainer';

const StyledPublications = styled.div`
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
    }

    .container {
        // background: var(--contrast-bg);
        width: 80%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        padding: 30px 0px 80px 0px;
    }

`;

const PubsQuery = graphql`
    {
      allCollabStatsJson {
        edges {
          node {
            name
            pubs
            query
          }
        }
      }
    }
`;

const Publications = () => (
  <Layout page="Publications">
    <StyledPublications>
      <div className="container">
        <h1>Collaborations on Publications</h1>
        <StaticQuery
          query={PubsQuery}
          render={(data) => (
            <CollabContainer
              data={data}
            />
          )}
        />
      </div>
    </StyledPublications>
  </Layout>
);

export default Publications;
