import React, {Fragment} from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { StaticQuery, graphql } from "gatsby";
import Grid from '../components/Grid';

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
        }
    }
    .container {
        width: 80%;
        // padding-top: 30px;
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
                    short_desc
                    keywords
                } 
            }
        }
    }
`

const Software = () => (
    <Layout page="Software">
        <StyledSoftware>
            <div className="container">
                <StaticQuery
                    query={SoftwareQuery}
                    render={data => (
                        <Fragment>
                            <h1>Software <span className="count">{data.allSoftwareCsv.edges.length}</span></h1>
                            <Grid data={data.allSoftwareCsv.edges} type="software"/>
                        </Fragment>
                    )}
                />
            </div>
        </StyledSoftware>
    </Layout>
  
)

export default Software;
