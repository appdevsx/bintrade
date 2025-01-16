// 'use client'
// import React, { useEffect, useRef } from "react";
// import { createChart } from "lightweight-charts";

// const TradingChart = () => {
//     const chartContainerRef = useRef(null);

//     useEffect(() => {
//         // Initialize the chart
//         const chartOptions = {
//             layout: {
//                 textColor: 'white',
//                 background: { type: 'solid', color: '#011120' },
//             },
//         };
//         const chart = createChart(chartContainerRef.current, {
//             width: chartContainerRef.current.clientWidth,
//             height: 900,
//             ...chartOptions,
//         });

//         chart.applyOptions({
//             rightPriceScale: {
//                 scaleMargins: {
//                     top: 0.3,
//                     bottom: 0.25,
//                 },
//             },
//             crosshair: {
//                 horzLine: {
//                     visible: false,
//                     labelVisible: false,
//                 },
//             },
//             grid: {
//                 vertLines: { color: "#1e293b" },
//                 horzLines: { color: "#1e293b" },
//             },
//             timeScale: {
//                 borderColor: "#1e293b",
//             },
//         });

//         const areaSeries = chart.addAreaSeries({
//             topColor: 'rgba(46, 113, 229, 0.4)',
//             bottomColor: 'rgba(1, 17, 32, 0.1)',
//             borderDownColor: "#1e293b",
//             borderUpColor: "#1e293b",
//             lineColor: '#1d4ed8',
//             lineWidth: 2,
//             crossHairMarkerVisible: false,
//         });

