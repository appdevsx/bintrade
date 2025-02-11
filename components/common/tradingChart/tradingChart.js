'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Asidebar from "@/components/common/asidebar/asidebar";
import { Toaster, toast } from "react-hot-toast";
import { useAccount } from "@/context/accountProvider/accountProvider";

const RealtimeChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const wsRef = useRef(null);
    const { symbol, interval } = useAccount();

    const [isProcessing, setIsProcessing] = useState(false);
    const [resultMarker, setResultMarker] = useState(null);
    const [tradeResult, setTradeResult] = useState(null);
    const [currentAction, setCurrentAction] = useState(null);
    const [duration, setDuration] = useState(1);
    const [chartHeight, setChartHeight] = useState(window.innerHeight - 102);
    const [limit, setLimit] = useState(800);

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
        };

        return () => {
            chart.remove();
            if (wsRef.current) wsRef.current.close();
        };
    }, [symbol, interval, limit]);

    const handleTradeClick = (direction) => {
        if (isProcessing || !chartRef.current || !seriesRef.current) return;

        setIsProcessing(true);
        setCurrentAction(direction);

        setResultMarker({
            time: Date.now(),
            position: direction === 'up' ? 'aboveBar' : 'belowBar',
            color: direction === 'up' ? '#2dd674' : '#ff5765',
            shape: direction === 'up' ? 'arrowUp' : 'arrowDown',
            text: direction === 'up' ? 'Up' : 'Down',
        });

        setTimeout(() => {
            const latestData = seriesRef.current.data();
            const latestCandle = latestData[latestData.length - 1];
            const previousCandle = latestData[latestData.length - 2];

            if (latestCandle && previousCandle) {
                const isWin = direction === 'up' ? latestCandle.close > previousCandle.close : latestCandle.close < previousCandle.close;

                setResultMarker({
                    time: latestCandle.time,
                    position: isWin ? 'aboveBar' : 'belowBar',
                    color: isWin ? '#2dd674' : '#ff5765',
                    shape: isWin ? 'circle' : 'circle',
                    text: isWin ? 'Win' : 'Lost',
                });

                setTradeResult(isWin ? 'Win' : 'Lost');
            }

            setIsProcessing(false);
        }, duration * 60 * 1000);
    };

    useEffect(() => {
        if (resultMarker && seriesRef.current) {
            seriesRef.current.setMarkers([resultMarker]);
        }
    }, [resultMarker]);

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