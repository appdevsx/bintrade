"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const RealtimeChart = dynamic(() => import('@/components/common/tradingChart/tradingChart'), {
    ssr: false,
});

export default function Trading() {
    const [isProcessing, setIsProcessing] = useState(false);
    const handleUpClick = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
        }, 5000);
    };
    return (
        <div className="">
            <RealtimeChart handleUpClick={handleUpClick} isProcessing={isProcessing} />
        </div>
    );
}