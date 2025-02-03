'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { BarChart, LineChart, TrendingUp, ChevronDown } from 'lucide-react';
import Asidebar from "@/components/common/asidebar/asidebar";

const RealtimeChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [resultMarker, setResultMarker] = useState(null);
    const [tradeResult, setTradeResult] = useState(null);
    const [currentAction, setCurrentAction] = useState(null);
    const [duration, setDuration] = useState(1);
    const [chartType, setChartType] = useState('Candlestick');

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
            time,
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
            // const diff = (value - previousValue) * Math.random() * 0.1;
            value = previousValue + diff;
            previousValue = value;
            // const point = {
            //     time: Math.floor(Date.UTC(2018, 0, 1) / 1000) + i * 300, // Increment time by 60 seconds
            //     value: value,
            // };
            // if (i < startAt) {
            //     initialData.push(point);
            // } else {
            //     realtimeUpdates.push(point);
            // }
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
        if (chartContainerRef.current) {
            const chartOptions = {
                layout: {
                    textColor: '#425472',
                    background: { type: 'solid', color: '#011120' },
                },
                height: 815,
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
            addSeries(chartType);
            // const series = chartRef.current.addCandlestickSeries({
            //     upColor: '#2dd674',
            //     downColor: '#ff5765',
            //     borderVisible: false,
            //     wickUpColor: '#2dd674',
            //     wickDownColor: '#ff5765',
            // });

            // seriesRef.current = series;

            const data = generateData(2500, 20, 1000);
            seriesRef.current.setData(data.initialData);
            chartRef.current.timeScale().fitContent();

            // Simulate real-time data
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
                seriesRef.current.update(update.value);
            }, 100);

            // Clean up on unmount
            return () => {
                clearInterval(intervalID);
                chartRef.current.remove();
            };
        }
    }, []);

    const addSeries = (type) => {
        if (chartRef.current) {
            // Remove existing series if any
            if (seriesRef.current) {
                try {
                    chartRef.current.removeSeries(seriesRef.current);
                } catch (error) {
                    console.error("Error removing series:", error);
                }
                seriesRef.current = null; // Reset the series reference after removal
            }
    
            switch (type) {
                case 'Candlestick':
                    seriesRef.current = chartRef.current.addCandlestickSeries({
                        upColor: '#2dd674',
                        downColor: '#ff5765',
                        borderVisible: false,
                        wickUpColor: '#2dd674',
                        wickDownColor: '#ff5765',
                    });
                    break;
    
                case 'Line':
                    seriesRef.current = chartRef.current.addLineSeries({
                        color: '#2dd674',
                        lineWidth: 2,
                    });
                    break;
    
                case 'Bar':
                    seriesRef.current = chartRef.current.addBarSeries({
                        upColor: '#2dd674',
                        downColor: '#ff5765',
                        thinBars: true,
                    });
                    break;
    
                case 'Area':
                    seriesRef.current = chartRef.current.addAreaSeries({
                        topColor: 'rgba(45, 214, 116, 0.4)',
                        bottomColor: 'rgba(45, 214, 116, 0)',
                        lineColor: '#2dd674',
                        lineWidth: 2,
                    });
                    break;
    
                default:
                    break;
            }
    
            // After adding the new series, update the data
            const data = generateData(2500, 20, 1000); // Or any other method to get the data
            seriesRef.current.setData(data.initialData);
            chartRef.current.timeScale().fitContent(); // Adjust the time scale to fit the data
        }
    };
    

    const handleChartTypeChange = (type) => {
        setChartType(type); // Update chart type in state
        addSeries(type); // Update the series type
    };

    const handleTradeClick = (direction) => {
        if (isProcessing || !chartRef.current || !seriesRef.current) return;

        setIsProcessing(true);
        setCurrentAction(direction); // Show "Up" or "Down" immediately

        // Show the immediate mark
        setResultMarker({
            time: Date.now(),
            position: direction === 'up' ? 'aboveBar' : 'belowBar',
            color: direction === 'up' ? '#2dd674' : '#ff5765',
            shape: direction === 'up' ? 'arrowUp' : 'arrowDown',
            text: direction === 'up' ? 'Up' : 'Down',
        });

        // Wait for 5 seconds to simulate the trade duration
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
        <div className="lg:flex overflow-hidden">
            <div className="relative w-full p-4">
                <div ref={chartContainerRef} style={{ position: 'relative' }}></div>
                <div className="absolute bottom-[50px] left-[20px] z-[4] rounded overflow-hidden bg-[#011120] flex flex-col space-y-[1px]">
                    {['Candlestick', 'Line', 'Bar', 'Area'].map((type) => {
                        let Icon;
                        switch (type) {
                            case 'Candlestick':
                                Icon = TrendingUp; // Use the appropriate icon for Candlestick
                                break;
                            case 'Line':
                                Icon = LineChart;
                                break;
                            case 'Bar':
                                Icon = BarChart;
                                break;
                            case 'Area':
                                Icon = ChevronDown; // You can replace with an appropriate Area icon
                                break;
                            default:
                                Icon = TrendingUp;
                        }

                        return (
                            <button
                                key={type}
                                onClick={() => handleChartTypeChange(type)}
                                className={`w-10 h-10 flex justify-center items-center text-sm ${chartType === type ? 'bg-[#163048] text-white' : 'bg-[#0d1f30]'}`}
                            >
                                <Icon className="w-5 h-5" />
                            </button>
                        );
                    })}
                </div>
            </div>
            <Asidebar
                onTradeClick={handleTradeClick}
                isProcessing={isProcessing}
                duration={duration}
                setDuration={setDuration}
            />
        </div>
    );
};

