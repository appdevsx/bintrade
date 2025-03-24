"use client";
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState([]);
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);



// "use client";
// import React, { createContext, useContext, useState, useEffect } from 'react';

// const LanguageContext = createContext();

// export const LanguageProvider = ({ children }) => {
//     const [language, setLanguage] = useState(() => {
//         return localStorage.getItem('selectedLanguage') || 'en';
//     });

//     useEffect(() => {
//         localStorage.setItem('selectedLanguage', language);
//     }, [language]);

//     return (
//         <LanguageContext.Provider value={{ language, setLanguage }}>
//             {children}
//         </LanguageContext.Provider>
//     );
// };

// export const useLanguage = () => useContext(LanguageContext);