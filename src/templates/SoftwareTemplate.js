import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';
import useFetchDownloadStats from './Hooks/useFetchDownloadStats';

const StyledSoftwareTemplate = styled.div`
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
    }
    h3 {
        font-size:calc(0.8vw + 0.8em);
        font-family: 'Rubik', sans-serif; 
    }
    h4 {
        font-size:calc(0.7vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }
    a {
        margin-top: 10px;
        width: 25%;
        text-align: center;
        padding: 5px 10px;
        background: var(--main-color-lighter);
        color: white;
        border-radius: 7px;
        text-decoration: none;
        font-family: 'Rubik', sans-serif;
        font-size: calc(0.5vw + 0.5em);
        border: 2px solid var(--main-color-lighter);
        &:hover {
            background:white;
            color: var(--main-color-lighter);
        }
    }

    // for each section
    .container {
        font-size:calc(0.5vw + 0.5em);
        width: 80%;
        margin-bottom:20px;
        .section {
            padding: 20px;
            background: var(--contrast-bg);
        }
    }
    .title {
        margin-bottom:0px;
    }
    .info {
        display: flex;
        justify-content: space-between;
        line-height: 1.5em;
        .section {
            width: 45%;
            position: relative;
        } 
        .download {
            position:absolute;
            bottom:20px;
        }
    }
    .citation {
        display: flex;
        line-height: 1.5em;
        .section {
            width: 100%;
        }
    }
    .links {
        display:flex;
        width: 25%;
        justify-content: space-between;
        margin-top:30px;
        a {
            width: 40%;
            font-size: calc(0.5vw + 0.4em);
            padding: 0px 3px;
        }
    }

    // for each item
    .item-info {
        font-size:calc(1vw + 0.3em);
        line-height: calc(1vw + 0.8em);
    }
    .item-heading {
        font-weight: 700;
        margin-right: 10px;
    }
    

`;

export const query = graphql`
  query ($slug: String!) {
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
        scholar_link
        scholar_link_cited
        major_pubs_cited
        download_link
        instruction_link
        download_stats_link
    }
  }
`

const SoftwareTemplate = ({data}) => {
    const item = data.softwareCsv

    // getting download stats
    const {downloadStats, loading} = useFetchDownloadStats(item.name);

    return (
        <Layout page="SoftwareTemplate">
            <StyledSoftwareTemplate>
                <div className="container title">
                    <h1>{item.name}</h1>
                    <h3>{item.short_desc}</h3>
                </div>
                <div className="container info">
                    <div className="section">
                        <span className="item-heading">Description:</span> {item.long_desc} <p/>
                    </div>
                    <div className="section">
                        <span className="item-heading">Authors:</span> {item.authors} <p/>
                        <span className="item-heading">Lab:</span> {item.lab} <p/>
                        <span className="item-heading">Version:</span> {item.version} <p/>
                        <span className="item-heading">Keywords:</span> {item.keywords} <p/>
                        <span className="item-heading">Licensing:</span> {item.licensing} <p/>
                        <div className="download">
                        <a href={item.download_link}>Download</a>
                        </div>
                    </div>
                </div>
                <div className="container title">
                    <h4>Citation</h4>
                </div>
                <div className="container citation">
                    <div className="section">
                        {item.citation}
                        <div className="links">
                            {/* TODO: PUT BACK IN AND CHANGE: width: 70% */}
                            {/* <a href={`/`}>DOI</a> */} 
                            <a href={item.scholar_link}>Google Scholar</a>
                            <a href={item.scholar_link_cited}>Cited By</a>
                        </div>
                    </div>
                </div>
            </StyledSoftwareTemplate>
        </Layout>
      
    )
}

export default SoftwareTemplate;