export default RealtimeChart;


// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { createChart } from 'lightweight-charts';

// const RealtimeChart = () => {
//     const chartContainerRef = useRef(null);
//     const chartRef = useRef(null);
//     const seriesRef = useRef(null);

//     const generateData = (numberOfPoints = 500, startAt = 100) => {
//         const samplePoint = (i) =>
//             i *
//                 (0.5 +
//                     Math.sin(i / 1) * 0.2 +
//                     Math.sin(i / 2) * 0.4 +
//                     Math.sin(i / 3) * 0.5) +
//             200 +
//             i * 2;

//             // const samplePoint = (i) =>
//             //     500 + // Minimum value
//             //     Math.abs(
//             //         (i *
//             //             (0.5 +
//             //                 Math.sin(i / 10) * 0.4 +
//             //                 Math.sin(i / 20) * 0.7 +
//             //                 Math.sin(i / 100) * 1.5)) %
//             //         3500 // Amplitude (max range is 4000 - 500 = 3500)
//             //     );

//         const initialData = [];
//         const realtimeUpdates = [];
//         let previousValue = samplePoint(-1);

//         for (let i = 0; i < numberOfPoints; ++i) {
//             const value = samplePoint(i);
//             const diff = (value - previousValue) * Math.random() * 0.5;
//             const currentValue = previousValue + diff;
//             previousValue = currentValue;

//             const point = {
//                 time: Math.floor(Date.UTC(2018, 0, 1) / 1000) + i * 300, // Increment time by 60 seconds
//                 value: currentValue,
//             };

//             if (i < startAt) {
//                 initialData.push(point);
//             } else {
//                 realtimeUpdates.push(point);
//             }
//         }

//         return { initialData, realtimeUpdates };
//     };

//     useEffect(() => {
//         if (chartContainerRef.current) {
//             const chartOptions = {
//                 layout: {
//                     textColor: 'white',
//                     background: { type: 'solid', color: '#011120' },
//                 },
//                 height: 900,
//                 grid: {
//                     vertLines: { color: '#1e293b', visible: true },
//                     horzLines: { color: '#1e293b', visible: true },
//                 },
//                 rightPriceScale: {
//                     borderVisible: false,
//                     scaleMargins: {
//                         top: 0.2,
//                         bottom: 0.2,
//                     },
//                 },
//                 timeScale: {
//                     borderColor: '#1e293b',
//                     timeVisible: true,
//                     tickMarkFormatter: (time) => {
//                         const date = new Date(time * 1000);
//                         return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
//                     },
//                 },
//             };

//             chartRef.current = createChart(chartContainerRef.current, chartOptions);

//             // Add area series
//             const series = chartRef.current.addAreaSeries({
//                 topColor: 'rgba(46, 113, 229, 0.6)',
//                 bottomColor: 'rgba(1, 17, 32, 0.1)',
//                 lineColor: '#1d4ed8',
//                 lineWidth: 1,
//             });

//             seriesRef.current = series;

//             const data = generateData(2500, 1000);
//             series.setData(data.initialData);
//             chartRef.current.timeScale().fitContent();

//             // Simulate real-time data
//             const streamingDataProvider = (function* (realtimeData) {
//                 for (const dataPoint of realtimeData) {
//                     yield dataPoint;
//                 }
//                 return null;
//             })(data.realtimeUpdates);

//             const intervalID = setInterval(() => {
//                 const update = streamingDataProvider.next();
//                 if (update.done) {
//                     clearInterval(intervalID);
//                     return;
//                 }
//                 series.update(update.value);
//             }, 1000);

//             // Clean up on unmount
//             return () => {
//                 clearInterval(intervalID);
//                 chartRef.current.remove();
//             };
//         }
//     }, []);

//     return (
//         <div>
//             <div ref={chartContainerRef} style={{ position: 'relative' }}></div>
//         </div>
//     );
// };

// export default RealtimeChart;