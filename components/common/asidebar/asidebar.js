"use client";
import { useState, useEffect } from "react";
import { useAccount } from "@/context/accountProvider/accountProvider";
import styles from "./asidebar.module.css";

export default function Asidebar({ onTradeClick, isProcessing, duration, setDuration }) {
    // State for Amount and Duration
    const [amount, setAmount] = useState(1);
    // const [duration, setDuration] = useState(1);
    const [action, setAction] = useState("");
    const [remainingTime, setRemainingTime] = useState(null);
    const [tradeTimer, setTradeTimer] = useState(null);
    const [profitOrLoss, setProfitOrLoss] = useState(null);
    const [tradeOutcome, setTradeOutcome] = useState(null);

    const { accountBalance, updateAccountAmount } = useAccount();

    // Handlers for Amount
    const incrementAmount = () => setAmount((prev) => prev + 1);
    const decrementAmount = () => setAmount((prev) => (prev > 1 ? prev - 1 : prev));

    // Handlers for Duration
    const incrementDuration = () => setDuration((prev) => prev + 1);
    const decrementDuration = () => setDuration((prev) => (prev > 1 ? prev - 1 : prev));

    // Handlers for Up and Down actions
    const handleUp = () => setAction("Up");
    const handleDown = () => setAction("Down");

    const handleDurationChange = (event) => {
        setDuration(Number(event.target.value)); // Update duration dynamically
    };

    // Start Trading Function
    const startTrading = (tradeAction) => {
        if (isProcessing) return;

        updateAccountAmount(accountBalance - amount);

        setAction(tradeAction);
        setRemainingTime(duration * 60); // Convert minutes to seconds

        // Clear existing timer if any
        if (tradeTimer) clearInterval(tradeTimer);

        // Start a new timer
        const timer = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    const isWin = Math.random() > 0.5;
                    const result = isWin ? amount : -amount;
                    setTradeOutcome(isWin ? "Win" : "Loss");
                    setProfitOrLoss(result);
                    if (isWin) updateAccountAmount(accountBalance + amount * 2);
                    setAction("");
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        setTradeTimer(timer);

        // Trigger onTradeClick for external trade handling
        onTradeClick(tradeAction);
    };

    // Clear timer on component unmount
    useEffect(() => {
        return () => {
            if (tradeTimer) clearInterval(tradeTimer);
        };
    }, [tradeTimer]);

    return (
        <div className="w-[180px] h-[815px] py-5 px-2 flex flex-col justify-start items-center gap-4">
            <div className="w-full flex flex-col items-center">
                <label htmlFor="amount" className="block text-sm font-medium mb-1">
                    Amount, Ð
                </label>
                <div className="w-full section--bg rounded-md px-2 py-2">
                    <input
                        id="amount"
                        type="text"
                        value={amount}
                        className="w-full text-center bg-transparent border border-[#1e293b] rounded-md text-gray-400 outline-none"
                        readOnly
                    />
                    <div className="flex justify-center gap-1 mt-1">
                        <button className="text-gray-400 text-lg font-bold bg-[#0d1f30] rounded-md py-[1px] px-7" onClick={decrementAmount}>−</button>
                        <button className="text-gray-400 text-lg font-bold bg-[#0d1f30] rounded-md py-[1px] px-7" onClick={incrementAmount}>+</button>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <label htmlFor="duration" className="block text-sm font-medium mb-1">
                    Duration
                </label>
                <div className="w-full section--bg rounded-md px-2 py-2">
                    <input
                        id="duration"
                        type="text"
                        value={`${duration} min`}
                        onChange={handleDurationChange}
                        className="w-full text-center bg-transparent border border-[#1e293b] rounded-md text-gray-400 outline-none"
                        readOnly
                    />
                    <div className="flex justify-center gap-1 mt-1">
                        <button className="text-gray-400 text-lg font-bold bg-[#0d1f30] rounded-md py-[1px] px-7" onClick={decrementDuration}>−</button>
                        <button className="text-gray-400 text-lg font-bold bg-[#0d1f30] rounded-md py-[1px] px-7" onClick={incrementDuration}>+</button>
                    </div>
                </div>
            </div>
            <button className="w-full bg-[#0d1f30] py-2 rounded-md flex items-center justify-center gap-2 text-sm font-bold">
                Trade History
                <span className="text-gray-400 text-lg">⏱</span>
            </button>
            <div className="w-full flex flex-col gap-2">
                <button className={`w-full py-3 bg-[#2dd674] rounded-md text-black font-bold flex items-center justify-center gap-2 ${action === "Up" ? "bg-[#31a361]" : "bg-[#2dd674]"}`} 
                onClick={() => {
                    onTradeClick("up");
                    startTrading("up");
                    handleUp();
                }} 
                disabled={isProcessing}>
                    Up
                    <span className="text-xl">↑</span>
                </button>
                <button className={`w-full py-3 bg-[#ff5765] rounded-md text-black font-bold flex items-center justify-center gap-2 ${action === "Down" ? "bg-[#c34d56]" : "bg-[#ff5765]"}`} 
                onClick={() => {
                    onTradeClick("down");
                    startTrading("down");
                    handleDown();
                }} 
                disabled={isProcessing}>
                    Down
                    <span className="text-xl">↓</span>
                </button>
            </div>
            {remainingTime !== null && (
                <div className="w-full text-center text-sm mt-4 text-gray-400">
                    Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60}
                </div>
            )}
            {/* <div className="w-full text-center text-sm mt-4 text-gray-400">
                Profit: <span className="text-emerald-400">+Ð0.85</span>
                <span className="text-gray-500 ml-1">ⓘ</span>
            </div> */}
            {tradeOutcome && (
                <div className="w-full text-center text-sm mt-4">
                    Result:{" "}
                    {tradeOutcome === "Win" ? (
                        <span className="text-[#2dd674] font-bold">Win! +Ð{profitOrLoss}</span>
                    ) : (
                        <span className="text-[#ff5765] font-bold">Loss! -Ð{Math.abs(profitOrLoss)}</span>
                    )}
                    <span className="text-gray-500 ml-1">ⓘ</span>
                </div>
            )}
            <div className="w-full text-center text-sm mt-4">
                Current Action:{" "}
                <span className={`font-bold ${action === "Up" ? "text-[#2dd674]" : "text-[#ff5765]"}`}>
                    {action || "None"}
                </span>
            </div>
        </div>
    );
}