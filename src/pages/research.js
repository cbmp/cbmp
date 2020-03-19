import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';

const StyledResearch = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    // align-items: center;
    justify-content; center;
    flex-direction: column;
    margin-top:80px;
    
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }

    .container {
        background: var(--contrast-bg);
        width: 100%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0px 80px 0px;
    }

    .container:nth-child(odd) {
        background: var(--contrast-bg); 
    }
    
    .container:nth-child(even) {
        background: white; 
    }
`;

const Research = () => (
    <Layout page="research">
        <StyledResearch>
            <div className="container">
                <div className="section">
                    <h1>Research</h1>
                    <span>Comprehensive molecular profiling and high-performance computing 
                    have begun to transform biomedical research toward deeper 
                    integration of large, complex datasets. While massive data 
                    are routinely generated in research and clinical settings, 
                    analysis of such data are increasingly becoming the bottleneck 
                    in biomedical studies. The Computational Biology and Medicine 
                    Program (CBMP) at the Princess Margaret Cancer Centre develops 
                    innovative computational technologies to address scientific and 
                    clinical gaps, and optimize patient treatment. CBMP will work 
                    toward broadening access to complex cancer data and software tools, 
                    and promoting open science through increased transparency and 
                    reproducibility in biomedical research. Combining expertise in 
                    bioinformatics, epigenomics, proteomics, pharmacogenomics, 
                    biostatistics, machine learning, epidemiology and high-throughput 
                    molecular profiling, CBMP is uniquely positioned to advance cancer 
                    research through basic, translational and clinical approaches. 
                    CBMP will generate new comprehensive molecular datasets with deep 
                    phenotypes, implement novel analytical approaches, and drive 
                    multidisciplinary collaborations. Recognizing the complexity of 
                    translating research findings into real-world applications, CBMP 
                    will develop new assays and computational tools designed from the 
                    outset for broad use by the scientific community and health 
                    practitioners. This will  maximize CBMP’s impact and return of 
                    investment.</span>
                </div>
            </div>
            <div className="container">
                <div className="section">
                    <h1>Action Plan</h1>
                    Coming Soon...
                </div>
            </div>

        </StyledResearch>
    </Layout>
  
)

export default Research;
