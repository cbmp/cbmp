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

    .container {
        background: white;
        width: 80%;
        font-size: calc(0.3vw + 0.8em);
        line-height: calc(0.8vw + 1.3em);
        display: flex;
        flex-direction:column;
        padding: 30px 0 80px 0;
    }

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
    correctPass: 'cbmpmember',
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
        <div className="container">
          <h1>Resources</h1>
          {values.showDiv ? (
            <div className="resource-container">
              Coming soon
            </div>
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
