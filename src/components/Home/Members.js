import React from 'react';
import styled from 'styled-components';
import ben from '../../images/members/ben.png';
import hoffman from '../../images/members/hoffman.png';
import liu from '../../images/members/liu.png';
import minden from '../../images/members/minden.png';
import moran from '../../images/members/moran.png';
import pugh from '../../images/members/pugh.png';
import wei from '../../images/members/wei.png';
import gaiti from '../../images/members/gaiti.png';
import kumar from '../../images/members/kumar.png';
import schwartz from '../../images/members/schwartz.png';
import labs from '../../data/labs';

const StyledMembers = styled.div`
    background: var(--contrast-bg);
    padding: 60px 150px 200px 150px;
    
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }

    .member-container {
        width: 100%;
        margin-top:50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    
    .member {
        flex-basis: 21%;
        margin: 50px 30px 80px 30px;
        width: 180px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align:center;
        
        & img {
            width: 180px;
        }

        & span {
            margin-top: 20px;
            font-size: 18px;
        }
    }
`;

const Members = ({ id }) => (
  <StyledMembers id="members">
    <h1>Members</h1>
    <div className="member-container">
      <div className="member">
        <a href={labs.Gaiti.website}><img alt="member" src={gaiti} /></a>
        <span><a href={labs.Gaiti.website}>Federico Gaiti</a></span>
      </div>
      <div className="member">
        <a href={labs['Haibe-Kains'].website}><img alt="member" src={ben} /></a>
        <span><a href={labs['Haibe-Kains'].website}>Benjamin Haibe-Kains</a></span>
      </div>
      <div className="member">
        <a href={labs.Hoffman.website}><img alt="member" src={hoffman} /></a>
        <span><a href={labs.Hoffman.website}>Michael Hoffman</a></span>
      </div>
      <div className="member">
        <a href={labs.CCG.website}><img alt="member" src={kumar} /></a>
        <span><a href={labs.CCG.website}>Sushant Kumar</a></span>
      </div>
      <div className="member">
        <a href={labs.Liu.website}><img alt="member" src={liu} /></a>
        <span><a href={labs.Liu.website}>Geoffrey Liu</a></span>
      </div>
      <div className="member">
        <a href={labs.Minden.website}><img alt="member" src={minden} /></a>
        <span><a href={labs.Minden.website}>Mark Minden</a></span>
      </div>
      <div className="member">
        <a href={labs.Moran.website}><img alt="member" src={moran} /></a>
        <span><a href={labs.Moran.website}>Michael Moran</a></span>
      </div>
      <div className="member">
        <a href={labs.Pugh.website}><img alt="member" src={pugh} /></a>
        <span><a href={labs.Pugh.website}>Trevor Pugh</a></span>
      </div>
      <div className="member">
        <a href={labs.Schwartz.website}><img alt="member" src={schwartz} /></a>
        <span><a href={labs.Schwartz.website}>Gregory Schwartz</a></span>
      </div>
      <div className="member">
        <a href={labs.Xu.website}><img alt="member" src={wei} /></a>
        <span><a href={labs.Xu.website}>Wei Xu</a></span>
      </div>
    </div>
  </StyledMembers>
);


export default Members;
