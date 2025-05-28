"use client";
import { useState, useEffect } from "react";
import { useAccount } from "@/context/accountProvider/accountProvider";
import { X, ArrowBigLeftDash } from 'lucide-react';
import { Toaster, toast } from "react-hot-toast";
import { useWallets } from "@/context/walletProvider/walletProvider";
import styles from "./asidebar.module.css";

export default function Asidebar({ handleTradeClick, handleTradingCompletion, isProcessing, duration, setDuration, amount, setAmount, ongoingOrders }) {
    const { currencySymbol, setCurrencySymbol } = useWallets();
    const [action, setAction] = useState("");
    const [remainingTime, setRemainingTime] = useState(null);
    const [tradeTimer, setTradeTimer] = useState(null);
    const [profitOrLoss, setProfitOrLoss] = useState(null);
    const [tradeOutcome, setTradeOutcome] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAsidebarOpen, setIsAsidebarOpen] = useState(false);
    const [isTimerVisible, setIsTimerVisible] = useState(false);

    const incrementAmount = () => setAmount((prev) => parseFloat((parseFloat(prev) + 1).toFixed(2)));
    const decrementAmount = () => setAmount((prev) => parseFloat(prev) > 1 ? parseFloat((parseFloat(prev) - 1).toFixed(2)) : parseFloat(prev));

    const incrementDuration = () => setDuration((prev) => prev + 1);
    const decrementDuration = () => setDuration((prev) => (prev > 1 ? prev - 1 : prev));

    const handleDurationChange = (event) => {
        const input = event.target.value;
        const [minutes, seconds] = input.split(":").map((val) => parseInt(val) || 0);
        const totalSeconds = minutes * 60 + seconds;
        setDuration(totalSeconds);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleAmountChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setAmount(parseFloat(value.toFixed(2)));
        }
    };

    useEffect(() => {
        return () => {
            if (tradeTimer) clearInterval(tradeTimer);
        };
    }, [tradeTimer]);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const toggleAsidebar = () => {
        setIsAsidebarOpen(!isAsidebarOpen);
    };

    const onTradeClick = async (actionType) => {
		setAction(actionType === "HIGH" ? "Up" : "Down");
		setTradeOutcome(null);
		setRemainingTime(duration); // Start with the full duration
		setProfitOrLoss(null);
		setIsTimerVisible(true);

		try {
			const response = await handleTradeClick(actionType);
			
			if (response?.success) {
				const orderId = response.orderId;
				console.log("Starting trade with order ID:", orderId);
				
				setTradeOutcome("In Progress");

				const timer = setInterval(() => {
					setRemainingTime((prevTime) => {
						if (prevTime <= 1) {
							clearInterval(timer);
							setIsTimerVisible(false);
							setRemainingTime(null); // Reset when done
							
							console.log("Checking result for order:", orderId);
							if (orderId) {
								handleTradingCompletion(orderId).then(result => {
									console.log("Trade result:", result);
									if (result) {
										const outcome = result.result === "WIN" ? "Win" : "Loss";
										console.log("Setting outcome:", outcome);
										setTradeOutcome(outcome);
										setProfitOrLoss(outcome === "Win" ? result.winAmount : amount);
									} else {
										console.warn("No result received");
										setTradeOutcome("Unknown");
										toast.error("Could not determine trade result");
									}
								}).catch(error => {
									console.error("Completion error:", error);
									setTradeOutcome("Error");
									toast.error("Error checking trade result");
								});
							}
							return 0;
						}
						return prevTime - 1;
					});
				}, 1000);

				setTradeTimer(timer);
			} else {
				setIsTimerVisible(false);
				setTradeOutcome("Failed");
				setRemainingTime(null); // Reset on failure
				toast.error("Failed to start trade");
			}
		} catch (error) {
			console.error("Trade failed:", error);
			setIsTimerVisible(false);
			setTradeOutcome("Error");
			setRemainingTime(null); // Reset on error
			toast.error("Trade failed unexpectedly");
		}
	};

    return (
        <div className="fixed lg:sticky top-[70px] lg:top-0 right-0 w-[180px] h-screen lg:h-[calc(100vh-102px)] z-[2]">
            <button
                className={`asidebar-mobile-toggle lg:hidden fixed top-1/2 right-0 z-50 lg:z-0 bg-[#0d1f30] text--base py-2 pl-3 ${isAsidebarOpen ? 'active-class' : ''}`}
                onClick={toggleAsidebar}
            >
                <ArrowBigLeftDash size={25} />
            </button>
            <div className={`asidebar transition-all duration-300 ${isAsidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 fixed lg:relative bg-[#011120] h-screen lg:bg-transparent py-5 px-2 flex flex-col justify-start items-center z-[9] lg:z-[2] gap-4`}>
                <div className="w-full flex flex-col items-center">
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">
                        Amount
                    </label>
                    <div className="w-full section--bg rounded-md px-2 py-2">
                        <input
                            id="amount"
                            type="text"
                            value={amount.toFixed(2)}
                            onChange={handleAmountChange}
                            className="w-full text-center bg-transparent border border-[#1e293b] rounded-md text-gray-400 outline-none"
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
                            value={formatTime(duration)}
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
                <button className="w-full bg-[#0d1f30] py-2 rounded-md flex items-center justify-center gap-2 text-sm font-bold" onClick={toggleSidebar}>
                    Trade History
                    <span className="text-gray-400 text-lg">⏱</span>
                </button>
                <div className="w-full flex flex-col gap-2">
					<button 
						className={`w-full py-3 rounded-md text-black font-bold flex items-center justify-center gap-2 
							${isProcessing || remainingTime !== null ? 'bg-[#31a361] cursor-not-allowed' : 'bg-[#2dd674] cursor-pointer'}`} 
						onClick={() => onTradeClick("HIGH")}
						disabled={isProcessing || remainingTime !== null}>
						Up
						<span className="text-xl">↑</span>
					</button>
					<button 
						className={`w-full py-3 rounded-md text-black font-bold flex items-center justify-center gap-2 
							${isProcessing || remainingTime !== null ? 'bg-[#c34d56] cursor-not-allowed' : 'bg-[#ff5765] cursor-pointer'}`} 
						onClick={() => onTradeClick("LOW")} 
						disabled={isProcessing || remainingTime !== null}>
						Down
						<span className="text-xl">↓</span>
					</button>
				</div>
                {isTimerVisible && remainingTime !== null && (
                    <div className="w-full text-center text-sm mt-4 text-gray-400">
                        Time Remaining: {formatTime(remainingTime)}
                    </div>
                )}
                {tradeOutcome && (
                    <div className="w-full text-center text-sm mt-4">
                        Result:{" "}
                        {tradeOutcome === "Win" ? (
                            <span className="text-[#2dd674] font-bold">
                                Win! +{currencySymbol}{profitOrLoss}
                            </span>
                        ) : tradeOutcome === "Loss" ? (
                            <span className="text-[#ff5765] font-bold">
                                Loss! -{currencySymbol}{profitOrLoss}
                            </span>
                        ) : (
                            <span className="text-gray-400">{tradeOutcome}</span>
                        )}
                        <span className="text-gray-500 ml-1">ⓘ</span>
                    </div>
                )}
                <div className="w-full text-center text-sm mt-4">
                    Current Action:{" "}
                    <span className={`font-bold ${action === "Up" ? "text-[#2dd674]" : action === "Down" ? "text-[#ff5765]" : "text-gray-400"}`}>
                        {action === "Up" ? "Up" : action === "Down" ? "Down" : "None"}
                    </span> 
                </div>
                <div className={`fixed top-0 right-0 h-full bg-[#051524] w-full sm:w-[400px] overflow-y-auto z-[3] shadow-lg p-4 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-white text-lg font-semibold">Trade History</h2>
                        <button onClick={toggleSidebar}>
                            <X className="text-white w-5 h-5" />
                        </button>
                    </div>
                    <ul className="grid grid-cols-1 gap-3 p-4">
                        {ongoingOrders.length === 0 ? (
                            <li className="text-white">No trades yet.</li>
                        ) : (
                            ongoingOrders.map((order, index) => {
                                const isCompleted = order.status !== "ONGOING";
                                const isWin = order.status === "WIN";
                                const startDate = new Date(order.createdAt || parseInt(order.started_at) * 1000);
                                const endDate = order.execute_at ? new Date(parseInt(order.execute_at) * 1000) : null;
                                
                                return (
                                    <li key={index} className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="font-semibold">{order.symbol}</div>
                                                <div className="text-sm">Direction: {order.p_type === "HIGH" ? "Up" : "Down"}</div>
                                                <div className="text-sm">Amount: {currencySymbol}{order.amount}</div>
                                            </div>
                                            <div className={`text-xs px-2 py-1 rounded font-bold ${
                                                isWin 
                                                    ? "bg-[#2dd674] text-black" 
                                                    : isCompleted 
                                                        ? "bg-[#ff5765] text-black" 
                                                        : "bg-gray-500 text-white"
                                            }`}>
                                                {isCompleted ? (isWin ? "WIN" : "LOSS") : "ONGOING"}
                                            </div>
                                        </div>
                                        
                                        {isCompleted && (
                                            <div className="mt-1 text-sm">
                                                Result:{" "}
                                                {isWin ? (
                                                    <span className="text-[#2dd674] font-bold">
                                                        Win! +{currencySymbol}{order.win_amount || 0}
                                                    </span>
                                                ) : (
                                                    <span className="text-[#ff5765] font-bold">
                                                        Loss! -{currencySymbol}{order.amount}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        
                                        <div className="mt-1 text-xs text-gray-400">
                                            <div>Started: {startDate.toLocaleString()}</div>
                                            {endDate && (
                                                <div>Completed: {endDate.toLocaleString()}</div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
            {isAsidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50"
                    onClick={toggleAsidebar}
                ></div>
            )}
        </div>
    );
}