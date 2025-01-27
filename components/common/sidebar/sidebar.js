"use client";
import { useState } from "react";
import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, StepForward, Minimize2, RedoDot, MessageCircleQuestion, X, MessageSquare, PlusCircle } from 'lucide-react';
import styles from "./sidebar.module.css";

import logo from '@/public/images/logo/favicon.png';

const sidebarLinks = [
    {
        icon: Gauge,
        name: 'Analytics',
        href: '/dashboard',
        submenu: null,
        arrow: null,
    },
    {
        icon: Minimize2,
        name: 'Trading',
        href: '/trading',
        submenu: null,
        arrow: null,
    },
    {
        icon: RedoDot,
        name: 'All Logs',
        href: null,
        submenu: null,
        arrow: null,
    },
    {
        icon: MessageCircleQuestion,
        name: 'Help',
        href: null,
        submenu: null,
        arrow: null,
    },
]

export default function Sidebar() {

    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const defaultOpenSubmenus = {
        4: true,
        17: true
    };
    const [openSubmenus, setOpenSubmenus] = useState(defaultOpenSubmenus);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLogsSidebarOpen, setLogsSidebarOpen] = useState(false);
    const [isHelpSidebarOpen, setHelpSidebarOpen] = useState(false);
    const [isTicketsSidebarOpen, setTicketsSidebarOpen] = useState(false);
    const [isChatSidebarOpen, setChatSidebarOpen] = useState(false);

    const closeAllSidebars = () => {
        setLogsSidebarOpen(false);
        setHelpSidebarOpen(false);
        setTicketsSidebarOpen(false);
        setChatSidebarOpen(false);
    };

    const handleTicketsClick = () => {
        setTicketsSidebarOpen(true);
    };

    const handleChatClick = () => {
        setChatSidebarOpen(true);
    };

    const handleLinkClick = (e, sidebarLink, index) => {
        if (!sidebarLink.href) {
            e.preventDefault();
            setOpenSubmenus(prevState => ({
                ...prevState,
                [index]: !prevState[index]
            }));
        }
        if (sidebarLink.name === "All Logs") {
            e.preventDefault();
            setLogsSidebarOpen(true);
        }
        if (sidebarLink.name === "Help") {
            e.preventDefault();
            setHelpSidebarOpen(true);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const transactionLogs = [
        { type: "Deposit", amount: "$100" },
        { type: "Withdraw", amount: "$50" },
        { type: "Exchange", details: "BTC to ETH" },
    ];

    const supportTickets = [
        { ticketId: "12345", subject: "Issue with payment", status: "Open" },
        { ticketId: "67890", subject: "Account not accessible", status: "Closed" },
    ];

    return (
        <>
            <div className="fixed top-0 left-0 w-[80px] h-screen section--bg border-r border-slate-800 py-5 px-2 z-[2]">
                <button className={`sidebar-mobile-toggle lg:hidden fixed top-1/2 left-0 z-50 lg:z-0 bg-white custom--shadow-inner text--base py-2 pr-3 ${isSidebarOpen ? 'active-class' : ''}`}
                    onClick={toggleSidebar}>
                    <StepForward size={25} />
                </button>
                <div className="">
                    <div className="sidebar-wrapper">
                        <Link href="/" className="site-logo relative overflow-hidden block mb-8">
                            <Image src={logo} 
                                className="object-cover mx-auto" 
                                width={30} 
                                alt="logo"
                                priority={true} 
                                quality={50}  
                                decoding="async" 
                            />
                        </Link>
                        <ul className="sidebar-main-menu space-y-6">
                            {sidebarLinks.map((sidebarLink, index) => {
                                if (sidebarLink.isHeader) {
                                    return (
                                        <li className="sidebar-header" key={`sidebar-header-${index}`}>
                                            <div className="text-[13px] font-semibold text-[#4a4a4a] pt-4 pb-1">
                                                {sidebarLink.name}
                                            </div>
                                        </li>
                                    );
                                }
                                const isActive = pathname == sidebarLink.href;
                                const isSubmenuActive = openSubmenus[index];
                                return (
                                    <li className="sidebar-link" key={`sidebar-link-${index}`}>
                                        <Link
                                            href={sidebarLink.href || '#'}
                                            onClick={(e) => handleLinkClick(e, sidebarLink, index)}
                                            className={isActive ? styles.sidebarLinkActive : styles.sidebarLink}
                                            target={sidebarLink.href && sidebarLink.href.startsWith('http') ? '_blank' : '_self'}
                                            rel={sidebarLink.href && sidebarLink.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            <div className="sidebar-link-inner text-center w-full">
                                                <sidebarLink.icon />
                                                {sidebarLink.name}
                                                {sidebarLink.arrow && (
                                                    <div
                                                        style={{
                                                            transform: isSubmenuActive ? 'rotate(90deg)' : 'rotate(0deg)',
                                                            transition: 'transform 0.3s ease',
                                                        }}
                                                    >
                                                        {sidebarLink.arrow}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                        {sidebarLink.submenu && isSubmenuActive && (
                                            <div className="sub-menu mt-2">
                                                <ul className="sub-menu-list border-l pl-4 ml-4 space-y-2">
                                                    {sidebarLink.submenu.map((sidebarSubLink, sidebarSubIndex) => {
                                                        const isSubActive = pathname == sidebarSubLink.href;
                                                        return (
                                                            <li className="sidebar-sub-menu-link" key={`sub-link-${index}-${sidebarSubIndex}`}>
                                                                <Link href={sidebarSubLink.href} className={isSubActive ? styles.sidebarSubLinkActive : styles.sidebarSubLink} target={sidebarSubLink.href.startsWith('http') ? '_blank' : '_self'}
                                                                    rel={sidebarSubLink.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                                                    {sidebarSubLink.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                {isSidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={toggleSidebar}
                    ></div>
                )}
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-[400px] z-[5] shadow-lg p-4 transform ${isLogsSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">All Logs</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <ul className="space-y-4">
                        {transactionLogs.map((log, index) => (
                            <li key={index} className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md">
                                {log.type} - {log.amount || log.details}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-[400px] z-[5] shadow-lg p-4 transform ${isHelpSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Help</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4">
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleTicketsClick}>Support Tickets</button>
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleChatClick}>Support Chat</button>
                </div>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-[400px] z-[5] shadow-lg p-4 transform ${isTicketsSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Support Tickets</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 space-y-4">
                    {supportTickets.map((ticket, index) => (
                        <div
                            key={index}
                            className="w-full py-3 px-4 bg-[#0d1f30] text-white rounded-md flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm font-semibold">Ticket ID: {ticket.ticketId}</p>
                                <p className="text-sm">{ticket.subject}</p>
                                <p className="text-sm">
                                    Status:{" "}
                                    <span
                                        className={`font-bold ${
                                        ticket.status === "Open" ? "text-[#2dd674]" : "text-[#ff5765]"
                                        }`}
                                    >
                                        {ticket.status}
                                    </span>
                                </p>
                            </div>
                            <button onClick={handleChatClick}>
                                <MessageSquare className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                    ))}
                    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4 flex items-center justify-center gap-2">
                        <PlusCircle />
                        Create New Ticket
                    </button>
                </div>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-[400px] z-[5] shadow-lg p-4 transform ${isChatSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Support Chat</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 space-y-4">
                    <div className="w-full bg-[#0d1f30] p-3 rounded-md text-white">
                        <p>Hi, I need help with my account.</p>
                    </div>
                    <div className="w-full bg-[#0d1f30] p-3 rounded-md text-white">
                        <p>Sure! What seems to be the issue?</p>
                    </div>
                    <div className="w-full mt-4">
                        <input
                            type="text"
                            className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                            placeholder="Type your message..."
                        />
                    </div>
                </div>
            </div>
        </>
    )
}