import { Link } from "gatsby";
import React from "react";
import styled from 'styled-components';
import logo from '../images/logo-white.png';

const StyledHeader = styled.div`
  position:${props => props.page === "home" ? "absolute" : "fixed"};
  width:100%;
  background: ${props => props.page === "home" ? "none" : "var(--header-bg)"};
  padding:5px 0px;
  height: 70px;
  top: 0px;
  z-index:999;

  a {
    color: white;
    text-decoration: none;
  }
`

const StyledLogo = styled.div`
  margin-left: 40px;
  float:left;
  color: white;
  font-family: 'Lato', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: calc(0.2vw + 0.8em);

  & img {
    width: 70px;
    margin-right:10px;
  }
`;
 
const StyledLinks = styled.div`
  margin-top:25px;
  float:right;
  margin-right:20px;

  & a {
    color: white;
    text-decoration: none;
    font-weight: 400;
    font-size: calc(0.2vw + 0.8em);
    margin: 0px 30px;
    letter-spacing: 1px;
    font-family: 'Lato', sans-serif;
  }

  & a:hover {
    color: var(--link-hov);
  }
`;


const Header = ({page}) => (
  <StyledHeader page={page}>
    <StyledLogo>
        <Link to="/"><img alt="logo" src={logo}/></Link>
        <Link to="/">Computational Biology <br/> and Medicine Program</Link>
    </StyledLogo>
    <StyledLinks>
        <Link to="/research">Research</Link>
        <Link to="/software">Software</Link>
        <Link to="/web-apps">Web Apps</Link>
        <Link to="/datasets">Datasets</Link>
        <Link to="/publications">Publications/Achievements</Link>
    </StyledLinks>
  </StyledHeader>
)
  



export default Header;
