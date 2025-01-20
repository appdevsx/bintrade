"use client";
import Link from "next/link";
import { UserRoundSearch, ArrowUpLeft } from 'lucide-react';
import styles from "./topbar.module.css";

export default function Topbar() {
    return (
        <div className="flex items-center justify-between py-3 px-4">
            <div className=""></div>
            <div className="flex items-center gap-4">
                <div className="">
                    <Link className="baseBtn" href="/">Payments</Link>
                </div>
                <div className="relative w-12 h-12 flex justify-center items-center bg-[#0d1f30] rounded-full">
                    <UserRoundSearch className="w-5" />
                    <div className="absolute bottom-0 right-[-5px] w-5 h-5 flex justify-center items-center bg-[#0d1f30] border-2 border-[#000000] rounded-full">
                        <ArrowUpLeft className="text-[#2e71e5] w-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}