//         areaSeries.setData([
//             { time: '2018-10-19', value: 26.19 },
//             { time: '2018-10-22', value: 25.87 },
//             { time: '2018-10-23', value: 25.83 },
//             { time: '2018-10-24', value: 25.78 },
//             { time: '2018-10-25', value: 25.82 },
//             { time: '2018-10-26', value: 25.81 },
//             { time: '2018-10-29', value: 25.82 },
//             { time: '2018-10-30', value: 25.71 },
//             { time: '2018-10-31', value: 25.82 },
//             { time: '2018-11-01', value: 25.72 },
//             { time: '2018-11-02', value: 25.74 },
//             { time: '2018-11-05', value: 25.81 },
//             { time: '2018-11-06', value: 25.75 },
//             { time: '2018-11-07', value: 25.73 },
//             { time: '2018-11-08', value: 25.75 },
//             { time: '2018-11-09', value: 25.75 },
//             { time: '2018-11-12', value: 25.76 },
//             { time: '2018-11-13', value: 25.8 },
//             { time: '2018-11-14', value: 25.77 },
//             { time: '2018-11-15', value: 25.75 },
//             { time: '2018-11-16', value: 25.75 },
//             { time: '2018-11-19', value: 25.75 },
//             { time: '2018-11-20', value: 25.72 },
//             { time: '2018-11-21', value: 25.78 },
//             { time: '2018-11-23', value: 25.72 },
//             { time: '2018-11-26', value: 25.78 },
//             { time: '2018-11-27', value: 25.85 },
//             { time: '2018-11-28', value: 25.85 },
//             { time: '2018-11-29', value: 25.55 },
//             { time: '2018-11-30', value: 25.41 },
//             { time: '2018-12-03', value: 25.41 },
//             { time: '2018-12-04', value: 25.42 },
//             { time: '2018-12-06', value: 25.33 },
//             { time: '2018-12-07', value: 25.39 },
//             { time: '2018-12-10', value: 25.32 },
//             { time: '2018-12-11', value: 25.48 },
//             { time: '2018-12-12', value: 25.39 },
//             { time: '2018-12-13', value: 25.45 },
//             { time: '2018-12-14', value: 25.52 },
//             { time: '2018-12-17', value: 25.38 },
//             { time: '2018-12-18', value: 25.36 },
//             { time: '2018-12-19', value: 25.65 },
//             { time: '2018-12-20', value: 25.7 },
//             { time: '2018-12-21', value: 25.66 },
//             { time: '2018-12-24', value: 25.66 },
//             { time: '2018-12-26', value: 25.65 },
//             { time: '2018-12-27', value: 25.66 },
//             { time: '2018-12-28', value: 25.68 },
//             { time: '2018-12-31', value: 25.77 },
//             { time: '2019-01-02', value: 25.72 },
//             { time: '2019-01-03', value: 25.69 },
//             { time: '2019-01-04', value: 25.71 },
//             { time: '2019-01-07', value: 25.72 },
//             { time: '2019-01-08', value: 25.72 },
//             { time: '2019-01-09', value: 25.66 },
//             { time: '2019-01-10', value: 25.85 },
//             { time: '2019-01-11', value: 25.92 },
//             { time: '2019-01-14', value: 25.94 },
//             { time: '2019-01-15', value: 25.95 },
//             { time: '2019-01-16', value: 26.0 },
//             { time: '2019-01-17', value: 25.99 },
//             { time: '2019-01-18', value: 25.6 },
//             { time: '2019-01-22', value: 25.81 },
//             { time: '2019-01-23', value: 25.7 },
//             { time: '2019-01-24', value: 25.74 },
//             { time: '2019-01-25', value: 25.8 },
//             { time: '2019-01-28', value: 25.83 },
//             { time: '2019-01-29', value: 25.7 },
//             { time: '2019-01-30', value: 25.78 },
//             { time: '2019-01-31', value: 25.35 },
//             { time: '2019-02-01', value: 25.6 },
//             { time: '2019-02-04', value: 25.65 },
//             { time: '2019-02-05', value: 25.73 },
//             { time: '2019-02-06', value: 25.71 },
//             { time: '2019-02-07', value: 25.71 },
//             { time: '2019-02-08', value: 25.72 },
//             { time: '2019-02-11', value: 25.76 },
//             { time: '2019-02-12', value: 25.84 },
//             { time: '2019-02-13', value: 25.85 },
//             { time: '2019-02-14', value: 25.87 },
//             { time: '2019-02-15', value: 25.89 },
//             { time: '2019-02-19', value: 25.9 },
//             { time: '2019-02-20', value: 25.92 },
//             { time: '2019-02-21', value: 25.96 },
//             { time: '2019-02-22', value: 26.0 },
//             { time: '2019-02-25', value: 25.93 },
//             { time: '2019-02-26', value: 25.92 },
//             { time: '2019-02-27', value: 25.67 },
//             { time: '2019-02-28', value: 25.79 },
//             { time: '2019-03-01', value: 25.86 },
//             { time: '2019-03-04', value: 25.94 },
//             { time: '2019-03-05', value: 26.02 },
//             { time: '2019-03-06', value: 25.95 },
//             { time: '2019-03-07', value: 25.89 },
//             { time: '2019-03-08', value: 25.94 },
//             { time: '2019-03-11', value: 25.91 },
//             { time: '2019-03-12', value: 25.92 },
//             { time: '2019-03-13', value: 26.0 },
//             { time: '2019-03-14', value: 26.05 },
//             { time: '2019-03-15', value: 26.11 },
//             { time: '2019-03-18', value: 26.1 },
//             { time: '2019-03-19', value: 25.98 },
//             { time: '2019-03-20', value: 26.11 },
//             { time: '2019-03-21', value: 26.12 },
//             { time: '2019-03-22', value: 25.88 },
//             { time: '2019-03-25', value: 25.85 },
//             { time: '2019-03-26', value: 25.72 },
//             { time: '2019-03-27', value: 25.73 },
//             { time: '2019-03-28', value: 25.8 },
//             { time: '2019-03-29', value: 25.77 },
//             { time: '2019-04-01', value: 26.06 },
//             { time: '2019-04-02', value: 25.93 },
//             { time: '2019-04-03', value: 25.95 },
//             { time: '2019-04-04', value: 26.06 },
//             { time: '2019-04-05', value: 26.16 },
//             { time: '2019-04-08', value: 26.12 },
//             { time: '2019-04-09', value: 26.07 },
//             { time: '2019-04-10', value: 26.13 },
//             { time: '2019-04-11', value: 26.04 },
//             { time: '2019-04-12', value: 26.04 },
//             { time: '2019-04-15', value: 26.05 },
//             { time: '2019-04-16', value: 26.01 },
//             { time: '2019-04-17', value: 26.09 },
//             { time: '2019-04-18', value: 26.0 },
//             { time: '2019-04-22', value: 26.0 },
//             { time: '2019-04-23', value: 26.06 },
//             { time: '2019-04-24', value: 26.0 },
//             { time: '2019-04-25', value: 25.81 },
//             { time: '2019-04-26', value: 25.88 },
//             { time: '2019-04-29', value: 25.91 },
//             { time: '2019-04-30', value: 25.9 },
//             { time: '2019-05-01', value: 26.02 },
//             { time: '2019-05-02', value: 25.97 },
//             { time: '2019-05-03', value: 26.02 },
//             { time: '2019-05-06', value: 26.03 },
//             { time: '2019-05-07', value: 26.04 },
//             { time: '2019-05-08', value: 26.05 },
//             { time: '2019-05-09', value: 26.05 },
//             { time: '2019-05-10', value: 26.08 },
//             { time: '2019-05-13', value: 26.05 },
//             { time: '2019-05-14', value: 26.01 },
//             { time: '2019-05-15', value: 26.03 },
//             { time: '2019-05-16', value: 26.14 },
//             { time: '2019-05-17', value: 26.09 },
//             { time: '2019-05-20', value: 26.01 },
//             { time: '2019-05-21', value: 26.12 },
//             { time: '2019-05-22', value: 26.15 },
//             { time: '2019-05-23', value: 26.18 },
//             { time: '2019-05-24', value: 26.16 },
//             { time: '2019-05-28', value: 26.23 },
//             { time: '2019-05-29', value: 26.27 },
//             { time: '2019-05-30', value: 26.31 },
//             { time: '2019-05-31', value: 26.35 },
//             { time: '2019-06-03', value: 26.29 },
//             { time: '2019-06-04', value: 26.26 },
//             { time: '2019-06-05', value: 26.32 },
//             { time: '2019-06-06', value: 26.34 },
//             { time: '2019-06-07', value: 26.37 },
//             { time: '2019-06-10', value: 26.40 },
//             { time: '2019-06-11', value: 26.42 },
//             { time: '2019-06-12', value: 26.45 },
//             { time: '2019-06-13', value: 26.48 },
//             { time: '2019-06-14', value: 26.44 },
//             { time: '2019-06-17', value: 26.47 },
//             { time: '2019-06-18', value: 26.49 },
//             { time: '2019-06-19', value: 26.50 },
//             { time: '2019-06-20', value: 26.53 },
//             { time: '2019-06-21', value: 26.55 },
//             { time: '2019-06-24', value: 26.58 },
//             { time: '2019-06-25', value: 26.61 },
//             { time: '2019-06-26', value: 26.59 },
//             { time: '2019-06-27', value: 26.63 },
//             { time: '2019-06-28', value: 26.66 },
//             { time: '2019-07-01', value: 26.69 },
//             { time: '2019-07-02', value: 26.71 },
//             { time: '2019-07-03', value: 26.75 },
//             { time: '2019-07-05', value: 26.79 },
//             { time: '2019-07-08', value: 26.81 },
//             { time: '2019-07-09', value: 26.83 },
//             { time: '2019-07-10', value: 26.86 },
//             { time: '2019-07-11', value: 26.88 },
//             { time: '2019-07-12', value: 26.92 },
//             { time: '2019-07-15', value: 26.94 },
//             { time: '2019-07-16', value: 26.96 },
//             { time: '2019-07-17', value: 26.98 },
//             { time: '2019-07-18', value: 27.01 },
//             { time: '2019-07-19', value: 27.03 },
//             { time: '2019-07-22', value: 27.06 },
//             { time: '2019-07-23', value: 27.08 },
//             { time: '2019-07-24', value: 27.10 },
//             { time: '2019-07-25', value: 27.12 },
//             { time: '2019-07-26', value: 27.15 },
//             { time: '2019-07-29', value: 27.17 },
//             { time: '2019-07-30', value: 27.19 },
//             { time: '2019-07-31', value: 27.21 },
//             { time: '2019-08-01', value: 27.24 },
//             { time: '2019-08-02', value: 27.26 },
//             { time: '2019-08-05', value: 27.28 },
//             { time: '2019-08-06', value: 27.30 },
//             { time: '2019-08-07', value: 27.33 },
//             { time: '2019-08-08', value: 27.35 },
//             { time: '2019-08-09', value: 27.37 },
//             { time: '2019-08-12', value: 27.40 },
//             { time: '2019-08-13', value: 27.42 },
//             { time: '2019-08-14', value: 27.45 },
//             { time: '2019-08-15', value: 27.47 },
//             { time: '2019-08-16', value: 27.49 },
//             { time: '2019-08-19', value: 27.52 },
//             { time: '2019-08-20', value: 27.54 },
//             { time: '2019-08-21', value: 27.56 },
//             { time: '2019-08-22', value: 27.59 },
//             { time: '2019-08-23', value: 27.61 },
//             { time: '2019-08-26', value: 27.63 },
//             { time: '2019-08-27', value: 27.66 },
//             { time: '2019-08-28', value: 27.68 },
//             { time: '2019-08-29', value: 27.70 },
//             { time: '2019-08-30', value: 27.72 },
//             { time: '2019-09-03', value: 27.75 },
//             { time: '2019-09-04', value: 27.77 },
//             { time: '2019-09-05', value: 27.79 },
//             { time: '2019-09-06', value: 27.82 },
//             { time: '2019-09-09', value: 27.84 },
//             { time: '2019-09-10', value: 27.86 },
//             { time: '2019-09-11', value: 27.89 },
//             { time: '2019-09-12', value: 27.91 },
//             { time: '2019-09-13', value: 27.94 },
//             { time: '2019-09-16', value: 27.96 },
//             { time: '2019-09-17', value: 27.98 },
//             { time: '2019-09-18', value: 28.01 },
//             { time: '2019-09-19', value: 28.03 },
//             { time: '2019-09-20', value: 28.05 },
//             { time: '2019-09-23', value: 28.08 },
//             { time: '2019-09-24', value: 28.10 },
//             { time: '2019-09-25', value: 28.12 },
//             { time: '2019-09-26', value: 28.15 },
//             { time: '2019-09-27', value: 28.17 },
//             { time: '2019-09-30', value: 28.20 },
//             { time: '2019-10-01', value: 28.22 },
//             { time: '2019-10-02', value: 28.24 },
//             { time: '2019-10-03', value: 28.27 },
//             { time: '2019-10-04', value: 28.29 },
//             { time: '2019-10-07', value: 28.31 },
//             { time: '2019-10-08', value: 28.34 },
//             { time: '2019-10-09', value: 28.36 },
//             { time: '2019-10-10', value: 28.38 },
//             { time: '2019-10-11', value: 28.41 },
//             { time: '2019-10-14', value: 28.43 },
//             { time: '2019-10-15', value: 28.45 },
//             { time: '2019-10-16', value: 28.48 },
//             { time: '2019-10-17', value: 28.50 },
//             { time: '2019-10-18', value: 28.52 },
//             { time: '2019-10-21', value: 28.55 },
//             { time: '2019-10-22', value: 28.57 },
//             { time: '2019-10-23', value: 28.59 },
//             { time: '2019-10-24', value: 28.62 },
//             { time: '2019-10-25', value: 28.64 },
//             { time: '2019-10-28', value: 28.66 },
//             { time: '2019-10-29', value: 28.69 },
//             { time: '2019-10-30', value: 28.71 },
//             { time: '2019-10-31', value: 28.73 },
//             { time: '2019-11-01', value: 28.76 },
//             { time: '2019-11-04', value: 28.78 },
//             { time: '2019-11-05', value: 28.80 },
//             { time: '2019-11-06', value: 28.83 },
//             { time: '2019-11-07', value: 28.85 },
//             { time: '2019-11-08', value: 28.87 },
//             { time: '2019-11-11', value: 28.90 },
//             { time: '2019-11-12', value: 28.92 },
//             { time: '2019-11-13', value: 28.94 },
//             { time: '2019-11-14', value: 28.97 },
//             { time: '2019-11-15', value: 28.99 },
//             { time: '2019-11-18', value: 29.01 },
//             { time: '2019-11-19', value: 29.03 },
//             { time: '2019-11-20', value: 29.06 },
//             { time: '2019-11-21', value: 29.08 },
//             { time: '2019-11-22', value: 29.10 },
//             { time: '2019-11-25', value: 29.13 },
//             { time: '2019-11-26', value: 29.15 },
//             { time: '2019-11-27', value: 29.17 },
//             { time: '2019-11-29', value: 29.20 },
//             { time: '2019-12-02', value: 29.22 },
//             { time: '2019-12-03', value: 29.24 },
//             { time: '2019-12-04', value: 29.27 },
//             { time: '2019-12-05', value: 29.29 },
//             { time: '2019-12-06', value: 29.31 },
//             { time: '2019-12-09', value: 29.34 },
//             { time: '2019-12-10', value: 29.36 },
//             { time: '2019-12-11', value: 29.38 },
//             { time: '2019-12-12', value: 29.41 },
//             { time: '2019-12-13', value: 29.43 },
//             { time: '2019-12-16', value: 29.45 },
//             { time: '2019-12-17', value: 29.48 },
//             { time: '2019-12-18', value: 29.50 },
//             { time: '2019-12-19', value: 29.52 },
//             { time: '2019-12-20', value: 29.55 },
//             { time: '2019-12-23', value: 29.57 },
//             { time: '2019-12-24', value: 29.59 },
//             { time: '2019-12-26', value: 29.62 },
//             { time: '2019-12-27', value: 29.64 },
//             { time: '2019-12-30', value: 29.66 },
//             { time: '2019-12-31', value: 29.69 },
//             { time: '2020-01-02', value: 29.71 },
//             { time: '2020-01-03', value: 29.73 },
//             { time: '2020-01-06', value: 29.76 },
//             { time: '2020-01-07', value: 29.78 },
//             { time: '2020-01-08', value: 29.80 },
//             { time: '2020-01-09', value: 29.83 },
//             { time: '2020-01-10', value: 29.85 },
//             { time: '2020-01-13', value: 29.87 },
//             { time: '2020-01-14', value: 29.90 },
//             { time: '2020-01-15', value: 29.92 },
//             { time: '2020-01-16', value: 29.94 },
//             { time: '2020-01-17', value: 29.97 },
//             { time: '2020-01-21', value: 29.99 },
//             { time: '2020-01-22', value: 30.01 },
//             { time: '2020-01-23', value: 30.03 },
//             { time: '2020-01-24', value: 30.06 },
//             { time: '2020-01-27', value: 30.08 },
//             { time: '2020-01-28', value: 30.10 },
//             { time: '2020-01-29', value: 30.13 },
//             { time: '2020-01-30', value: 30.15 },
//             { time: '2020-01-31', value: 30.17 },
//             { time: '2020-02-03', value: 30.20 },
//         ]);

