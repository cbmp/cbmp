import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { StyledIndivPage } from '../styles/indiv_page';

export const query = graphql`
  query ($slug: String!) {
    datasetsCsv( slug: { eq: $slug } ) {
        name
        lab
        year_created
        year_updated
        slug
        short_desc
        long_desc
        authors
        doi
        keywords
        licensing
        num_samples
        sample_type
        technology
        citation
        publication_link
        scholar_link_cited
        download_link
        contact_name
        contact_email
        datatype
        platform
        species
    }
  }
  `;


const DatasetsTemplate = ({ data }) => {
  const item = data.datasetsCsv;
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
                <span className="item-heading">Year:</span>
                {' '}
                {item.year_created}
                {' '}
              </div>
              <div className="item">
                <span className="item-heading">Keywords:</span>
                {' '}
                {item.keywords}
                {' '}
              </div>
            </div>
            <div className="download">
              <a target="_blank" rel="noopener noreferrer" href={item.download_link}>
                Hosted on
                {' '}
                {item.platform}
              </a>
            </div>
          </div>
        </div>
        <div className="container citation-contact">
          <div className="section">
            <h4>Citation</h4>
            {item.citation === '' ? 'Citation not available.' : item.citation}
            <div className="links">
              {item.doi === '' ? (
                <a className="disabled">DOI</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={`http://doi.org/${item.doi}`}>DOI</a>
              )}
              {item.publication_link === '' ? (
                <a className="disabled">Publication Link</a>
              ) : (
                <a target="_blank" rel="noopener noreferrer" href={item.publication_link}>Publication Link</a>
              )}
            </div>
          </div>
          <div className="section stats">
            {item.num_samples !== '-' ? (
              <h4>
                {item.num_samples}
                {' '}
                samples
              </h4>
            ) : null}
            <div className="stats-list">
              <div className="item">
                <span className="item-heading">Technology:</span>
                {item.technology === '' ? (
                  'N/A'
                ) : (
                  item.technology
                )}
              </div>
              <br />
              <div className="item">
                <span className="item-heading">Sample Type:</span>
                {item.sample_type === '' ? (
                  'N/A'
                ) : (
                  item.sample_type
                )}
              </div>
              <br />
              <div className="item">
                <span className="item-heading">Species:</span>
                {item.species === '' ? (
                  'N/A'
                ) : (
                  item.species
                )}
              </div>
              <br />
              <div className="item">
                <span className="item-heading">Datatype:</span>
                {item.datatype === '' ? (
                  'N/A'
                ) : (
                  item.datatype
                )}
              </div>
            </div>
          </div>
          <div className="section contact">
            <br />
            <div className="item">
              This dataset is
              {' '}
              <span className="bold">{item.public === 'Yes' ? 'public' : 'available by request only'}</span>
              .
            </div>
            <p />
            <div className="item">
              <span className="item-heading">Contact:</span>
              {' '}
              {item.contact_name}
              {' '}
            </div>
            <p />
            <div className="item">
              <span className="item-heading">Contact email:</span>
              {' '}
              <a href={`mailto:${item.contact_email}`}>Email</a>

              {' '}
            </div>
          </div>
        </div>

      </StyledIndivPage>
    </Layout>

  );
};

export default DatasetsTemplate;
