"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getInfoAPI } from "@/services/apiClient/apiClient";
import { useAccount } from "@/context/accountProvider/accountProvider";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const {  setSelectedAccountType, setSelectedBalance } = useAccount();
    const [demoBalance, setDemoBalance] = useState(null);
    const [liveBalance, setLiveBalance] = useState(null);
    const [currencyCode, setCurrencyCode] = useState("");
    const [currencySymbol, setCurrencySymbol] = useState("");
    const [demoAccountType, setDemoAccountType] = useState("");
    const [liveAccountType, setLiveAccountType] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWallets = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getInfoAPI();

            if (response.data.type === "success" && response.data.data.user_wallets) {
                const wallets = response.data.data.user_wallets;

                const demoWallet = wallets.find(wallet => wallet.type.toUpperCase() === "DEMO");
                const liveWallet = wallets.find(wallet => wallet.type.toUpperCase() === "LIVE");

                const demoBal = parseFloat(demoWallet?.balance || 0).toFixed(2);
                const liveBal = parseFloat(liveWallet?.balance || 0).toFixed(2);

                setDemoBalance(demoBal);
                setLiveBalance(liveBal);

                setDemoAccountType(demoWallet?.type);
                setLiveAccountType(liveWallet?.type);

                if (liveWallet || demoWallet) {
                    const currency = (liveWallet || demoWallet).currency?.symbol;
                    setCurrencySymbol(currency);
                    localStorage.setItem("currencySymbol", currency);
                }

                if (liveWallet || demoWallet) {
                    const currency = (liveWallet || demoWallet).currency?.code;
                    setCurrencyCode(currency);
                    localStorage.setItem("currencyCode", currency);
                }

                const storedAccount = localStorage.getItem("selectedAccount");
                const selectedFromStorage = storedAccount === "Demo Account" ? demoWallet : liveWallet;

                if (selectedFromStorage) {
                    const selectedType = selectedFromStorage.type.toUpperCase();
                    const selectedBal = parseFloat(selectedFromStorage.balance).toFixed(2);

                    setSelectedBalance(selectedBal);
                    setSelectedAccountType(selectedType);

                    localStorage.setItem("selectedAccount", selectedType === "DEMO" ? "Demo Account" : "Live Account");
                    localStorage.setItem("selectedBalance", selectedBal);
                    localStorage.setItem("selectedAccountType", selectedType);
                }
            } else {
                toast.error(response.data.message.error[0]);
            }
        } catch (error) {
            toast.error("Server did not respond");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <WalletContext.Provider value={{ loading, setLoading, setSelectedAccountType, setSelectedBalance, demoBalance, setDemoBalance, liveBalance, setLiveBalance, currencySymbol, setCurrencySymbol, currencyCode, setCurrencyCode, demoAccountType, setDemoAccountType, liveAccountType, setLiveAccountType, fetchWallets }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallets = () => useContext(WalletContext);