//         // Cleanup on unmount
//         return () => {
//             chart.remove();
//         };
//     }, []);

//     return (
//         <div
//             ref={chartContainerRef}
//             style={{ position: "relative", width: "100%" }}
//         />
//     );
// };

// export default TradingChart;

// 'use client'
// import React, { useEffect, useRef } from 'react';
// import { createChart } from 'lightweight-charts';

// const RealtimeChart = () => {
//     const chartContainerRef = useRef(null);
//     const chartRef = useRef(null);
//     const seriesRef = useRef(null);

//     const generateData = (numberOfCandles = 500, updatesPerCandle = 5, startAt = 100) => {
//         let randomFactor = 25 + Math.random() * 25;
//         const samplePoint = (i) =>
//             i *
//                 (0.5 +
//                     Math.sin(i / 1) * 0.2 +
//                     Math.sin(i / 2) * 0.4 +
//                     Math.sin(i / randomFactor) * 0.8 +
//                     Math.sin(i / 50) * 0.5) +
//             200 +
//             i * 2;

//         const createCandle = (val, time) => ({
//             time,
//             open: val,
//             high: val,
//             low: val,
//             close: val,
//         });

//         const updateCandle = (candle, val) => ({
//             time: candle.time,
//             close: val,
//             open: candle.open,
//             low: Math.min(candle.low, val),
//             high: Math.max(candle.high, val),
//         });

