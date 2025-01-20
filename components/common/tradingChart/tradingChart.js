'use client'
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const RealtimeChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);

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
                    textColor: '#1e293b',
                    background: { type: 'solid', color: '#011120' },
                },
                height: 840,
                grid: {
                    vertLines: { color: "#1e293b" },
                    horzLines: { color: "#1e293b" },
                },
            };

            chartRef.current = createChart(chartContainerRef.current, chartOptions);
            const series = chartRef.current.addCandlestickSeries({
                upColor: '#2e71e5',
                downColor: '#bf126a',
                borderVisible: false,
                wickUpColor: '#2e71e5',
                wickDownColor: '#bf126a',
            });

            seriesRef.current = series;

            const data = generateData(2500, 20, 1000);
            series.setData(data.initialData);
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
                series.update(update.value);
            }, 100);

            // Clean up on unmount
            return () => {
                clearInterval(intervalID);
                chartRef.current.remove();
            };
        }
    }, []);

    return (
        <div className="w-full">
            <div ref={chartContainerRef} style={{ position: 'relative' }}></div>
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