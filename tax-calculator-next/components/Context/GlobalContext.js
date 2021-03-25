import React, { createContext, useState, useEffect, useMemo } from 'react';

/* Import data and translation files */
import Dictionary from '../../data/Translator';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [language, setLanguage] = useState(''),
        [content, setContent] = useState(Dictionary.EN);

    useEffect(() => {
        const currentLang = window.sessionStorage.getItem('lang');
        setLanguage([undefined, '', null].indexOf(currentLang) > -1 ? 'en' : currentLang);        
    }, []);

    useEffect(() => {
        window.sessionStorage.setItem('lang', language);
        let content = ['fr', 'fr_CA', 'fr_ca', 'fr-CA'].includes(language)
            ? Dictionary.FR : Dictionary.EN;
        setContent(content);
    }, [language]);

    const handleLanguageToggle = (newLang) => setLanguage(newLang);

    const memoizedLanguage = useMemo(() => [language, setLanguage], [language]);
    const memoizedContent = useMemo(() => [content, setContent], [content]);

    const contextValue = {
        language: memoizedLanguage[0],
        content: memoizedContent[0],
        toggleLanguage: handleLanguageToggle
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            { children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;