import React from 'react';
import '../styles/index.css';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { StyledIndivPage } from '../styles/indiv_page';
import StatsContainer from '../components/Plots/Stats/StatsContainer';

export const query = graphql`
  query ($slug: String!, $name: String!) {
    webappsCsv( slug: { eq: $slug } ) {
        name 
        lab
        slug
        short_desc
        long_desc
        version
        authors
        keywords
        licensing
        citation
        scholar_link
        scholar_link_cited
        major_pubs_cited
        download_link
        source_code
        instruction_link
        download_stats_link
        doi
    }
    gsWebappStatsJson(name: {eq: $name}) {
        cited
    }
    gaWebappsStatsJson(name: {eq: $name}) {
        stats {
          month
          users
          pageviews
          year
        }
    }
  }
`;

/**
 * Template for jndividual webapp pages.
 */
const WebappsTemplate = ({ data }) => {
  const item = data.webappsCsv;
  let stats = [];
  if (data.gaWebappsStatsJson !== null) {
    stats = data.gaWebappsStatsJson.stats;
  }
  const citedBy = data.gsWebappStatsJson.cited;
  return (
    <Layout page="WebappsTemplate">
      <StyledIndivPage>
        <div className="container title">
          <h1>{item.name}</h1>
          <h3>{item.short_desc}</h3>
        </div>
        <div className="container info">
          <div className="section long-desc">
            <span className="item-heading">Description:</span>
            {' '}
            {item.long_desc}
            {' '}
            <p />
          </div>
          <div className="section info-section">
            <div className="info-list">
              <div className="item">
                <span className="item-heading">Authors:</span>
                {' '}
                {item.authors}
                {' '}
              </div>

              <div className="item">
                <span className="item-heading">Lab:</span>
                {' '}
                {item.lab}
                {' '}
              </div>

              <div className="item">
                <span className="item-heading">Version:</span>
                {' '}
                {item.version}
                {' '}
              </div>

              <div className="item">
                <span className="item-heading">Keywords:</span>
                {' '}
                {item.keywords}
                {' '}
              </div>

              <div className="item">
                <span className="item-heading">Licensing:</span>
                {' '}
                {item.licensing}
                {' '}
              </div>
            </div>

            <div className="download">
              {item.download_link.trim() === ''  || item.download_link.trim() === '-' ? (
                <a className="disabled">Link to App</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={item.download_link}>Link to App</a>
              )}
              {item.source_code.trim() === '' || item.source_code.trim() === '-'? (
                <a className="disabled">Source Code</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={item.source_code}>Source Code</a>
              )}


            </div>
          </div>
        </div>
        <div className="container title">
          <h4>Citation</h4>
        </div>
        <div className="container citation">
          <div className="section">
            {item.citation === '' ? 'Citation not available.' : item.citation}
            <div className="links">
              {item.doi === '' || item.doi === '-'? (
                <a className="disabled">DOI</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={`https://doi.org/${item.doi}`}>DOI</a>
              )}
              {item.scholar_link === '' || item.scholar_link === '-' ? (
                <a className="disabled">Google Scholar</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={item.scholar_link}>Google Scholar</a>
              )}
              {item.scholar_link_cited === '' || item.scholar_link_cited === '-'? (
                <a className="disabled">Cited By</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={item.scholar_link_cited}>
                  Cited By
                  {' '}
                  {citedBy}
                </a>
              )}
            </div>
          </div>
        </div>
        {stats.length === 0 ? null : ( // && item.name !== 'PharmacoDB'
          <>
            <StatsContainer
              name={item.name}
              data={stats}
              statType="Users"
            />
            <StatsContainer
              name={item.name}
              data={stats}
              statType="Pageviews"
            />
          </>
        )}
      </StyledIndivPage>
    </Layout>

  );
};

export default WebappsTemplate;
