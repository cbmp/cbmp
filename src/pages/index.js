import React from "react"
import styled from "styled-components"
import '../styles/index.css';
import Layout from '../components/Layout';
// import Mission from '../components/Home/Mission';
import Members from '../components/Home/Members';
import bg from '../images/bg-dark.jpg';
import Header from '../components/Header';
import scrollTo from 'gatsby-plugin-smoothscroll';

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
    font-size:calc(1.8vw + 0.7em);
    font-family: 'Rubik', sans-serif; 
    letter-spacing:1px;
    line-height:calc(2vw + 1.5em);
    padding-bottom:30px;
  }

  .statement {
    margin-top: 30px;
    padding: 30px 20px;
    max-width: 45%;
    color: white;
    font-size: calc(0.8vw + 0.3em);
    line-height: calc(0.8vw + 1.3em);
    letter-spacing: 1px;
    background: rgb(0,0,0,0.3);
    border-radius:30px;
  }
`

const StyledButton = styled.button`
  margin-top: 80px;
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
    <Header page="home"/>
    <StyledHome>
      <div className="container">
        <div className="intro">
            A home to scientists and clinicians 
                focused on computational methods 
                for fully exploiting cancer data.
        </div>
        <div className="statement">
              The Computational Biology and Medicine Program (CBMP) 
              is home to scientists and clinicians focused on computational 
              methods for fully exploiting cancer data. CBMP will formulate 
              and test scientific hypotheses answerable by new computational 
              methods that advance basic, translational, and clinical cancer 
              research. The program will also inform the scope of institutional 
              infrastructure projects and software to best support data science 
              efforts.
        </div>
      </div>
      <StyledButton onClick={() => scrollTo('#members')}>v</StyledButton>
    </StyledHome>
    {/* <Mission/> */}
    <Members/>
  </Layout>
  
)

export default IndexPage
