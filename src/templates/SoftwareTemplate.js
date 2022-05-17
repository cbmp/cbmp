import React from 'react';
import '../styles/index.css';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { StyledIndivPage } from '../styles/indiv_page';
import StatsContainer from '../components/Plots/Stats/StatsContainer';

// This is a page query - Gatsby looks for one page
// query per file. In components, use StaticQuery
// more here: https://www.gatsbyjs.org/docs/page-query/
export const query = graphql`
  query ($slug: String!, $name: String!) {
    softwareCsv( slug: { eq: $slug } ) {
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
        year
        doi
        scholar_link
        scholar_link_cited
        major_pubs_cited
        download_link
        instruction_link
        download_stats_link
    }
    dlStatsJson(name: {eq: $name}) {
        stats {
          downloads
          month
          year
        }
    }
    gsSoftwareStatsJson(name: {eq: $name}) {
        cited
    }
  }
`;

/**
 * Template for jndividual software pages.
 */
const SoftwareTemplate = ({ data }) => {
  const item = data.softwareCsv;
  const { stats } = data.dlStatsJson;
  const citedBy = data.gsSoftwareStatsJson.cited;
  return (
    <Layout page="SoftwareTemplate">
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
              {item.download_link.trim() === '' || item.download_link.trim() === '-' ? (
                <a className="disabled">Download</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={item.download_link}>Download</a>
              )}
              {
                item.instruction_link.trim() === '' || item.instruction_link.trim() === '-'
                  ? item.download_stats_link.trim() === '' || item.download_stats_link.trim() === '-' // no link
                    ? (<a className="disabled">Package Info</a>)
                    : (<a target="_blank" rel="noopener noreferrer" href={item.download_stats_link}>Info</a>)
                  : item.download_link.includes('github') && item.instruction_link.includes('github')
                    ? !(item.download_stats_link.trim() === '' || item.download_stats_link.trim() === '-')
                      ? (<a target="_blank" rel="noopener noreferrer" href={item.download_stats_link}>Info</a>)
                    : (<a target="_blank" rel="noopener noreferrer" href={item.instruction_link}>Info</a>)
                  : (<a target="_blank" rel="noopener noreferrer" href={item.instruction_link}>Package Info</a>)
              }
            </div>

          </div>
        </div>
        <div className="container title">
          <h4>Citation</h4>
        </div>
        <div className="container citation">
          <div className="section">
            {item.citation === '-' ? 'Citation not available.' : item.citation}
            <div className="links">
              {item.doi === '-' ? (
                <a className="disabled">DOI</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={`http://doi.org/${item.doi}`}>DOI</a>
              )}
              {item.scholar_link.trim() === '-' || item.scholar_link.trim() === '' ? (
                <a className="disabled">Google Scholar</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={item.scholar_link}>Google Scholar</a>
              )}
              {item.scholar_link_cited.trim() === '-' || item.scholar_link_cited.trim() === '' ? (
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
        {stats.length === 0 ? null : (
          <StatsContainer
            name={item.name}
            data={stats}
            statType="Downloads"
          />
        )}
      </StyledIndivPage>
    </Layout>

  );
};

export default SoftwareTemplate;
