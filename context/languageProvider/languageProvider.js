// "use client";
// import { createContext, useContext, useState } from "react";

// const LanguageContext = createContext();

// export const LanguageProvider = ({ children }) => {
//     const [language, setLanguage] = useState([]);
//     return (
//         <LanguageContext.Provider value={{ language, setLanguage }}>
//             {children}
//         </LanguageContext.Provider>
//     );
// };

// export const useLanguage = () => useContext(LanguageContext);



"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return typeof window !== 'undefined' 
        ? localStorage.getItem('selectedLanguage') || 'en' 
        : 'en';
    });

    useEffect(() => {
        localStorage.setItem('selectedLanguage', language);

        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.classList.toggle('rtl', language === 'ar');
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);