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
        The Computational Biology and Medicine Program (CBMP) is home to 
        scientists and clinicians interested in computational methods used to 
        aggregate, analyze and share biomedical data for basic, translational 
        and clinical research. By assessing how emerging computational technologies 
        can be leveraged to address scientific and clinical gaps, CMBP is working 
        towards the dissemination of multimodal data and software tools, education 
        regarding their use, alignment with internal and external initiatives, and 
        fostering synergies within and across programs.
    </div>
  </StyledMission>
)
  



export default Mission;
