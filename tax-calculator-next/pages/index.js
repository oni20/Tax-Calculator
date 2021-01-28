import React, { useState, useEffect, useContext } from "react";
import Head from 'next/head';

/* Importing custom classes */
import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import Footer from '../components/Footer/Footer';
import { GlobalContext } from '../components/Context/GlobalContext';
import ResultContextProvider from '../components/Body/ResultContext';

/* Import custom stylesheet */
import HomeStyle from '../styles/Home.module.scss';

const currYear = new Date().getFullYear();

const Home = () => {
  const { content } = useContext(GlobalContext);

  return (
    <div className={HomeStyle.container}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <title>{content.pageTitle.replace("$currYear$", currYear)}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      </Head>
      <noscript>{content.jsDisabledMsg}</noscript>

      <div role="main">
        <a href="#maincontent" className="sr-only">{content.skipToContent}</a>
        <Header />
        <ResultContextProvider>
          <Body />
        </ResultContextProvider>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
