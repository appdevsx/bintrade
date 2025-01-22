import { DM_Sans } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/common/sidebar/sidebar";
import Topbar from "@/components/common/topbar/topbar";
import { AccountProvider } from "@/context/accountProvider/accountProvider";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "BinTrade | Online Trading Platform",
    description: "Online Trading Platform",
};

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AccountProvider>
                    <main className="dashboard-layout">
                        <div className="dashboard-wrapper">
                            <Sidebar/>
                            <div className="dashboard-main-wrapper w-[calc(100%-80px)] ml-auto">
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