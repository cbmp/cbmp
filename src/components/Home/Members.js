import React from "react";
import styled from 'styled-components';
import ben from '../../images/members/ben.png';
import hoffman from '../../images/members/hoffman.png';
import liu from '../../images/members/liu.png';
import minden from '../../images/members/minden.png';
import moran from '../../images/members/moran.png';
import pugh from '../../images/members/pugh.png';
import wei from '../../images/members/wei.png';

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

const Members = ({id}) => (
    <StyledMembers id="members">
        <h1>Members</h1>
        <div className="member-container">
            <div className="member">
                <img alt="member" src={ben}/>
                <span>Benjamin Haibe-Kains</span>
            </div>
            <div className="member">
                <img alt="member" src={hoffman}/>
                <span>Michael Hoffman</span>
            </div>
            <div className="member">
                <img alt="member" src={liu}/>
                <span>Geoffrey Liu</span>
            </div>
            <div className="member">
                <img alt="member" src={minden}/>
                <span>Mark Minden</span>
            </div>
            <div className="member">
                <img alt="member" src={moran}/>
                <span>Michael Moran</span>
            </div>
            <div className="member">
                <img alt="member" src={pugh}/>
                <span>Trevor Pugh</span>
            </div>
            <div className="member">
                <img alt="member" src={wei}/>
                <span>Wei Xu</span>
            </div>
        </div>
    </StyledMembers>
)
  



export default Members;
