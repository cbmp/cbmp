import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, page }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Computational Biology and Medicine Program</title>
    </Helmet>
    {page === 'home' ? (
      <Header page="home" />
    ) : (
      <Header />
    )}
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