//         randomFactor = 25 + Math.random() * 25;
//         const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
//         const numberOfPoints = numberOfCandles * updatesPerCandle;
//         const initialData = [];
//         const realtimeUpdates = [];
//         let lastCandle;
//         let previousValue = samplePoint(-1);
//         for (let i = 0; i < numberOfPoints; ++i) {
//             if (i % updatesPerCandle === 0) {
//                 date.setUTCDate(date.getUTCDate() + 1);
//             }
//             const time = Math.floor(date.getTime() / 1000);
//             let value = samplePoint(i);
//             const diff = (value - previousValue) * Math.random();
//             // const diff = (value - previousValue) * Math.random() * 0.1;
//             value = previousValue + diff;
//             previousValue = value;
//             if (i % updatesPerCandle === 0) {
//                 const candle = createCandle(value, time);
//                 lastCandle = candle;
//                 if (i >= startAt) {
//                     realtimeUpdates.push(candle);
//                 }
//             } else {
//                 const newCandle = updateCandle(lastCandle, value);
//                 lastCandle = newCandle;
//                 if (i >= startAt) {
//                     realtimeUpdates.push(newCandle);
//                 } else if ((i + 1) % updatesPerCandle === 0) {
//                     initialData.push(newCandle);
//                 }
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
//                     vertLines: { color: "#1e293b" },
//                     horzLines: { color: "#1e293b" },
//                 },
//             };

