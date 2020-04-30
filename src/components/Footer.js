import { Link } from "gatsby";
import React from "react";
import styled from 'styled-components';
import logo from '../images/logo-white.png';

const StyledFooter = styled.div`
    width: 100%;
    bottom:0px;
    right:0px;
    padding: 10px 0;
    white-space:nowrap;
    background-color: var(--footer-bg);
    font-size: calc(0.8em + 0.2vw);
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
        float:left;

        & img {
            width: 90px;
            margin-right:10px;
        }
    }
     

    .links {
        margin-left: 10vw;
        width: 40%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        & a {
            // flex-basis: 33%;
            flex-basis:50%;
            color: white;
            text-decoration: none;
            font-size: calc(0.2vw + 0.8em);
            margin: 5px 0px;
            letter-spacing: 0px;
            font-family: 'Lato', sans-serif;
        }
    }

    .links a:hover {
        color: #fab058;
    }

    .contact {
        & h2 {
            margin: 0px 0px 5px 0px;
            font-size: calc(0.2vw + 1em);
            font-family: 'Rubik', sans-serif;
            font-weight: none;
            border-bottom: 1px solid white;
            padding-bottom:3px;
        }
        text-align: center;
        color: white;
        font-size: calc(0.2vw + 0.6em);
        margin-left: 5vw;
        line-height: calc(0.2vw + 1.2em);
    }

`;

const Footer = () => (
    <StyledFooter>
        <div className="logo">
            <Link to="/"><img alt="logo" src={logo}/></Link>
        </div>
        <div className="links">
            <Link to="/research">Research</Link>
            <Link to="/web-apps">Web Apps</Link>
            {/* <Link to="/publications">Publications/Achievements</Link> */}
            <Link to="/software">Software</Link>
            <Link to="/datasets">Datasets</Link>
        </div>
        <div className="contact">
            <h2>Contact</h2>
            200 Elizabeth Street, <br/>
            Toronto, Ontario <br/>
            M5G 2C4 
        </div>
    </StyledFooter>
)
  



export default Footer;
