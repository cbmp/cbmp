import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import Layout from '../components/Layout';

const StyledResearch = styled.div`
    width: 100%;
    min-height: 100vh;
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
        <h1>Research</h1>
        <span>
          Comprehensive molecular profiling and high-performance computing
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
          investment.
        </span>
      </div>
      <div className="container">
        <h1>Action Plan</h1>
        <h2>Defining, Monitoring, and Adapting Cancer Management</h2>
        <h3>Change the clinical conversation by making cancer measurable and actionable.</h3>
        <span>
          The CBMP postulates that optimally selecting and matching quantifiable,
          often high dimensionality, cancer features (i.e., biomarkers) with appropriate
          therapeutic approaches will improve human cancer detection, treatment and monitoring,
          and ultimately improve both efficacy and toxicity outcomes. CBMP is taking a broad,
          multi-disciplinary approach to feature/biomarker selection, using diverse
          clinico-demographic, epidemiological, behavioural, imaging, pathologic,
          serologic and molecular (genomic, epigenomic, transcriptomic, proteomic) data.
          CBMP will develop adaptive tools to identify and link appropriate patterns of
          features to therapeutic management. As the sheer number of features are enormous,
          computational methods are ideal for feature reduction and selection. CBMP will
          also take a broad approach to defining therapeutic management: current active
          examples include cell-free approaches for early detection (CALIBRE), patient
          selection for de-escalating therapy or conversely prolonging therapy by modulating
          radiotherapy dose and field according to real-time tumor responses (MIRACLE),
          improving the precision of drug toxicity phenotyping for better therapeutic
          efficacy-toxicity ratios (DECLIP), and intelligent compound selection within
          large portfolios of novel compounds. One major action item will be to generate
          the evidence that will lead directly to clinical validation, testing in innovative
          feature-matched human trials, and eventual implementation into routine practice.
        </span>
      </div>
      <div className="container">
        <h2>Linking Phenotypes to Molecular Signatures</h2>
        <h3>Nominate new, data-driven questions that can be answered by clinical trials.</h3>
        <span>
          The CBMP will work toward developing predictive computational models to understand
          interactions between genome, epigenome, transcriptome, proteome, and phenotype in human
          cancers. Our goal is to create models that accurately predict how molecular alterations in
          cancer including (i) germline and somatic genetic variants, (ii) gene regulatory changes,
          and (iii) proteome remodelling interact and impact cancer phenotypes. We will
          develop machine learning models of how a genomic/proteomic or experimental perturbation
          leads to a molecular phenotypic output, subsequently validated with targeted experiments
          and retrospective analysis of patient data. The CBMP will investigate the potential
          of preclinical cancer models for developing predictors of drug response. We propose
          to (i) aggregate the pharmacogenomic profiles of preclinical models
          (in vivo, ex vivo, and in vitro models) from the PM Living Biobank and public
          repositories, and (ii) develop novel computational pipelines for robust biomarker
          and target discovery and validation. Linking the preclinical biomarkers to clinical
          genomic profiles has the potential not only to match more patients to clinical trials
          based on the tumor genotypes, but also to increase the response rate by improving
          the quality of the genotype-matching.
        </span>
      </div>
      <div className="container">
        <h2>Software and Data Engineering</h2>
        <h3>Platformization of Everything: put information and tools in the hands of all users.</h3>
        <span>
          Researchers often develop databases and scientific software that have a limited
          scope of application, are brittle and difficult to deploy in other environments,
          sometimes even within the same institution. Software engineers and data coordinators
          address this issue by designing highly modular, documented code and database
          structures following best programming practices using modern technology stacks.
          Recognizing the richness of the datasets and computational approaches developed
          internally, CBMP will promote these best practices and provide the expertise
          necessary for large-scale deployment and dissemination, consequently increasing the
          impact of PM research outputs. Doing so will not only overhaul the quality of the
          research enterprise within PM, but will also put us at the forefront of computational
          biology and medicine as the scientific community will increasingly rely on the
          high-quality data and software tools developed by PM. State-of-the-art software and
          data engineering is essential to ensure research reproducibility, a crucial aspect of
          open science. CBMP will work toward developing computational platforms that provide
          transparent, reproducible, and flexible analytical pipelines for large multimodal
          biomedical data. We will initially focus on the processing of molecular and
          pharmacological profiles of cancer samples through the use of automated processing
          pipelines and versioning to produce fully documented data objects for future analyses.
          We will extend the platform to other data types
          (e.g., patient health records, radiology and pathology imaging) and test its deployment
          on HPC4Health and Microsoft Azure.
        </span>
      </div>

    </StyledResearch>
  </Layout>

);

export default Research;
