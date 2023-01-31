import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Email from '../images/emails/email.png';
import CBMP from '../images/emails/CBMPemail.png';

const StyledContact = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
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
      margin-bottom: 30px;
      min-width: 310px;
    }
    .name {
      display: flex;
      flex-direction: row;
      & b {
        min-width: 165px;
      }
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

const StyledEmail = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    flex-direction: row;
    white-space: nowrap;
    background-color: var(--main-color-darker);
    border-radius: 3.5px;
    .email {
      padding: 3px;
      margin: 2px;
      height: 24px;
      background-color: white;
      border-radius: 3.5px;
      font-family: 'Rubik', sans-serif;
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
      .text {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        color: #11759c;
        font-size: clamp(2px, calc(1vw + 2px), 14px);
      }
    }
    img {
      margin: 0px 7px;
      width: 25px;
    }
`;


const Contact = () => (
  <Layout page="contact">
    <StyledContact>
      <div className="container">
        <h1>Contact</h1>

        <div className="contact-cont">
          <div className="members">
            <span className="name">
              <b>Gary Bader</b>
              <a href="mailto:gary.bader@utoronto.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">gary.bader@utoronto.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Philippe Bedard</b>
              <a href="mailto:philippe.bedard@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">philippe.bedard@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Alejandro Berlin</b>
              <a href="mailto:alejandro.berlin@rmp.uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">alejandro.berlin@rmp.uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Michael Brudno</b>
              <a href="mailto:brudno@cs.toronto.edu">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">brudno@cs.toronto.edu​</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>David Cescon</b>
              <a href="mailto:dave.cescon@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">dave.cescon@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Federico Gaiti</b>
              <a href="mailto:Federico.Gaiti@uhnresearch.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">federico.gaiti@uhnresearch.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Robert Grant</b>
              <a href="mailto:robert.grant@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">robert.grant@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Benjamin Haibe-Kains</b>
              <a href="mailto:benjamin.haibe-kains@uhnresearch.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">benjamin.haibe-kains@uhnresearch.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Masoom Haider</b>
              <a href="mailto:m.haider@utoronto.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">m.haider@utoronto.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Andrew Hope</b>
              <a href="mailto:Andrew.Hope@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">Andrew.Hope@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Michael Hoffman (Chair)</b>
              <a href="mailto:michael.hoffman@utoronto.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">michael.hoffman@utoronto.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Robert Kridel</b>
              <a href="mailto:robert.kridel@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">robert.kridel@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Sushant Kumar</b>
              <a href="mailto:Sushant.Kumar@uhnresearch.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">sushant.kumar@uhnresearch.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Natasha Leighl</b>
              <a href="mailto:">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">natasha.leighl@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Fei-Fei Liu</b>
              <a href="mailto:Fei-Fei.Liu@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">Fei-Fei.Liu@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Geoffrey Liu</b>
              <a href="mailto:geoffrey.liu@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">geoffrey.liu@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Mark Minden</b>
              <a href="mailto:mark.minden@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">mark.minden@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Michael Moran</b>
              <a href="mailto:m.moran@utoronto.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">m.moran@utoronto.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Trevor Pugh</b>
              <a href="mailto:trevor.pugh@uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">trevor.pugh@uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Gregory Schwartz</b>
              <a href="mailto:Gregory.Schwartz@uhnresearch.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">gregory.schwartz@uhnresearch.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Jan Seuntjens</b>
              <a href="mailto:jan.seuntjens@rmp.uhn.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">jan.seuntjens@rmp.uhn.ca</div></div>
                </StyledEmail>
              </a>
            </span>
            <span className="name">
              <b>Wei Xu</b>
              <a href="mailto:wei.xu@uhnresearch.ca">
                <StyledEmail>
                  <img alt="email" src={Email} />
                  <div className="email"><div className="text">wei.xu@uhnresearch.ca</div></div>
                </StyledEmail>
              </a>
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
              {/* <b>For general inquiries:</b>
              {' '}
              <br />
              {' '}
              <a href="mailto:pm.cbmp@gmail.com">
                <img src={CBMP} />
              </a> */}
              <span>
                <b>For general inquiries, contact Paul Brogee (Program Manager):</b>
                <a href="mailto:paul.brogee@uhnresearch.ca">
                  <StyledEmail>
                    <img alt="email" src={Email} />
                    <div className="email"><div className="text">paul.brogee@uhnresearch.ca</div></div>
                  </StyledEmail>
                </a>
              </span>
            </div>
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.43444669756!2d-79.39085344846093!3d43.65993365990993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b632b77689%3A0x901c210dff19e5a4!2s101%20College%20St%2C%20Toronto%2C%20ON%20M5G%201L7!5e0!3m2!1sen!2sca!4v1581544280286!5m2!1sen!2sca" />

          </div>
        </div>
      </div>

    </StyledContact>
  </Layout>

);

export default Contact;
