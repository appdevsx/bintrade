'use client'
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const TradingChart = () => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
        // Create the chart
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 900,
            layout: {
                background: { type: 'solid', color: '#011120' },
                textColor: "#d9d9d9",
            },
            grid: {
                vertLines: { color: "#1e293b" },
                horzLines: { color: "#1e293b" },
            },
            timeScale: {
                borderColor: "#1e293b",
            },
        });

        // Add a candlestick series
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderDownColor: "#ef5350",
            borderUpColor: "#26a69a",
            wickDownColor: "#ef5350",
            wickUpColor: "#26a69a",
        });

        // Sample data for the chart
        candlestickSeries.setData([
            { time: "2023-01-01", open: 100, high: 105, low: 95, close: 102 },
            { time: "2023-01-02", open: 102, high: 110, low: 100, close: 108 },
            { time: "2023-01-03", open: 108, high: 112, low: 105, close: 110 },
            { time: "2023-01-04", open: 110, high: 120, low: 108, close: 115 },
        ]);

        // Resize the chart on window resize
        const handleResize = () => {
            chart.resize(chartContainerRef.current.clientWidth, 300);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    return (
        <div
            ref={chartContainerRef}
            style={{ position: "relative", width: "100%" }}
        />
    );
};

export default TradingChart;