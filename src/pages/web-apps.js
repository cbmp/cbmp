import React, {Fragment} from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { StaticQuery, graphql } from "gatsby";
import Grid from '../components/Grid';

const StyledWebapps = styled.div`
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
            padding: 10px 20px;
            border-radius: 50%;
        }
    }
    .container {
        width: 80%;
        // padding-top: 30px;
    }

    
`;

const WebappsQuery = graphql`
    {
        allWebappsCsv (
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
    }
`

const Webapps = () => (
    <Layout page="Webapps">
        <StyledWebapps>
            <div className="container">
                <StaticQuery
                    query={WebappsQuery}
                    render={data => (
                        <Fragment>
                            <h1>Webapps <span className="count">{data.allWebappsCsv.edges.length}</span></h1>
                            <Grid data={data.allWebappsCsv.edges} type="web-apps"/>
                        </Fragment>
                    )}
                />
            </div>
        </StyledWebapps>
    </Layout>
  
)

export default Webapps;
