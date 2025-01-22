"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserRound, ArrowUpLeft, Plus, ChevronDown, X } from 'lucide-react';
import { useAccount } from "@/context/accountProvider/accountProvider";
import styles from "./topbar.module.css";

import crypto from '@/public/images/currency/crypto.svg';

export default function Topbar() {
    const { accountBalance } = useAccount();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState("Demo Account");

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    const selectAccount = (accountType) => {
        setSelectedAccount(accountType);
        toggleSidebar(); // Close the sidebar after selecting
    };

    return (
        <>
            <div className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-md">
                        <Plus className="w-6" />
                    </div>
                    <div className="flex items-center bg-[#0d1f30] py-1.5 px-3 rounded-md">
                        <div className="">
                            <Image src={crypto} 
                                className="object-cover" 
                                width={30} 
                                alt="currency"
                            />
                        </div>
                        <div className="pl-1">
                            <div className="text-sm leading-[18px] text-white">Asia Composite Index</div>
                            <div className="text-[12px] leading-[14px]">FT - <span className="text-emerald-400">85%</span></div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative top-1 mr-6 cursor-pointer" onClick={toggleSidebar}>
                        <div className="text-white font-semibold text-[18px] leading-[20px]">Đ{accountBalance.toFixed(2)}</div>
                        {/* <div className="text-white font-semibold text-[18px] leading-[20px]">Đ10,001.05</div> */}
                        <div className="text-[12px] text-emerald-400">{selectedAccount}</div>
                        <div className="absolute bottom-[4px] right-[-20px]">
                            <ChevronDown className="w-4" />
                        </div>
                    </div>
                    <div className="">
                        <Link className="baseBtn !py-2 !px-4" href="/">Payments</Link>
                    </div>
                    <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-full">
                        <UserRound className="w-5" />
                        <div className="absolute bottom-0 right-[-5px] w-5 h-5 flex justify-center items-center bg-[#0d1f30] border-2 border-[#000000] rounded-full">
                            <ArrowUpLeft className="text-[#2e71e5] w-4" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`fixed top-0 right-0 h-full bg-[#051524] border-l-2 border-slate-800 w-[400px] z-[3] shadow-lg transform p-4 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Accounts</h2>
                    <button onClick={toggleSidebar}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <button
                        className={`w-full text-left py-3 px-7 rounded-md mb-2 ${
                        selectedAccount === "Demo Account"
                            ? "bg-[#0d1f30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => selectAccount("Demo Account")}
                    >
                        <div className="text-white font-semibold text-[18px] leading-[20px]">Đ{accountBalance.toFixed(2)}</div>
                        <div className="text-[12px] text-emerald-400">Demo Account</div>
                    </button>
                    <button
                        className={`w-full text-left py-3 px-7 rounded-md ${
                        selectedAccount === "Live Account"
                            ? "bg-[#0d1f30]"
                            : "bg-transparent"
                        }`}
                        onClick={() => selectAccount("Live Account")}
                    >
                        <div className="text-white font-semibold text-[18px] leading-[20px]">Đ{accountBalance.toFixed(2)}</div>
                        <div className="text-[12px] text-emerald-400">Live Account</div>
                    </button>
                </div>
            </div>
        </>
    )
}