import React from "react";
import styled from 'styled-components';
import logo from '../../images/logo-blue.png';

const StyledMission = styled.div`
    background: white;
    width: 100vw;
    padding: 160px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .item {
        flex-basis: 100%;
    }

    .logo img {
        width: 47%;
        float: right;
        margin-right: 300px;
    }

    .statement {
        font-size: calc(1vw + 0.3em);
        line-height: calc(1vw + 1.3em);
        margin-right: 100px;
        margin-left: -200px;
    }
`;

const Mission = () => (
  <StyledMission>
    <div className="item logo">
        <img alt="logo" src={logo}/>
    </div>
    <div className="item statement">
        The Computational Biology and Medicine Program (CBMP) 
        is home to scientists and clinicians focused on computational 
        methods for fully exploiting cancer data. CBMP will formulate 
        and test scientific hypotheses answerable by new computational 
        methods that advance basic, translational, and clinical cancer 
        research. The program will also inform the scope of institutional 
        infrastructure projects and software to best support data science 
        efforts.
    </div>
  </StyledMission>
)
  



export default Mission;
