"use client";
import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export function AccountProvider({ children }) {
    const [accountBalance, setAccountBalance] = useState(10001.05);
    const [selectedBalance, setSelectedBalance] = useState(null);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [interval, setInterval] = useState("1m");
    const [selectedAccountType, setSelectedAccountType] = useState("LIVE");

    const updateAccountAmount = (newAmount) => setSelectedBalance(newAmount);
    // const updateAccountAmount = (newAmount) => setAccountBalance(newAmount);

    return (
        <AccountContext.Provider value={{ 
            accountBalance,
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
