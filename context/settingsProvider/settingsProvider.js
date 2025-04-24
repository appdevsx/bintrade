"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { basicSettingsAPI } from '@/services/apiClient/apiClient';
import { Toaster, toast } from 'react-hot-toast';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [tradeSettings, setTradeSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await basicSettingsAPI();
                const data = response?.data?.data?.basic_settings;
                const tradeData = response?.data?.data?.trading_settings;
        
                setSettings(data);
                setTradeSettings(tradeData);
        
                if (data?.base_color) {
                    document.documentElement.style.setProperty('--primary-color', data.base_color);
                }
                if (data?.secondary_color) {
                    document.documentElement.style.setProperty('--secondary-color', data.secondary_color);
                }
            } catch (err) {
                toast.error('Server did not respond');
            }
        };
    
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, setSettings, tradeSettings, setTradeSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);