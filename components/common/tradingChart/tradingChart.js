'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import Asidebar from "@/components/common/asidebar/asidebar";
import { Toaster, toast } from "react-hot-toast";

const RealtimeChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [resultMarker, setResultMarker] = useState(null);
    const [tradeResult, setTradeResult] = useState(null);
    const [currentAction, setCurrentAction] = useState(null);
    const [duration, setDuration] = useState(1);
    const [chartHeight, setChartHeight] = useState(window.innerHeight - 102);

    const fetchHistoricalData = async () => {
        try {
            const response = await fetch('https://data-api.binance.vision/api/v3/klines?symbol=ETHBTC&interval=1s&limit=200');
            const json = await response.json();
    
            const formattedData = json.map(item => ({
                time: item[0] / 1000,
                open: parseFloat(item[1]),
                high: parseFloat(item[2]),
                low: parseFloat(item[3]),
                close: parseFloat(item[4]),
            }));
    
            if (seriesRef.current) {
                seriesRef.current.setData(formattedData);
                chartRef.current.timeScale().fitContent();
            }
        } catch (error) {
            toast.error("Error fetching historical data:", error);
        }
    };
    
    useEffect(() => {
        fetchHistoricalData();
    }, []);

    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethbtc@kline_1s');
    
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const candle = {
                time: message.k.t / 1000,
                open: parseFloat(message.k.o),
                high: parseFloat(message.k.h),
                low: parseFloat(message.k.l),
                close: parseFloat(message.k.c),
            };
    
            if (seriesRef.current) {
                seriesRef.current.update(candle);
            }
        };
    
        return () => socket.close();
    }, []);    

    const generateData = (numberOfCandles = 500, updatesPerCandle = 5, startAt = 100) => {
        let randomFactor = 25 + Math.random() * 25;
        const samplePoint = (i) =>
            i *
                (0.5 +
                    Math.sin(i / 1) * 0.2 +
                    Math.sin(i / 2) * 0.4 +
                    Math.sin(i / randomFactor) * 0.8 +
                    Math.sin(i / 50) * 0.5) +
            200 +
            i * 2;

        const createCandle = (val, time) => ({
            time: Math.floor(time / 1000),
            open: val,
            high: val,
            low: val,
            close: val,
        });

        const updateCandle = (candle, val) => ({
            time: candle.time,
            close: val,
            open: candle.open,
            low: Math.min(candle.low, val),
            high: Math.max(candle.high, val),
        });

        randomFactor = 25 + Math.random() * 25;
        const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
        const numberOfPoints = numberOfCandles * updatesPerCandle;
        const initialData = [];
        const realtimeUpdates = [];
        let lastCandle;
        let previousValue = samplePoint(-1);
        for (let i = 0; i < numberOfPoints; ++i) {
            if (i % updatesPerCandle === 0) {
                date.setUTCDate(date.getUTCDate() + 1);
            }
            const time = Math.floor(date.getTime() / 1000);
            let value = samplePoint(i);
            const diff = (value - previousValue) * Math.random();
            value = previousValue + diff;
            previousValue = value;
            if (i % updatesPerCandle === 0) {
                const candle = createCandle(value, time);
                lastCandle = candle;
                if (i >= startAt) {
                    realtimeUpdates.push(candle);
                }
            } else {
                const newCandle = updateCandle(lastCandle, value);
                lastCandle = newCandle;
                if (i >= startAt) {
                    realtimeUpdates.push(newCandle);
                } else if ((i + 1) % updatesPerCandle === 0) {
                    initialData.push(newCandle);
                }
            }
        }

        return { initialData, realtimeUpdates };
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
        if (chartContainerRef.current) {
            const chartOptions = {
                layout: {
                    textColor: '#425472',
                    background: { type: 'solid', color: '#011120' },
                },
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
            };

            chartRef.current = createChart(chartContainerRef.current, chartOptions);
            const series = chartRef.current.addCandlestickSeries({
                upColor: '#2dd674',
                downColor: '#ff5765',
                borderVisible: false,
                wickUpColor: '#2dd674',
                wickDownColor: '#ff5765',
            });

            seriesRef.current = series;

            const data = generateData(2500, 20, 1000);
            seriesRef.current.setData(data.initialData);
            chartRef.current.timeScale().fitContent();

            const streamingDataProvider = (function* (realtimeData) {
                for (const dataPoint of realtimeData) {
                    yield dataPoint;
                }
                return null;
            })(data.realtimeUpdates);

            const intervalID = setInterval(() => {
                const update = streamingDataProvider.next();
                if (update.done) {
                    clearInterval(intervalID);
                    return;
                }
                const latestData = seriesRef.current.data();
                const lastCandle = latestData[latestData.length - 1];

                if (!lastCandle || update.value.time > lastCandle.time) {
                    seriesRef.current.update(update.value);
                }
            }, 100);

            return () => {
                clearInterval(intervalID);
                chartRef.current.remove();
            };
        }
    }, []);

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