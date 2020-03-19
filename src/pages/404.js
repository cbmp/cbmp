import React from "react"
import '../styles/index.css';
import Layout from '../components/Layout';
import styled from 'styled-components';

const StyledNotFound = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFound = () => (
    <Layout page="404">
      <StyledNotFound>
        <h1>404 Not Found</h1>
      </StyledNotFound>
    </Layout>
  
)

export default NotFound;
