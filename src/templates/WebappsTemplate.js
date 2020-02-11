import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';

const StyledWebappsTemplate = styled.div`
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
    webappsCsv( slug: { eq: $slug } ) {
        name 
        lab
        slug
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
        instruction_link
        download_stats_link
    }
  }
`

const WebappsTemplate = ({data}) => {
    const item = data.webappsCsv
    return (
        <Layout page="WebappsTemplate">
            <StyledWebappsTemplate>
                <div className="container">
                    <h1>{item.name}</h1>
                    <div className="info">
                        <span className="heading">Authors:</span> {item.authors} <p/>
                        <span className="heading">Lab:</span> {item.lab} <p/>
                        <span className="heading">Description:</span> {item.long_desc} <p/>
                        <span className="heading">Version:</span> {item.version} <p/>
                        <span className="heading">Keywords:</span> {item.keywords} <p/>
                        <span className="heading">Licensing:</span> {item.licensing} <p/>
                        <span className="heading">Citation:</span> {item.citation} <p/>
                        <span className="heading">Google Scholar Link:</span> [ <a href={item.scholar_link}>Link</a> ] <p/>
                        <span className="heading">Download Link:</span> [ <a href={item.download_link}>Link</a> ] <p/>
                        <span className="heading">Google Scholar Link - Cited by Papers:</span> [ <a href={item.scholar_link_cited}>Link</a> ] <p/>
                    </div>
                </div>
            </StyledWebappsTemplate>
        </Layout>
      
    )
}

export default WebappsTemplate;
