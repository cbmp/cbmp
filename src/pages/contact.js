import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import Layout from '../components/Layout';
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
    min-height: 100vh;
    display: flex;
    align-items: center;
    // justify-content; center;
    flex-direction: column;
    margin-top:80px;
    color: var(--main-color);
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }

    img {
      max-width: 300px;
    }

    .container {
        background: white;
        width: 80%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        flex-direction:column;
        padding: 30px 0 80px 0;
    }

    .contact-cont {
      display: flex;
      flex-direction:row;
      justify-content: space-between;
    }
    .members {
      width: 48%;
      display:flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    span {
      flex-basis: 50%;
    }

    .addr-container {
      width: 48%;

      iframe {
        width: 100%;
        margin: 30px 0px 60px 0px;
        height: 400px;
        border: none;
      }
    }
    
`;

const Contact = () => (
  <Layout page="contact">
    <StyledContact>
      <div className="container">
        <h1>Contact</h1>

        <div className="contact-cont">
          <div className="members">
            <span>
              <b>Benjamin Haibe-Kains (Chair)</b>
              <br />
              <a href="mailto:benjamin.haibe-kains@uhnresearch.ca"><img alt="email" src={BHK} /></a>
              <br />
              <br />
            </span>
            <span>
              <b>Michael Hoffman</b>
              <br />
              <a href="mailto:michael.hoffman@utoronto.ca"><img alt="email" src={Hoffman} /></a>
              <br />
              <br />
            </span>
            <span>
              <b>Geoffrey Liu</b>
              <br />
              <a href="mailto:geoffrey.liu@uhn.ca"><img alt="email" src={Liu} /></a>
              <br />
              <br />
            </span>
            <span>
              <b>Mark Minden</b>
              <br />
              <a href="mailto:mark.minden@uhn.ca"><img alt="email" src={Minden} /></a>
              <br />
              <br />
            </span>
            <span>
              <b>Michael Moran</b>
              <br />
              <a href="mailto:m.moran@utoronto.ca"><img alt="email" src={Moran} /></a>
              <br />
              <br />
            </span>
            <span>
              <b>Trevor Pugh</b>
              <br />
              <a href="mailto:trevor.pugh@uhn.ca"><img alt="email" src={Pugh} /></a>
              <br />
              <br />
            </span>
            <span>
              <b>Wei Xu</b>
              <br />
              <a href="mailto:wei.xu@uhnresearch.ca"><img alt="email" src={Xu} /></a>
              <br />
              <br />
            </span>

          </div>

          <div className="addr-container">
            <div className="addr">
              <b>Address</b>
              <br />
              The MaRS Center
              <br />
              101 College Street Toronto, ON
              <br />
              M5G 1L7, Canada
              <p />
              <b>For general inquiries:</b>
              {' '}
              <br />
              {' '}
              <a href="mailto:pm.cbmp@gmail.com"><img src={CBMP} /></a>
            </div>
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.43444669756!2d-79.39085344846093!3d43.65993365990993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b632b77689%3A0x901c210dff19e5a4!2s101%20College%20St%2C%20Toronto%2C%20ON%20M5G%201L7!5e0!3m2!1sen!2sca!4v1581544280286!5m2!1sen!2sca" />

          </div>
        </div>
      </div>

    </StyledContact>
  </Layout>

);

export default Contact;
