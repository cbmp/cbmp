import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const StyledDatasetsTemplate = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items:center;
    flex-direction: column;
    margin-top:80px;
    padding: 30px 0px 80px 0px;

    h1 {
        font-size:calc(1.8vw + 1.5em);
        font-family: 'Rubik', sans-serif; 

        span {
            background: var(--main-color);
            color: white;
            font-size: calc(0.5vw + 0.5em);
            padding: 10px;
            border-radius: 50%;
        }
    }
    .info {
        font-size:calc(1vw + 0.3em);
        line-height: calc(1vw + 0.8em);
    }
    .heading {
        font-weight: 700;
        margin-right: 10px;
        text-decoration: underline;
    }
    .container {
        width: 80%;
        // padding-top: 30px;
    }
    a {
        color: var(--link-hov-dark)
    }

`;

export const query = graphql`
  query ($slug: String!) {
    datasetsCsv( slug: { eq: $slug } ) {
        name
        lab
        year_created
        year_updated
        slug
        long_desc
        authors
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
    }
  }
  `;


const DatasetsTemplate = ({ data }) => {
  const item = data.datasetsCsv;
  return (
    <Layout page="DatasetsTemplate">
      <StyledDatasetsTemplate>
        <div className="container">
          <h1>{item.name}</h1>
          <div className="info">
            <span className="heading">Authors:</span>
            {' '}
            {item.authors}
            {' '}
            <p />
            <span className="heading">Lab:</span>
            {' '}
            {item.lab}
            {' '}
            <p />
            <span className="heading">Year:</span>
            {' '}
            {item.year_created}
            {' '}
            <p />
            <span className="heading">Description:</span>
            {' '}
            {item.long_desc}
            {' '}
            <p />
            <span className="heading">Number of samples:</span>
            {' '}
            {item.num_samples}
            {' '}
            <p />
            <span className="heading">Technology:</span>
            {' '}
            {item.technology}
            {' '}
            <p />
            <span className="heading">Version:</span>
            {' '}
            {item.version}
            {' '}
            <p />
            <span className="heading">Keywords:</span>
            {' '}
            {item.keywords}
            {' '}
            <p />
            <span className="heading">Licensing:</span>
            {' '}
            {item.licensing}
            {' '}
            <p />
            <span className="heading">Citation:</span>
            {' '}
            {item.citation}
            {' '}
            <p />
            <span className="heading">Google Scholar Link:</span>
            {' '}
            [
            {' '}
            <a href={item.publication_link}>Link</a>
            {' '}
            ]
            {' '}
            <p />
            <span className="heading">Download Link:</span>
            {' '}
            [
            {' '}
            <a href={item.download_link}>Link</a>
            {' '}
            ]
            {' '}
            <p />
            <span className="heading">Google Scholar Link - Cited by Papers:</span>
            {' '}
            [
            {' '}
            <a href={item.scholar_link_cited}>Link</a>
            {' '}
            ]
            {' '}
            <p />
          </div>
        </div>
      </StyledDatasetsTemplate>
    </Layout>

  );
};

export default DatasetsTemplate;
