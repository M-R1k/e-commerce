import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "FR");

    useEffect(() => {
        localStorage.setItem("language", language.toUpperCase());
    }, [language]);

    const changeLanguage = (newLanguage) => {
        const upperCaseLanguage = newLanguage.toUpperCase();
        setLanguage(upperCaseLanguage);
        localStorage.setItem("language", upperCaseLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
