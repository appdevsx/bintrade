import dynamic from 'next/dynamic';
// import TradingChart from '@/components/common/tradingChart/tradingChart';
const RealtimeChart = dynamic(() => import('@/components/common/tradingChart/tradingChart'), {
    ssr: false,
});

export default function Chart() {
    return (
        <div className="overflow-hidden">
            {/* <TradingChart /> */}
            <RealtimeChart />
        </div>
    );
}