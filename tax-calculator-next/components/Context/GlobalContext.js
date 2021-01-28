import { createContext, useState, useEffect } from 'react';

/* Import data and translation files */
import Dictionary from '../../data/Translator';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [language, setLanguage] = useState(""),
        [content, setContent] = useState(Dictionary.EN);

    useEffect(() => {
        const currentLang = window.sessionStorage.getItem("lang");
        let content = ["fr", "fr_CA", "fr_ca", "fr-CA"].includes(currentLang)
            ? Dictionary.FR : Dictionary.EN;

        setLanguage(currentLang == undefined ? "en" : currentLang);
        setContent(content);
    });

    const handleLanguageToggle = newLang => {
        window.sessionStorage.setItem("lang", newLang);
        setLanguage(newLang)
    }

    const contextValue = {
        language: language,
        content: content,
        toggleLanguage: handleLanguageToggle
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            { children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;