//             chartRef.current = createChart(chartContainerRef.current, chartOptions);
//             const series = chartRef.current.addCandlestickSeries({
//                 upColor: '#26a69a',
//                 downColor: '#ef5350',
//                 borderVisible: false,
//                 wickUpColor: '#26a69a',
//                 wickDownColor: '#ef5350',
//             });

//             seriesRef.current = series;

//             const data = generateData(2500, 20, 1000);
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
//             }, 100);

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
//             {/* <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
//                 <button
//                     style={{
//                         padding: '8px 16px',
//                         fontSize: '16px',
//                         background: '#f0f3fa',
//                         borderRadius: '8px',
//                         cursor: 'pointer',
//                         border: 'none',
//                     }}
//                     onClick={() => chartRef.current?.timeScale().scrollToRealTime()}
//                 >
//                     Go to Realtime
//                 </button>
//             </div> */}
//         </div>
//     );
// };

// export default RealtimeChart;


'use client';
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const RealtimeChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);

    const generateData = (numberOfPoints = 500, startAt = 100) => {
        const samplePoint = (i) =>
            i *
                (0.5 +
                    Math.sin(i / 1) * 0.2 +
                    Math.sin(i / 2) * 0.4 +
                    Math.sin(i / 3) * 0.5) +
            200 +
            i * 2;

            // const samplePoint = (i) =>
            //     500 + // Minimum value
            //     Math.abs(
            //         (i *
            //             (0.5 +
            //                 Math.sin(i / 10) * 0.4 +
            //                 Math.sin(i / 20) * 0.7 +
            //                 Math.sin(i / 100) * 1.5)) %
            //         3500 // Amplitude (max range is 4000 - 500 = 3500)
            //     );

        const initialData = [];
        const realtimeUpdates = [];
        let previousValue = samplePoint(-1);

        for (let i = 0; i < numberOfPoints; ++i) {
            const value = samplePoint(i);
            const diff = (value - previousValue) * Math.random() * 0.5;
            const currentValue = previousValue + diff;
            previousValue = currentValue;

            const point = {
                time: Math.floor(Date.UTC(2018, 0, 1) / 1000) + i * 300, // Increment time by 60 seconds
                value: currentValue,
            };

            if (i < startAt) {
                initialData.push(point);
            } else {
                realtimeUpdates.push(point);
            }
        }

        return { initialData, realtimeUpdates };
    };

    useEffect(() => {
        if (chartContainerRef.current) {
            const chartOptions = {
                layout: {
                    textColor: 'white',
                    background: { type: 'solid', color: '#011120' },
                },
                height: 600,
                grid: {
                    vertLines: { color: '#1e293b', visible: true },
                    horzLines: { color: '#1e293b', visible: true },
                },
                rightPriceScale: {
                    borderVisible: false,
                    scaleMargins: {
                        top: 0.2,
                        bottom: 0.2,
                    },
                },
                timeScale: {
                    borderColor: '#1e293b',
                    timeVisible: true,
                    tickMarkFormatter: (time) => {
                        const date = new Date(time * 1000);
                        return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                    },
                },
            };

            chartRef.current = createChart(chartContainerRef.current, chartOptions);

            // Add area series
            const series = chartRef.current.addAreaSeries({
                topColor: 'rgba(46, 113, 229, 0.6)',
                bottomColor: 'rgba(1, 17, 32, 0.1)',
                lineColor: '#1d4ed8',
                lineWidth: 1,
            });

            seriesRef.current = series;

            const data = generateData(2500, 1000);
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
            }, 1000);

            // Clean up on unmount
            return () => {
                clearInterval(intervalID);
                chartRef.current.remove();
            };
        }
    }, []);

    return (
        <div>
            <div ref={chartContainerRef} style={{ position: 'relative' }}></div>
        </div>
    );
};

export default RealtimeChart;