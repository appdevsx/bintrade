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

    const fetchBinanceData = async (symbol, interval, limit) => {
        if (!symbol || !interval || !limit) {
            toast.error("Missing parameters: symbol, interval, and limit are required.");
            return [];
        }

        const url = `https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            return data.map(entry => ({
                time: entry[0] / 1000,
                open: parseFloat(entry[1]),
                high: parseFloat(entry[2]),
                low: parseFloat(entry[3]),
                close: parseFloat(entry[4])
            }));
        } catch (error) {
            toast.error("Error fetching Binance data:", error);
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
        // const switcherValue = accountType === "Demo Account" ? "DEMO" : "LIVE";
        try {
            // const response = switcherValue 
            //     ? await demoTradingInfoAPI(1, 10) 
            //     : await liveTradingInfoAPI(10);

            const response =  await demoTradingInfoAPI(1, 10)
    
            if (response?.data) {
                setTradingData(response.data);
                setOngoingOrders(response.data.data.ongoing_orders || []);
                setTradingSettings(response.data.data.trading_settings || null);
                setIntervals(response.data.data.intervals || []);
                setCurrencyImagePath(response.data.data.currency_image_paths?.base_url || "");
            } else {
                toast.error(response.data.message.error[0]);
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
            layout: {
                textColor: '#425472',
                background: { type: 'solid', color: '#011120' },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartHeight,
            grid: {
                vertLines: { color: "#172234" },
                horzLines: { color: "#172234" },
            },
            rightPriceScale: {
                borderVisible: false,
            },
            timeScale: {
                borderVisible: false,
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
        });

        const candleSeries = chart.addCandlestickSeries();

        const loadData = async () => {
            const data = await fetchBinanceData(symbol, interval, limit);
            candleSeries.setData(data);
        };

        loadData();

        if (wsRef.current) {
            wsRef.current.close();
        }

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
            if (message.type === "success") {
                const { ongoing_orders, trading_settings, intervals } = message.data;
    
                setOngoingOrders(ongoing_orders);
                setTradingSettings(trading_settings);
                setIntervals(intervals);
    
                if (ongoing_orders.length > 0) {
                    const formattedData = ongoing_orders.map(order => {
                        const ohlc = order.start_ohlc_data.split(",");
                        return {
                            time: parseInt(ohlc[0]) / 1000,
                            open: parseFloat(ohlc[1]),
                            high: parseFloat(ohlc[2]),
                            low: parseFloat(ohlc[3]),
                            close: parseFloat(ohlc[4]),
                        };
                    });
    
                    candleSeries.setData(formattedData);
                }
            }
        };

        return () => {
            chart.remove();
            if (wsRef.current) wsRef.current.close();
        };
    }, [symbol, interval, limit, ongoingOrders, tradingSettings, intervals]);

    const handleTradeClick = async () => {
        const symbol = "ETHBTC";
        const actionType = "HIGH";
        const currentTime = Math.floor(Date.now() / 1000);
        const currentOHLC = "[1741148452000,\"0.02486000\",\"0.02486000\",\"0.02486000\",\"0.02486000\",\"0.00000000\",1741148452999,\"0.00000000\",0,\"0.00000000\",\"0.00000000\",\"0\"]";
        setIsProcessing(true);
    
        try {
            const response = await storeOrderAPI(investAmount, time, actionType, symbol, currentTime, currentOHLC);
    
            if (response.data?.order) {
                setOngoingOrders((prevOrders) => [...prevOrders, response.data.order]);
    
                const ohlcData = JSON.parse(response.data.order.start_ohlc_data);
    
                const newCandle = {
                    time: ohlcData[0] / 1000,
                    open: parseFloat(ohlcData[1]),
                    high: parseFloat(ohlcData[2]),
                    low: parseFloat(ohlcData[3]),
                    close: parseFloat(ohlcData[4]),
                };
    
                candleSeries.update(newCandle);
    
                const isHigh = response.data.order.p_type === "HIGH";
                const marker = {
                    time: newCandle.time,
                    position: isHigh ? "aboveBar" : "belowBar",
                    color: isHigh ? "#26a69a" : "#ef5350",
                    shape: isHigh ? "arrowUp" : "arrowDown",
                    text: isHigh ? "HIGH Order ↑" : "DOWN Order ↓",
                };
    
                candleSeries.setMarkers([marker]);
            }
    
            const successMessage = response.data?.message?.success?.[0] || "Order placed successfully!";
            toast.success(successMessage);
        } catch (error) {
            toast.error("Server did not respond");
            console.error("Error placing order:", error);
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
                    duration={duration}
                    setDuration={setDuration}
                />
            </div>
        </>
    );
};

export default RealtimeChart;