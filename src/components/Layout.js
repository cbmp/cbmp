import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import BurgerMenu from './BurgerMenu';

const Layout = ({ children, page }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <title>Computational Biology and Medicine Program</title>
    </Helmet>
    <BurgerMenu />
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
