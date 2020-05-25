import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';
import BHK from '../images/emails/BHKemail.png';
import Hoffman from '../images/emails/Hoffmanemail.png';
import Liu from '../images/emails/Liuemail.png';
import Pugh from '../images/emails/Pughemail.png';
import Xu from '../images/emails/Xuemail.png';
import Minden from '../images/emails/Mindenemail.png';
import Moran from '../images/emails/Moranemail.png';
import CBMP from '../images/emails/CBMPemail.png';

const StyledContact = styled.div`
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
        background: white;
        width: 100%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0px 80px 0px;
    }

`;

const Contact = () => (
    <Layout page="contact">
        <StyledContact>
            <div className="container">
                <div className="section">
                    <h1>Contact</h1>
                    <span>
                        <b>Benjamin Haibe-Kains (Chair)</b> 
                        <br/>
                        <a href="mailto:benjamin.haibe-kains@uhnresearch.ca"><img alt="email" src={BHK}/></a>
                        <br/><br/>
                    </span>
                    <span>
                        <b>Michael Hoffman</b>
                       <br/>
                        <a href="mailto:michael.hoffman@utoronto.ca"><img alt="email" src={Hoffman}/></a>
                        <br/><br/>
                    </span>
                    <span>
                        <b>Geoffrey Liu</b>
                        <br/>
                        <a href="mailto:geoffrey.liu@uhn.ca"><img alt="email" src={Liu}/></a>
                        <br/><br/>
                    </span>
                    <span>
                        <b>Mark Minden</b>
                        <br/>
                        <a href="mailto:mark.minden@uhn.ca"><img alt="email" src={Minden}/></a>
                        <br/><br/>
                    </span>
                    <span>
                        <b>Michael Moran</b>
                        <br/>
                        <a href="mailto:m.moran@utoronto.ca"><img alt="email" src={Moran}/></a>
                        <br/><br/>
                    </span>
                    <span>
                       <b>Trevor Pugh</b>
                        <br/>
                        <a href="mailto:trevor.pugh@uhn.ca"><img alt="email" src={Pugh}/></a>
                        <br/><br/>
                    </span>
                    <span>
                        <b>Wei Xu</b>
                        <br/>
                        <a href="mailto:wei.xu@uhnresearch.ca"><img alt="email" src={Xu}/></a>
                        <br/><br/>
                    </span>
                    <span>
                        <b>For General Inquiries</b> 
                        <br/>
                        <a href="mailto:pm.cbmp@gmail.com"><img src={CBMP}/></a>
                    </span>

                   
                </div>
            </div>

        </StyledContact>
    </Layout>
  
)

export default Contact;