import React from 'react';
import styled from 'styled-components';
import '../styles/index.css';
import scrollTo from 'gatsby-plugin-smoothscroll';
import Layout from '../components/Layout';
// import Mission from '../components/Home/Mission';
import Members from '../components/Home/Members';
import bg from '../images/bg.jpg';
import Header from '../components/Header';

const StyledHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width:100vw;
  height:100vh;
  color: white;
  background: url(${bg}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow-x: hidden;
  margin:0px;
  min-height:100%;

  .container {
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    text-align:center;
    flex-wrap: wrap;
  }

  .intro {
    max-width: 65%;
    font-size:calc(1.5vw + 0.5em);
    font-family: 'Rubik', sans-serif; 
    letter-spacing:1px;
    line-height:calc(2vw + 1.3em);
    padding-bottom:25px;
  }

  .statement {
    margin-top: 25px;
    padding: 30px 20px;
    max-width: 45%;
    color: white;
    font-size: calc(0.8vw + 0.3em);
    line-height: calc(0.8vw + 1.3em);
    letter-spacing: 1px;
    background: rgb(0,0,0,0.3);
    border-radius:30px;
  }
`;

const StyledButton = styled.button`
  margin-top: 60px;
  margin-bottom: -80px;
  font-family: 'Orbitron', sans-serif;
  background: none;
  color: white;
  border: none;
  font-size: 30px;
  cursor: pointer;
  transition: all .3s ease-out;

  &:focus {
    outline: none;
  }

  &:hover {
    color: var(--link-hov);
    transition: all .3s ease-out;
    transform: translate(0,5px);
  }
`;

const IndexPage = () => (
  <Layout page="home">
    <StyledHome>
      <div className="container">
        <div className="intro">
          A home to scientists and clinicians
          focused on computational methods
          for fully exploiting cancer data.
        </div>
        <div className="statement">
          The Computational Biology and Medicine Program (CBMP) is home to 
        scientists and clinicians interested in computational methods used to 
        aggregate, analyze and share biomedical data for basic, translational 
        and clinical research. By assessing how emerging computational technologies 
        can be leveraged to address scientific and clinical gaps, CMBP is working 
        towards the dissemination of multimodal data and software tools, education 
        regarding their use, alignment with internal and external initiatives, and 
        fostering synergies within and across programs.
        </div>
      </div>
      <StyledButton onClick={() => scrollTo('#members')}>v</StyledButton>
    </StyledHome>
    <Members />
  </Layout>

);

export default IndexPage;
