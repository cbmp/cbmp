import React, {Fragment} from "react";
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";

const Layout = ({ children, page }) => (
    <Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Computational Biology and Medicine Program</title>
        </Helmet>
        {page === "home" ? null : (
            <Header/>
        )}
            <main>{children}</main>
        <Footer/>
    </Fragment>
);

export default Layout;