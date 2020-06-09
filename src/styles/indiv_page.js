/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const StyledIndivPage = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items:center;
    flex-direction: column;
    margin-top:80px;
    padding: 30px 0px 80px 0px;
    h1 {
        font-size:calc(1.8vw + 1.5em);
        font-family: 'Rubik', sans-serif; 
    }
    h3 {
        font-size:calc(0.8vw + 0.8em);
        font-family: 'Rubik', sans-serif; 
    }
    h4 {
        font-size:calc(0.7vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }
    a {
        // width: 25%;
        text-align: center;
        padding: 5px 10px;
        background: var(--main-color-lighter);
        color: white;
        border-radius: 7px;
        text-decoration: none;
        font-family: 'Rubik', sans-serif;
        font-size: calc(0.5vw + 0.5em);
        border: 2px solid var(--main-color-lighter);
        &:hover {
            background:white;
            color: var(--main-color-lighter);
        }
    }

    // disabled link
    .disabled {
        cursor: default;
        background: var(--disabled-link);
        border-color: var(--disabled-link);
        &:hover {
            background: var(--disabled-link);
            border-color: var(--disabled-link);
            color: white;
        }
    }

    // for each section
    .container {
        font-size:calc(0.5vw + 0.5em);
        width: 80%;
        margin-bottom:40px;
        .section {
            padding: 20px;
            background: var(--contrast-bg);
        }
    }
    .title {
        margin-bottom:0px;
    }
    .info {
        display: flex;
        justify-content: space-between;
        line-height: 1.5em;
        height: 35vh;
        .section {
            width: 46%;
            position: relative;
        } 
        .info-section {
            display:flex;
            flex-direction:column;
            justify-content: space-between;
        }
        .info-list {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 80%;
        }
        .long-desc {
            overflow-y: auto;
        }
        .download {
            align-self: end;
            a {
                font-size: calc(0.5vw + 0.4em);
                padding: 3px 10px;
                margin-right: 20px;
            }
        }
    }
    .citation-contact {
        h4 {
            margin:10px 0 20px 0;
        }
        height:auto;
    }
    .citation {
        line-height: 1.5em;
        & .section {
            width: 100%;
        }
        
    }
    .links {
        display:flex;
        justify-content: flex-start;
        margin-top:40px;
        a {
            font-size: calc(0.5vw + 0.4em);
            padding: 3px 10px;
            margin-right: 20px;
        }
    }

    // for each item
    .item-info {
        font-size:calc(1vw + 0.3em);
        line-height: calc(1vw + 0.8em);
    }
    .item-heading {
        font-weight: 700;
        margin-right: 10px;
    }
    
    .stats {
        display: flex;
        flex-direction:column;
        .section {
            width: calc(100% - 40px);
        }
        h4 {
            margin:10px 0 20px 0;
        }
        
        .stats-list {
            width:100%;
            display:flex;
            flex-direction:row;
            flex-wrap:wrap;
            justify-content: space-between;
        }
    }

`;
