"use client";
import Link from "next/link";
import Image from "next/image";
import { UserRound, ArrowUpLeft, Plus, ChevronDown } from 'lucide-react';
import styles from "./topbar.module.css";

import asia from '@/public/images/currency/asia.svg';

export default function Topbar() {
    return (
        <div className="flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 flex justify-center items-center bg-[#0d1f30] rounded-md">
                    <Plus className="w-6" />
                </div>
                <div className="flex items-center bg-[#0d1f30] py-1.5 px-3 rounded-md">
                    <div className="">
                        <Image src={asia} 
                            className="object-cover" 
                            width={30} 
                            alt="currency"
                            priority={true} 
                            quality={50}  
                            decoding="async" 
                        />
                    </div>
                    <div className="pl-1">
                        <div className="text-sm leading-[18px] text-white">Asia Composite Index</div>
                        <div className="text-[12px] leading-[14px]">FT - <span className="text-emerald-400">85%</span></div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative top-1 mr-4 cursor-pointer">
                    <div className="text-white font-semibold text-[18px] leading-[20px]">Đ10,001.05</div>
                    <div className="text-[12px] text-emerald-400">Demo account</div>
                    <div className="absolute bottom-[2px] right-[-7px]">
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
    )
}