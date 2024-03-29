import React, { useContext } from "react";
import Head from 'next/head';

/* Importing GA */
import TagManager from 'react-gtm-module';
   
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
  const pageTitle = content.pageTitle.replace("$currYear$", currYear);

  const tagManagerArgs = {
    gtmId: 'GTM-5FVL3R9'
  }
  if (process.browser) {
    TagManager.initialize(tagManagerArgs);
  }
  return (
    <div className={HomeStyle.container}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <title>{pageTitle}</title>
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
