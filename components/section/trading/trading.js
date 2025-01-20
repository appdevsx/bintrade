import dynamic from 'next/dynamic';
import Asidebar from "@/components/common/asidebar/asidebar";
const RealtimeChart = dynamic(() => import('@/components/common/tradingChart/tradingChart'), {
    ssr: false,
});

export default function Chart() {
    return (
        <div className="flex overflow-hidden">
            <RealtimeChart />
            <Asidebar/>
        </div>
    );
}