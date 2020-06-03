import React from 'react';
import '../styles/index.css';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Layout from '../components/Layout';

const StyledResources = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    // justify-content; center;
    flex-direction: column;
    margin-top:80px;
    
    h1 {
        font-size:calc(1.8vw + 0.7em);
        font-family: 'Rubik', sans-serif; 
    }

    .titlecontainer {
        background: white;
        width: 80%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        flex-direction:column;
        padding: 30px 0 0 0;
    }

    .container {
        background: white;
        width: 100%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        flex-direction:column;
        align-items: center;
        padding: 30px 0 80px 0;
    }

    .container:nth-child(odd) {
        background: var(--contrast-bg); 
    }
    
    .container:nth-child(even) {
        background: white; 
    }

    .resource-container {
        width: 80%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        flex-direction:column;
        padding: 0 0 0 0;

    .pass-container {
        width:100%;
        height: 50vh;
        display:flex;
        justify-content:center;
        align-items: center;
    }
    
`;

const Resources = () => {
  const [values, setValues] = React.useState({
    password: '',
    correctPass: 'cbmp',
    incorrectPassword: false,
    showPassword: false,
    showDiv: false,
  });

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      if (values.password === values.correctPass) {
        setValues({
          ...values, showDiv: true, incorrectPassword: false, showDiv: true,
        });
      } else {
        setValues({ ...values, incorrectPassword: true });
      }
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Layout page="Resources">
      <StyledResources>
        <div className="titlecontainer">
          <h1>Resources</h1>
          <b>Information and resources for CBMP members and their staff & trainees.</b>
        </div>

        <div className="container">
          {values.showDiv ? (
            
            <>
           
            <div className="container">
              <div className="resource-container">
                <h2>Introduction to HPC4Health & Slurm</h2>
                <span>
                This document provides a brief overview on the set-up procedure and basic operation of Slurm, to help new staff/trainees access computing resources through HPC4Health.
                To suggest improvements or comment on this document, <a href="https://docs.google.com/document/d/1y37VyEkHi4mQKkVderDFi2RlZrIklGO2eKF-QuMVD5E/edit?usp=sharing" target="_blank"> <b>click here</b></a>.
                <br/><br/>
                </span>
                <iframe src="https://docs.google.com/document/d/e/2PACX-1vT1LVlyaWTbyR_9Dbvj55S3kayzI-7Y1WtaRqsiYYAT26QK9PBGQnwIfQsMjVGCzVayglm0FHktcPtg/pub?embedded=true" width="800" height="800" frameborder="1" marginheight="0" marginwidth="0">Loading…></iframe>
              </div>
            </div>
            
            <div className="container">
              <div className="resource-container">
                <h2>CBMP Grant Opportunties</h2>
                <span>
                To view and comment on the full document outlining potential grant opportunities for CBMP, <a href="https://docs.google.com/document/d/1hGsq7C6YxIr8mb4fCf1yAQtJOazlaHBU0gXmveEEEgM/edit?usp=sharing" target="_blank"> <b>click here</b></a>. 
                <br/>
                To view recently discussed grants, see below. 
                <br/><br/>
                </span>
                <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSO0W9cV3ILkkuivB1IV4yJ2d6f7HZVRb463HD3lA8QMTTliBueoDlm-f963xVVgSKyOSypmXrWFTEx/embed?start=false&loop=false&delayms=5000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
              </div>
            </div>
           
            <div className="container">
              <div className="resource-container">
                <h2>Data Sharing</h2>
                <span>
                To submit information about a dataset for inclusion in the CBMP dataset catalogue, use the form below or <a href="https://docs.google.com/forms/d/e/1FAIpQLSfl8cTz1akPFjMg1uUBvTuKPoo18flFUTk8r_rkt495OYZLyA/viewform?usp=sf_link" target="_blank"> <b>click here</b></a>.
                <br/><br/>
                </span>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfl8cTz1akPFjMg1uUBvTuKPoo18flFUTk8r_rkt495OYZLyA/viewform?embedded=true" width="700" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
              </div>
            </div>
            </>

          ) : (

            <div className="pass-container">
              <FormControl className="password">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  error={values.incorrectPassword}
                  onKeyPress={handleKeyPress}
                  onChange={handleChange('password')}
                  endAdornment={(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )}
                />
              </FormControl>
            </div>
          )}
        </div>

      </StyledResources>
    </Layout>

  );
};


export default Resources;
