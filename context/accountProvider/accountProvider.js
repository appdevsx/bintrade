"use client";
import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export function AccountProvider({ children }) {
    const [accountBalance, setAccountBalance] = useState(10001.05);

    const updateAccountAmount = (newAmount) => setAccountBalance(newAmount);

    return (
        <AccountContext.Provider value={{ accountBalance, updateAccountAmount }}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccount() {
    return useContext(AccountContext);
}