import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import {StyledIndivPage} from '../styles/indiv_page'

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

    return (
        <Layout page="SoftwareTemplate">
            <StyledIndivPage>
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
            </StyledIndivPage>
        </Layout>
      
    )
}

export default SoftwareTemplate;

