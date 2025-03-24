'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Asidebar from "@/components/common/asidebar/asidebar";
import { Toaster, toast } from "react-hot-toast";
import { useAccount } from "@/context/accountProvider/accountProvider";
import { demoTradingInfoAPI, liveTradingInfoAPI, storeOrderAPI } from "@/services/apiClient/apiClient";

const RealtimeChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const wsRef = useRef(null);
    const { symbol, interval, selectedAccount, accountType, } = useAccount();
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultMarker, setResultMarker] = useState(null);
    const [tradeResult, setTradeResult] = useState(null);
    const [currentAction, setCurrentAction] = useState(null);
    const [duration, setDuration] = useState(1);
    const [chartHeight, setChartHeight] = useState(window.innerHeight - 102);
    const [limit, setLimit] = useState(800);
    const [tradingData, setTradingData] = useState(null);
    const [ongoingOrders, setOngoingOrders] = useState([]);
    const [tradingSettings, setTradingSettings] = useState(null);
    const [intervals, setIntervals] = useState([]);
    const [currencyImagePath, setCurrencyImagePath] = useState("");
    const [investAmount, setInvestAmount] = useState("");
    const [time, setTime] = useState("");
    const [amount, setAmount] = useState(1);

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
          toast.error("Error fetching Binance data");
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
        try {
			const response = accountType === "Demo Account"
				? await demoTradingInfoAPI(1, 10)
				: await liveTradingInfoAPI(10);

      console.log(response);
      
			if (response?.data) {
				setTradingData(response.data);
				setOngoingOrders(response.data.data?.ongoing_orders || []);
				setTradingSettings(response.data.data?.trading_settings || null);
				setIntervals(response.data.data?.intervals || []);
				setCurrencyImagePath(response.data.data?.currency_image_paths?.base_url || "");
			} else {
				toast.error(response.data?.message?.error?.[0] || "Failed to load trading info.");
			}
        } catch (error) {
			toast.error("Server did not respond");
        }
    };

    useEffect(() => {
        fetchTradingInfo(selectedAccount);
    }, [selectedAccount]);

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

    // const handleTradeClick = async () => {
    //     // if (!investAmount || !time) {
    //     //   toast.error("Please enter the investment amount and time.");
    //     //   return;
    //     // }
    //     if (!amount || isNaN(amount) || amount <= 0) {
    //         alert('Please enter a valid amount greater than 0.');
    //         return;
    //     }
        
    //     const actionType = "HIGH";
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     const currentOHLC = "[1741148452000,\"0.02486000\",\"0.02486000\",\"0.02486000\",\"0.02486000\",\"0.00000000\",1741148452999,\"0.00000000\",0,\"0.00000000\",\"0.00000000\",\"0\"]";
        
    //     setIsProcessing(true);
      
    //     try {
    //       const response = await storeOrderAPI(investAmount, time, actionType, symbol, currentTime, currentOHLC);

    //       console.log(response);
          
    //       if (response?.data?.order) {
    //         setOngoingOrders((prevOrders) => [...prevOrders, response.data.order]);
            
    //         const ohlcData = JSON.parse(response.data.order.start_ohlc_data);
    //         const newCandle = {
    //           time: ohlcData[0] / 1000,
    //           open: parseFloat(ohlcData[1]),
    //           high: parseFloat(ohlcData[2]),
    //           low: parseFloat(ohlcData[3]),
    //           close: parseFloat(ohlcData[4]),
    //         };
      
    //         const isHigh = response.data.order.p_type === "HIGH";
    //         const marker = {
    //           time: newCandle.time,
    //           position: isHigh ? "aboveBar" : "belowBar",
    //           color: isHigh ? "#26a69a" : "#ef5350",
    //           shape: isHigh ? "arrowUp" : "arrowDown",
    //           text: isHigh ? "HIGH Order ↑" : "DOWN Order ↓",
    //         };
      
    //         candleSeries.update(newCandle);
    //         candleSeries.setMarkers([marker]);
            
    //         toast.success(response.data?.message?.success?.[0]);
    //       }
    //     } catch (error) {
    //       toast.error("Server did not respond");
    //     } finally {
    //       setIsProcessing(false);
    //     }
    // };

	const handleTradeClick = async () => {
		if (!amount || isNaN(amount) || amount <= 0) {
		  alert('Please enter a valid amount greater than 0.');
		  return;
		}
	  
		const actionType = "HIGH";
		const currentTime = Math.floor(Date.now() / 1000);
		const currentOHLC = "[1741148452000,\"0.02486000\",\"0.02486000\",\"0.02486000\",\"0.02486000\",\"0.00000000\",1741148452999,\"0.00000000\",0,\"0.00000000\",\"0.00000000\",\"0\"]";
	  
		setIsProcessing(true);
	  
		try {
		  // Store the order
		  const response = await storeOrderAPI(investAmount, time, actionType, symbol, currentTime, currentOHLC);
	  
		  if (response?.data?.order) {
			const order = response.data.order;
			setOngoingOrders((prevOrders) => [...prevOrders, order]);
	  
			const ohlcData = JSON.parse(order.start_ohlc_data);
			const newCandle = {
			  time: ohlcData[0] / 1000,
			  open: parseFloat(ohlcData[1]),
			  high: parseFloat(ohlcData[2]),
			  low: parseFloat(ohlcData[3]),
			  close: parseFloat(ohlcData[4]),
			};
	  
			const isHigh = order.p_type === "HIGH";
			const marker = {
			  time: newCandle.time,
			  position: isHigh ? "aboveBar" : "belowBar",
			  color: isHigh ? "#26a69a" : "#ef5350",
			  shape: isHigh ? "arrowUp" : "arrowDown",
			  text: isHigh ? "HIGH Order ↑" : "DOWN Order ↓",
			};
	  
			candleSeries.update(newCandle);
			candleSeries.setMarkers([marker]);
	  
			toast.success(response.data?.message?.success?.[0]);
	  
			// Get the result of the order
			const resultResponse = await fetchOrderResultAPI(order._id);
			console.log(resultResponse);
			
			if (resultResponse?.data?.order) {
			  const resultOrder = resultResponse.data.order;
			  
			  // Update wallet balance
			  const demoWallet = resultResponse.data.user_wallets.find(wallet => wallet.type === 'DEMO');
			  setWalletBalance(demoWallet?.balance || 0);
	  
			  // Display result notification
			  if (resultOrder.p_result === "WIN") {
				toast.success(`Congratulations! You won ${resultOrder.win_amount} BDT.`);
			  } else {
				toast.error(`Sorry, you lost the trade.`);
			  }
			  
			  // Update candle and markers with end data
			  const endOhlcData = JSON.parse(resultOrder.end_ohlc_data);
			  const endCandle = {
				time: endOhlcData[0] / 1000,
				open: parseFloat(endOhlcData[1]),
				high: parseFloat(endOhlcData[2]),
				low: parseFloat(endOhlcData[3]),
				close: parseFloat(endOhlcData[4]),
			  };
	  
			  candleSeries.update(endCandle);
			} else {
			  toast.error("Failed to fetch order result.");
			}
		  } else {
			toast.error("Failed to create order.");
		  }
		} catch (error) {
		  toast.error(error?.response?.data?.message || "Server did not respond");
		  console.error(error);
		} finally {
		  setIsProcessing(false);
		}
	  };
	  
	  

    return (
        <>
            <Toaster reverseOrder={false} theme="dark" />
            <div className="lg:flex overflow-hidden">
                <div className="relative w-full p-4">
                    <div ref={chartContainerRef} style={{ position: 'relative' }}></div>
                </div>
                <Asidebar
                    onTradeClick={handleTradeClick}
                    isProcessing={isProcessing}
                    amount={amount}
                    setAmount={setAmount}
                    duration={duration}
                    setDuration={setDuration}
                />
            </div>
        </>
    );
};

export default RealtimeChart;