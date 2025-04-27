'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Asidebar from "@/components/common/asidebar/asidebar";
import { Toaster, toast } from "react-hot-toast";
import { useAccount } from "@/context/accountProvider/accountProvider";
import { useSettings } from "@/context/settingsProvider/settingsProvider";
import { demoTradingInfoAPI, liveTradingInfoAPI, storeOrderAPI, orderResultAPI } from "@/services/apiClient/apiClient";
import { LoaderCircle } from 'lucide-react';

const RealtimeChart = () => {
	const { tradeSettings } = useSettings();
    const chartContainerRef = useRef(null);
    const wsRef = useRef(null);
    const { symbol, setSymbol, interval, selectedAccountType } = useAccount();
    const [isProcessing, setIsProcessing] = useState(false);
    const [duration, setDuration] = useState(1);
    const [chartHeight, setChartHeight] = useState(window.innerHeight - 102);
    const [limit, setLimit] = useState(800);
    const [tradingData, setTradingData] = useState(null);
    const [ongoingOrders, setOngoingOrders] = useState([]);
    const [tradingSettings, setTradingSettings] = useState(null);
    const [intervals, setIntervals] = useState([]);
    const [currencyImagePath, setCurrencyImagePath] = useState("");
    const [amount, setAmount] = useState(1.00);
    const [chartData, setChartData] = useState([]);
    const [loadingChart, setLoadingChart] = useState(false);
	const [tradeType, setTradeType] = useState(null);
	const [selectedSymbol, setSelectedSymbol] = useState(null);
	const [currentOHLCData, setCurrentOHLCData] = useState(null);

	useEffect(() => {
		if (tradeSettings) {
			const formattedInvestment = parseFloat(tradeSettings?.investment || "1");
			setAmount(Number(formattedInvestment.toFixed(2)));
			setDuration(tradeSettings?.time_frame || "1");
		}
	}, [tradeSettings]);

    const fetchBinanceData = async (symbol, interval, limit) => {
        if (!symbol || !interval || !limit) {
			toast.error("Invalid parameters: symbol, interval, and limit are required.");
			return [];
        }
        const url = `https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
        try {
			const response = await fetch(url);
			if (!response.ok) throw new Error("Failed to fetch Binance data.");
			const data = await response.json();
          	return data.map(entry => ({
				time: entry[0] / 1000,
				open: parseFloat(entry[1]),
				high: parseFloat(entry[2]),
				low: parseFloat(entry[3]),
				close: parseFloat(entry[4])
          	}));
        } catch (error) {
			toast.error("Server did not respond");
			return [];
        }
    };      

    useEffect(() => {
        const updateChartHeight = () => {
            setChartHeight(window.innerHeight - 102);
        };
        window.addEventListener('resize', updateChartHeight);
        updateChartHeight();
        return () => {
            window.removeEventListener('resize', updateChartHeight);
        };
    }, []);

    const fetchTradingInfo = async () => {
      	setLoadingChart(true);
      	try {
			const response = selectedAccountType === "DEMO"
				? await demoTradingInfoAPI(1, 10)
				: await liveTradingInfoAPI(10);
  
			if (response?.data) {
				setTradingData(response.data);
				setOngoingOrders(response.data.data?.ongoing_orders || []);
				setTradingSettings(response.data.data?.trading_settings || null);
				setIntervals(response.data.data?.intervals || []);
				setCurrencyImagePath(response.data.data?.currency_image_paths?.base_url || "");
	
				if (response.data.data?.chart) {
					setChartData(response.data.data.chart);
				}
			} else {
				toast.error(response.data?.message?.error?.[0] || "Failed to load trading info.");
			}
		} catch (error) {
			toast.error("Server did not respond");
		} finally {
			setLoadingChart(false);
		}
  	};

    useEffect(() => {
        fetchTradingInfo(selectedAccountType);
    }, [selectedAccountType]);

    useEffect(() => {
        if (!symbol || !interval || !limit) return;
        
        const formattedSymbol = symbol.toLowerCase();
        const chart = createChart(chartContainerRef.current, {
			layout: { textColor: '#425472', background: { type: 'solid', color: '#011120' } },
			width: chartContainerRef.current.clientWidth,
			height: chartHeight,
			grid: { vertLines: { color: "#172234" }, horzLines: { color: "#172234" } },
			rightPriceScale: { borderVisible: false },
			timeScale: { borderVisible: false, timeVisible: true, secondsVisible: true },
        });
      
        const candleSeries = chart.addCandlestickSeries();
      
        const loadData = async () => {
			const data = await fetchBinanceData(symbol, interval, limit);
			candleSeries.setData(data);
        };
      
        loadData();
      
        if (wsRef.current) wsRef.current.close();
      
        const wsUrl = `wss://stream.binance.com:9443/ws/${formattedSymbol}@kline_${interval}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
      
        ws.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.e === "kline") {
				const kline = message.k;
				const newCandle = {
					time: kline.t / 1000,
					open: parseFloat(kline.o),
					high: parseFloat(kline.h),
					low: parseFloat(kline.l),
					close: parseFloat(kline.c),
				};
				candleSeries.update(newCandle);
			}
        };
      
        return () => {
			chart.remove();
			if (wsRef.current) wsRef.current.close();
        };
    }, [symbol, interval, limit]);

    const handleTradingCompletion = async (orderID) => {
		try {
			const response = await orderResultAPI(orderID);
			console.log("Full API Response:", JSON.stringify(response, null, 2)); // Debug log
			
			// The order data is nested under response.data.data.order
			const orderData = response?.data?.data?.order;
			
			if (orderData) {
				console.log("Extracted order data:", orderData);
				return {
					status: orderData.status,
					result: orderData.p_result,
					winAmount: orderData.win_amount,
					amount: orderData.amount,
					type: orderData.p_type
				};
			} else {
				console.warn("Order data not found in expected location");
				console.warn("Available keys in response.data:", Object.keys(response?.data || {}));
				toast.error("Could not find order data in response");
				return null;
			}
		} catch (error) {
			console.error("Error checking trade result:", error);
			toast.error("Failed to check trade result");
			return null;
		}
	};

    const handleTradeClick = async (actionType) => {
		if (!ongoingOrders?.length) {
			toast.error("No ongoing trade found.");
			return;
		}
	
		const latestOrder = ongoingOrders[0];
		const selectedSymbol = latestOrder?.symbol;
		const rawOHLC = latestOrder?.start_ohlc_data;
	
		if (!actionType || !selectedSymbol || !rawOHLC) {
			toast.error("Trade data is incomplete.");
			return;
		}
	
		let parsedOHLC;
		try {
			let arr = JSON.parse(rawOHLC);
			if (typeof arr === "string") arr = JSON.parse(arr);
	
			parsedOHLC = {
				e: "kline",
				E: arr[0] + 100,
				s: latestOrder.symbol,
				k: {
					t: arr[0],
					T: arr[6],
					s: latestOrder.symbol,
					i: latestOrder.interval || "1s",
					f: -1,
					L: -1,
					o: arr[1],
					c: arr[4],
					h: arr[2],
					l: arr[3],
					v: arr[5],
					n: 0,
					x: true,
					q: arr[7],
					V: arr[9],
					Q: arr[10],
					B: arr[11]
				}
			};
		} catch (err) {
			console.error("Failed to parse OHLC:", err, rawOHLC);
			toast.error("OHLC data is invalid.");
			return;
		}
	
		try {
			const investAmount = parseFloat(amount);
			const time = duration;
			const currentTime = new Date().toLocaleString("en-US", {
				hour12: true,
			});
	
			const response = await storeOrderAPI(
				investAmount,
				time,
				actionType,
				selectedSymbol,
				currentTime,
				JSON.stringify(parsedOHLC)
			);
	
			if (response?.data?.message?.success) {
				toast.success(response.data.message.success[0] || "Order placed successfully!");
				await fetchTradingInfo(selectedAccountType);
				return { success: true, orderId: response.data.data?.order?._id };
			} else if (response?.data?.message?.error) {
				toast.error(response.data.message.error[0] || "An error occurred.");
				return { success: false };
			} else {
				toast.error("Failed to place order.");
				return { success: false };
			}
		} catch (error) {
			const errorMessage =
				error?.response?.data?.message?.error?.[0] ||
				"Server did not respond";
			toast.error(errorMessage);
			return { success: false };
		}
	};

    return (
        <>
            <Toaster reverseOrder={false} theme="dark" />
            <div className="lg:flex overflow-hidden">
                <div className="relative w-full p-4">
					{loadingChart && (
						<div className="h-screen w-full absolute top-0 left-0 flex items-center justify-center section--bg z-[999]">
							<LoaderCircle className="inline-block w-10 h-auto animate-spin text-[#cbd5e1]" />
						</div>
					)}
                  	<div ref={chartContainerRef} style={{ position: 'relative' }}></div>
                </div>
                <Asidebar
                    handleTradeClick={handleTradeClick}
					handleTradingCompletion={handleTradingCompletion}
                    isProcessing={isProcessing}
                    amount={amount}
                    setAmount={setAmount}
                    duration={duration}
                    setDuration={setDuration}
                    ongoingOrders={ongoingOrders}
                />
            </div>
        </>
    );
};

export default RealtimeChart;