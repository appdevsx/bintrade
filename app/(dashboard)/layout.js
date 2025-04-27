"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import "../global.scss";
import Sidebar from "@/components/common/sidebar/sidebar";
import Topbar from "@/components/common/topbar/topbar";
import { AccountProvider } from "@/context/accountProvider/accountProvider";
import { TransactionProvider } from "@/context/transactionProvider/transactionProvider";
import { SettingsProvider } from "@/context/settingsProvider/settingsProvider";
import { WalletProvider } from "@/context/walletProvider/walletProvider";
import { LoaderCircle } from "lucide-react";
import { getUserDataAPI } from "@/services/apiClient/apiClient";

const inter = DM_Sans({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
            if (!token) {
                router.push("/login");
            } else {
                try {
                    const response = await getUserDataAPI();
                    const authorizationStatus = response?.data?.data?.user_info?.email_verified;
                    if (authorizationStatus == 0) {
                        localStorage.removeItem("jwtToken");
                        sessionStorage.removeItem("jwtToken");
                        router.push("/login");
                    } else {
                        setDashboardData(response.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch dashboard data:", error);
                    setIsLoading(false);
                }
            }
        };
    
        fetchData();
    }, [router]);    

    if (isLoading) {
        return (
            <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center section--bg z-[999]">
                <LoaderCircle className="inline-block w-10 h-auto animate-spin text-[#cbd5e1]" />
            </div>
        );
    }

    return (
        <div className={inter.className}>
            <AccountProvider value={dashboardData}>
                <TransactionProvider>
                    <SettingsProvider>
                        <WalletProvider>
                            <div className="dashboard-layout">
                                <div className="dashboard-wrapper">
                                    <Sidebar />
                                    <div className="dashboard-main-wrapper lg:w-[calc(100%-80px)] ml-auto">
                                        <Topbar />
                                        <div className="dashboard-body-wrapper">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </WalletProvider>
                    </SettingsProvider>
                </TransactionProvider>
            </AccountProvider>
        </div>
    );
}