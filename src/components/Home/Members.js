import React from 'react';
import styled from 'styled-components';

import Gary from '../../images/members/all/Gary_Bader_headshot_lores.png';
import Philippe from '../../images/members/all/Philippe_Bedard_headshot_lores.png';
import Alejandro from '../../images/members/all/Alejandro_Berlin_headshot_lores.png';
import MichaelB from '../../images/members/all/Michael_Brudno_headshot_lores.png';
import David from '../../images/members/all/David_Cescon_headshot_lores.png';
import Federico from '../../images/members/all/Federico_Gaiti_headshot_lores.png';
import RobertG from '../../images/members/all/Robert_Grant_headshot_lores.png';
import Benjamin from '../../images/members/all/Benjamin_Haibe-Kains_headshot_lores.png';
import Masoom from '../../images/members/all/Masoom_Haider_headshot_lores.png';
import MichaelH from '../../images/members/all/Michael_Hoffman_headshot_lores.png';
import Andrew from '../../images/members/all/Andrew_Hope_headshot_lores.png';
import RobertK from '../../images/members/all/Robert_Kridel_headshot_lores.png';
import Sushant from '../../images/members/all/Sushant_Kumar_headshot_lores.png';
import Natasha from '../../images/members/all/Natasha_Leighl_headshot_lores.png';
import FeiFei from '../../images/members/all/Fei-Fei_Liu_headshot_lores.png';
import Geoffrey from '../../images/members/all/Geoffrey_Liu_headshot_lores.png';
import Mark from '../../images/members/all/Mark_Minden_headshot_lores.png';
import Mike from '../../images/members/all/Mike_Moran_headshot_lores.png';
import Trevor from '../../images/members/all/Trevor_Pugh_headshot_lores.png';
import Gregory from '../../images/members/all/Gregory_Schwartz.png';
import Jan from '../../images/members/all/Jan_Seuntjens_headshot_lores.png';
import Wei from '../../images/members/all/Wei_Xu_headshot_lores.png';
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
        flex-basis: 10%;
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
      .title {
        font-size: 15px;
      }
    }
