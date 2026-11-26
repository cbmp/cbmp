import React from 'react';
import styled from 'styled-components';
import Webapplogo from '../../images/webapp_logo.png';
import Softwarelogo from '../../images/software_logo.png';
import Datasetlogo from '../../images/dataset_logo.png';
import { Link } from 'gatsby'





const StyledQuickLinks = styled.div`
    background: var(--contrast-bg);
    padding: 20px 50px 10px 50px;
    margin: 30px 30px 30px 30px;
    border-radius: 30px;
    overflow: hidden
    
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }

    .quicklink-container {
        width: 100%;
        margin-top:10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    
    .quicklink {
        flex-basis: 10%;
        margin: 10px 70px 10px 70px;
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
        font-size: 22px;
        font-weight: bold;
        color: #025677;
      }
    }
`;

const QuickLinks = () => (
<StyledQuickLinks id = "links"> 
    <h1>Resources</h1>
    <div className="quicklink-container">
        <div className="quicklink">
            <Link to="/software"><img src={Softwarelogo}/>
            <a className="title">Software</a>
            </Link>
        </div>
        <div className="quicklink">
            <Link to="/web-apps"><img src={Webapplogo}/>
            <a className="title">Webapps</a>
            </Link>
        </div>
         <div className="quicklink">
            <Link to="/datasets"><img src={Datasetlogo}/>
            <a className="title">Datasets</a>
            </Link>
        </div>
        </div>
</StyledQuickLinks>
);

export default QuickLinks;