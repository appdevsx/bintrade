"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getInfoAPI } from "@/services/apiClient/apiClient";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getInfoAPI();
            if (response.data.type === "success" && response.data.data.transactions) {
                setTransactions(response.data.data.transactions);
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
        <TransactionContext.Provider value={{ transactions, loading, fetchTransactions }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);