`;

const Members = ({ id }) => (
  <StyledMembers id="members">
    <h1>Members</h1>
    <div className="member-container">
      <div className="member">
        <a href={labs.Bader.website}><img alt="member" src={Gary} /></a>
        <span><a href={labs.Bader.website}>Gary Bader</a></span>
        <span className="title">{labs.Bader.group}</span>
      </div>
      <div className="member">
        <a href={labs.Bedard.website}><img alt="member" src={Philippe} /></a>
        <span><a href={labs.Bedard.website}>Philippe Bedard</a></span>
        <span className="title">{labs.Bedard.group}</span>
      </div>
      <div className="member">
        <a href={labs.Berlin.website}><img alt="member" src={Alejandro} /></a>
        <span><a href={labs.Berlin.website}>Alejandro Berlin</a></span>
        <span className="title">{labs.Berlin.group}</span>
      </div>
      <div className="member">
        <a href={labs.Brudno.website}><img alt="member" src={MichaelB} /></a>
        <span><a href={labs.Brudno.website}>Michael Brudno</a></span>
        <span className="title">{labs.Brudno.group}</span>
      </div>
      <div className="member">
        <a href={labs.Cescon.website}><img alt="member" src={David} /></a>
        <span><a href={labs.Cescon.website}>David Cescon</a></span>
        <span className="title">{labs.Cescon.group}</span>
      </div>
      <div className="member">
        <a href={labs.Gaiti.website}><img alt="member" src={Federico} /></a>
        <span><a href={labs.Gaiti.website}>Federico Gaiti</a></span>
        <span className="title">{labs.Gaiti.group}</span>
      </div>
      <div className="member">
        <a href={labs.Grant.website}><img alt="member" src={RobertG} /></a>
        <span><a href={labs.Grant.website}>Robert Grant</a></span>
        <span className="title">{labs.Grant.group}</span>
      </div>
      <div className="member">
        <a href={labs['Haibe-Kains'].website}><img alt="member" src={Benjamin} /></a>
        <span><a href={labs['Haibe-Kains'].website}>Benjamin Haibe-Kains</a></span>
        <span className="title">{labs['Haibe-Kains'].group}</span>
      </div>
      <div className="member">
        <a href={labs.Haider.website}><img alt="member" src={Masoom} /></a>
        <span><a href={labs.Haider.website}>Masoom Haider</a></span>
        <span className="title">{labs.Haider.group}</span>
      </div>
      <div className="member">
        <a href={labs.Hope.website}><img alt="member" src={Andrew} /></a>
        <span><a href={labs.Hope.website}>Andrew Hope</a></span>
        <span className="title">{labs.Hope.group}</span>
      </div>
      <div className="member">
        <a href={labs.Hoffman.website}><img alt="member" src={MichaelH} /></a>
        <span><a href={labs.Hoffman.website}>Michael Hoffman (Chair)</a></span>
        <span className="title">{labs.Hoffman.group}</span>
      </div>
      <div className="member">
        <a href={labs.Kridel.website}><img alt="member" src={RobertK} /></a>
        <span><a href={labs.Kridel.website}>Robert Kridel</a></span>
        <span className="title">{labs.Kridel.group}</span>
      </div>
      <div className="member">
        <a href={labs.CCG.website}><img alt="member" src={Sushant} /></a>
        <span><a href={labs.CCG.website}>Sushant Kumar</a></span>
        <span className="title">{labs.CCG.group}</span>
      </div>
      <div className="member">
        <a href={labs.Leighl.website}><img alt="member" src={Natasha} /></a>
        <span><a href={labs.Leighl.website}>Natasha Leighl</a></span>
        <span className="title">{labs.Leighl.group}</span>
      </div>
      <div className="member">
        <a href={labs.LiuF.website}><img alt="member" src={FeiFei} /></a>
        <span><a href={labs.LiuF.website}>Fei-Fei Liu</a></span>
        <span className="title">{labs.LiuF.group}</span>
      </div>
      <div className="member">
        <a href={labs.LiuG.website}><img alt="member" src={Geoffrey} /></a>
        <span><a href={labs.LiuG.website}>Geoffrey Liu</a></span>
        <span className="title">{labs.LiuG.group}</span>
      </div>
      <div className="member">
        <a href={labs.Minden.website}><img alt="member" src={Mark} /></a>
        <span><a href={labs.Minden.website}>Mark Minden</a></span>
        <span className="title">{labs.Minden.group}</span>
      </div>
      <div className="member">
        <a href={labs.Moran.website}><img alt="member" src={Mike} /></a>
        <span><a href={labs.Moran.website}>Michael Moran</a></span>
        <span className="title">{labs.Moran.group}</span>
      </div>
      <div className="member">
        <a href={labs.Pugh.website}><img alt="member" src={Trevor} /></a>
        <span><a href={labs.Pugh.website}>Trevor Pugh</a></span>
        <span className="title">{labs.Pugh.group}</span>
      </div>
      <div className="member">
        <a href={labs.Schwartz.website}><img alt="member" src={Gregory} /></a>
        <span><a href={labs.Schwartz.website}>Gregory Schwartz</a></span>
        <span className="title">{labs.Schwartz.group}</span>
      </div>
      <div className="member">
        <a href={labs.Seuntjens.website}><img alt="member" src={Jan} /></a>
        <span><a href={labs.Seuntjens.website}>Jan Seuntjens</a></span>
        <span className="title">{labs.Seuntjens.group}</span>
      </div>
      <div className="member">
        <a href={labs.Xu.website}><img alt="member" src={Wei} /></a>
        <span><a href={labs.Xu.website}>Wei Xu</a></span>
        <span className="title">{labs.Xu.group}</span>
      </div>
    </div>
  </StyledMembers>
);


export default Members;
