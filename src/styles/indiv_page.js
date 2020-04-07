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
        width: 25%;
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

    // for each section
    .container {
        font-size:calc(0.5vw + 0.5em);
        width: 80%;
        margin-bottom:20px;
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
        .section {
            width: 45%;
            position: relative;
        } 
        .download {
            margin-top: 40px;
        }
    }
    .citation {
        display: flex;
        line-height: 1.5em;
        .section {
            width: 100%;
        }
    }
    .links {
        display:flex;
        justify-content: flex-start;
        margin-top:40px;
        a {
            width: 12%;
            font-size: calc(0.5vw + 0.4em);
            padding: 0px 3px;
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
    

`;
