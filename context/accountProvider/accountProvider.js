"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSettings } from "@/context/settingsProvider/settingsProvider";

const AccountContext = createContext();

export function AccountProvider({ children }) {
    const { tradeSettings } = useSettings();
    const [selectedBalance, setSelectedBalance] = useState(null);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [interval, setInterval] = useState("1m");
    const [selectedAccountType, setSelectedAccountType] = useState("LIVE");

    useEffect(() => {
        if (tradeSettings) {
            setSymbol(tradeSettings?.symbol || "BTCUSDT");
            setInterval(tradeSettings?.interval || "1m");
        }
    }, [tradeSettings]);

    const updateAccountAmount = (newAmount) => setSelectedBalance(newAmount);

    return (
        <AccountContext.Provider value={{
            setSelectedBalance,
            selectedBalance,
            updateAccountAmount,
            symbol, 
            setSymbol, 
            interval, 
            setInterval,
            selectedAccountType,
            setSelectedAccountType
        }}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccount() {
    return useContext(AccountContext);
}
