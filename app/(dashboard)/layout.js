"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import "../global.scss";
import Sidebar from "@/components/common/sidebar/sidebar";
import Topbar from "@/components/common/topbar/topbar";
import { AccountProvider } from "@/context/accountProvider/accountProvider";
import { LoaderCircle } from 'lucide-react';
import { getInfoAPI } from "@/services/apiClient/apiClient";

const inter = DM_Sans({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        if (!token) {
            router.push("/login");
        } else {
            getInfoAPI()
                .then((response) => {
                    const authorizationStatus = response.data.data?.user_info?.email_verified;
                    if (authorizationStatus == "0") {
                        localStorage.removeItem("jwtToken");
                        sessionStorage.removeItem("jwtToken");
                        router.push("/login");
                    } else {
                        setDashboardData(response.data);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to fetch dashboard data:", error);
                    setIsLoading(false);
                });
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center section--bg z-[999]">
                <LoaderCircle className="inline-block w-10 h-auto animate-spin text-[#cbd5e1]" />
            </div>
        );
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <AccountProvider value={dashboardData}>
                    <main className="dashboard-layout">
                        <div className="dashboard-wrapper">
                            <Sidebar/>
                            <div className="dashboard-main-wrapper lg:w-[calc(100%-80px)] ml-auto">
                                <Topbar/>
                                <div className="dashboard-body-wrapper">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </AccountProvider>
            </body>
        </html>
    );
}