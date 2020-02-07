import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';

const StyledPublications = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content; center;
    flex-direction: column;
    margin-top:80px;
    
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }

    .container {
        // background: var(--contrast-bg);
        width: 100%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0px 80px 0px;
    }

`;

const Publications = () => (
    <Layout page="Publications">
        <StyledPublications>
            <div className="container">
                <h1>Coming Soon..</h1>
            </div>
        </StyledPublications>
    </Layout>
  
)

export default Publications;
