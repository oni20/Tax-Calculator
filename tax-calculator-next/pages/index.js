import React, { useState, useEffect } from "react";
import Head from 'next/head';

/* Importing custom classes */
import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import Footer from '../components/Footer/Footer';

/* Import data and translation files */
import Dictionary from '../data/Translator';
import CanadaTaxRule from '../data/CanadaTaxRule.json';

/* Import custom stylesheet */
import styles from '../styles/Home.module.scss';

const currYear = new Date().getFullYear();

const Home = () => {
  const [language, setLanguage] = useState("en"),
    [content, setContent] = useState(Dictionary.EN),
    [currentProvinceTaxRule, setCurrentProvinceTaxRule] = useState([]);

  useEffect(() => {
    const currentLang = window.sessionStorage.getItem("lang");
    let content = ["fr", "fr_CA", "fr_ca", "fr-CA"].includes(currentLang) ? Dictionary.FR : Dictionary.EN;
    setContent(content);
  });

  const handleLanguageToggle = newLang => {
    sessionStorage.setItem("lang", newLang);
    setLanguage(newLang)
  }

  return (
    <div className={styles.container}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />

        <title>{content.pageTitle.replace("$currYear$", currYear)}</title>

        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

      </Head>

      <noscript>{content.jsDisabledMsg}</noscript>

      <Header
        language={language}
        headerTitle={content.headerTitle}
        handleLanguageToggle={handleLanguageToggle}
        logoUrl={content.logoUrl}
        logoAlt={content.logoAlt}
      />
      <Body
        bodyContent={content.body}
      />
      <Footer
        footerContent={content.footerContent}
      />

    </div>
  );
}

export default Home;
