'use client'
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { BarChart, LineChart, TrendingUp, ChevronDown } from 'lucide-react';
import Asidebar from "@/components/common/asidebar/asidebar";
import Script from "next/script";

const TVChart = () => {
    const container = useRef(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
    useEffect(() => {
      if (!isScriptLoaded || !container.current) return;
  
      new window.TradingView.widget({
        container_id: "tv_chart",
        autosize: true,
        symbol: "BINANCE:BTCUSDT",
        interval: "1",
        theme: "dark",
        style: "2",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        backgroundColor: "#011120",
        gridColor: "rgba(30, 41, 59, 1)",
        hide_volume: true,
        hide_side_toolbar: false,
        overrides: {
            "mainSeriesProperties.candleStyle.upColor": "#26a69a",
            "mainSeriesProperties.candleStyle.downColor": "#ef5350",
        },
      });
    }, [isScriptLoaded]);

    return (
        <div className="lg:flex overflow-hidden">
            <div className="relative w-full">
                <Script
                    src="https://s3.tradingview.com/tv.js"
                    strategy="lazyOnload"
                    onLoad={() => setIsScriptLoaded(true)}
                />
                <div id="tv_chart" ref={container} style={{ height: "847px" }} />
            </div>
            <Asidebar
            />
        </div>
    );
};

export default TVChart;


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