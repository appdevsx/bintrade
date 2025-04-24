"use client";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransactions } from "@/context/transactionProvider/transactionProvider";
import { Gauge, StepForward, Minimize2, RedoDot, MessageCircleQuestion, X, MessageSquare, PlusCircle, Paperclip, Send, ArrowRightToLine, TrendingUp, DollarSign, PieChart, Repeat, Maximize2, CheckCircle, LogOut, LoaderCircle } from 'lucide-react';
import styles from "./sidebar.module.css";
import { logoutAPI, getInfoAPI, getSupportTicketsAPI, storeSupportTicketAPI } from "@/services/apiClient/apiClient";

import logo from '@/public/images/logo/favicon.png';
import user from '@/public/images/user/user-1.webp';
import admin from '@/public/images/user/user-2.webp';

const sidebarLinks = [
    {
        icon: Gauge,
        name: 'Analytics',
        href: null,
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
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const defaultOpenSubmenus = {
        4: true,
        17: true
    };
    const { transactions, fetchTransactions } = useTransactions();
    const [loading, setLoading] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState(defaultOpenSubmenus);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAnalyticsSidebarOpen, setIsAnalyticsSidebarOpen] = useState(false);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [isLogsSidebarOpen, setLogsSidebarOpen] = useState(false);
    const [isHelpSidebarOpen, setHelpSidebarOpen] = useState(false);
    const [isTicketsSidebarOpen, setTicketsSidebarOpen] = useState(false);
    const [isCreateTicketsSidebarOpen, setCreateTicketsSidebarOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ticketForm, setTicketForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        attachment: null,
    });
    const [isChatSidebarOpen, setChatSidebarOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: "user", text: "Hi, I need help with my account.", image: user },
        { type: "support", text: "Sure! What seems to be the issue?", image: admin },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [attachment, setAttachment] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
          if (file.type.startsWith("image/")) {
            setFilePreview(URL.createObjectURL(file));
          } else {
            setFilePreview(file.name);
          }
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setTicketForm({ ...ticketForm, [name]: value });
    };

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files);
        setAttachment((prev) => [...prev, ...newFiles]);
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setAttachment((prev) => [...prev, ...droppedFiles]);
      };
    
      const removeFile = (index) => {
        setAttachment((prev) => prev.filter((_, i) => i !== index));
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Ticket Created Successfully", {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
        setTicketForm({
          name: "",
          email: "",
          subject: "",
          message: "",
          attachment: null,
        });
        setAttachment([]);
        handleCreateTicketsClick();
    };

    const sendMessage = () => {
        if (newMessage.trim() || selectedFile) {
          const newMsg = {
            type: "user",
            text: newMessage || "",
            image: user,
            file: selectedFile ? { name: selectedFile.name, preview: filePreview } : null,
          };
    
          setMessages((prev) => [...prev, newMsg]);
          setNewMessage("");
          setSelectedFile(null);
          setFilePreview(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    const closeAllSidebars = () => {
        setIsAnalyticsSidebarOpen(false);
        setLogsSidebarOpen(false);
        setHelpSidebarOpen(false);
        setTicketsSidebarOpen(false);
        setCreateTicketsSidebarOpen(false);
        setChatSidebarOpen(false);
    };

    const handleTicketsClick = () => {
        setTicketsSidebarOpen(true);
    };

    const handleCreateTicketsClick = () => {
        setCreateTicketsSidebarOpen(true);
    };

    const handleLinkClick = (e, sidebarLink, index) => {
        if (!sidebarLink.href) {
            e.preventDefault();
            setOpenSubmenus(prevState => ({
                ...prevState,
                [index]: !prevState[index]
            }));
        }
        if (sidebarLink.name === "Analytics") {
            e.preventDefault();
            setIsAnalyticsSidebarOpen(true);
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

    const onLogout = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await logoutAPI();

            console.log(response);

            const successMessage = response?.data?.message?.success || "Logout successful";

            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userInfo");

            sessionStorage.removeItem("jwtToken");
            sessionStorage.removeItem("userInfo");

            successMessage.forEach((msg) => {
                toast.success(msg);
            })

            closeModal;

            router.push("/login");
        } catch (err) {
            if (err.response?.data?.message?.error) {
                const errors = err.response?.data?.message?.error;
                errors.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error("Server didn't respond");
            }
        } finally {
            setLoading(false);
        }
    };

    const openModal = () => {
        setModalOpen(true);
        setTimeout(() => setShowContent(true), 10);
    };

    const closeModal = () => {
        setShowContent(false);
        setTimeout(() => setModalOpen(false), 300);
    };

    const handleNavigateToConversation = (ticketId) => {
        closeAllSidebars(true);
        router.push(`/trading/conversation?Id=${ticketId}`);
      };

    useEffect(() => {
        sessionStorage.setItem("currentPage", currentPage);
        const fetchTicketsData = async () => {
            setLoading(true);
            try {
                const response = await getSupportTicketsAPI(currentPage);
                const { data } = response.data.data.support_tickets;
                setTickets(data);
                setTotalPages(response.data.data.support_tickets.last_page);
            } catch (err) {
                const errors = err.response?.data?.message?.error;
                toast.error(errors || "Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchTicketsData();
    }, [currentPage]);

    const handleTicketSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const response = await storeSupportTicketAPI(
                ticketForm.name,
                ticketForm.email,
                ticketForm.subject,
                ticketForm.message,
                attachment
            );

            response.data.message.success.forEach((msg) => {
                toast.success(msg);
            });

            const updatedTicketsResponse = await getSupportTicketsAPI(currentPage);
            const { data } = updatedTicketsResponse.data.data.support_tickets;
            setTickets(data);
            setTotalPages(updatedTicketsResponse.data.data.support_tickets.last_page);
    
            setTicketForm({ name: "", email: "", subject: "", message: "" });
            setAttachment([]);
            setCreateTicketsSidebarOpen(false);
            setTicketsSidebarOpen(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.error) {
                error.response.data.message.error.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error("Server did not respond");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await getInfoAPI();
                const statistics = response.data?.data?.statistics || {};

                const mappedData = [
                    { title: "Trades Count", value: statistics.total_trade, icon: <TrendingUp className="text-blue-400 w-6 h-6" /> },
                    { title: "Trades Profit", value: `$${statistics.total_profit}`, icon: <DollarSign className="text-green-400 w-6 h-6" /> },
                    { title: "Profitable Trades", value: `${statistics.total_profit_count}%`, icon: <PieChart className="text-yellow-400 w-6 h-6" /> },
                    { title: "Average Profit", value: `$${statistics.avg_profit}`, icon: <DollarSign className="text-green-400 w-6 h-6" /> },
                    { title: "Win/Loss Ratio", value: `${statistics.total_profit_count}:${statistics.total_lose_count}`, icon: <Repeat className="text-indigo-400 w-6 h-6" /> },
                    { title: "Min Trade Amount", value: `$${statistics.min_trade_amount}`, icon: <Minimize2 className="text-purple-400 w-6 h-6" /> },
                    { title: "Max Trade Amount", value: `$${statistics.max_trade_amount}`, icon: <Maximize2 className="text-red-400 w-6 h-6" /> },
                    { title: "Max Trade Profit", value: `$${statistics.max_trade_profit}`, icon: <CheckCircle className="text-green-400 w-6 h-6" /> },
                ];

                setAnalyticsData(mappedData);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);
    
    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <>
            <Toaster reverseOrder={false} theme="dark" />
            <div className="fixed top-[70px] lg:top-0 left-0 w-[80px] h-screen z-[3]">
                <button className={`sidebar-mobile-toggle lg:hidden fixed top-1/2 left-0 z-50 lg:z-0 bg-[#0d1f30] text--base py-2 pr-3 ${isSidebarOpen ? 'active-class' : ''}`}
                    onClick={toggleSidebar}>
                    <StepForward size={25} />
                </button>
                <div className={`sidebar transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed w-[80px] h-screen section--bg border-r border-slate-800 py-5 px-2 z-[9] lg:z-[2]`}>
                    <div className="sidebar-wrapper h-[calc(100vh-40px)] flex flex-col justify-between">
                        <div className="sidebar-inner-wrapper">
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
                        <button onClick={openModal} className="p-2 flex flex-col justify-center items-center bg-[#0d1f30] rounded-md text-[11px] font-semibold mx-auto leading-[10px]">
                            <LogOut className="w-[14px] relative top-[-3px]" />
                            <span className="relative top-[-3px]">Logout</span>
                        </button>
                    </div>
                </div>
                {isSidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50"
                        onClick={toggleSidebar}
                    ></div>
                )}
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[5] shadow-lg p-4 transform ${isAnalyticsSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Analytics</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 space-y-4">
                    {loading ? (
                        [...Array(8)].map((_, index) => (
                            <div key={index} className="bg-[#0d1f30] rounded-lg p-4 shadow-md flex items-center space-x-4 animate-pulse">
                                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                                    <div className="h-6 bg-gray-700 rounded w-20"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        analyticsData.map((data, index) => (
                            <div
                                key={index}
                                className="bg-[#0d1f30] rounded-lg p-4 shadow-md flex items-center space-x-4"
                            >
                                <div>{data.icon}</div>
                                <div>
                                    <h3 className="text-white font-medium text-lg">{data.title}</h3>
                                    <p className="text-xl font-bold text-green-400">{data.value}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[5] shadow-lg p-4 transform ${isLogsSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">All Logs</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    {loading ? (
                        <ul className="space-y-4">
                            {[...Array(5)].map((_, index) => (
                                <li key={index} className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md animate-pulse">
                                    <span className="block h-4 w-1/4 bg-gray-700 rounded"></span>
                                    <span className="block h-4 w-1/3 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/2 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/4 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/3 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/2 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/4 bg-gray-700 rounded mt-2"></span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-4">
                            {transactions.map((trx, index) => (
                                <li key={index} className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md">
                                    <span className="block">ID - {trx.id}</span>
                                    <span className="block">Transaction ID - {trx.trx_id}</span>
                                    <span className="block">Type - {trx.type}</span>
                                    <span className="block">Amount - {trx.request_amount}</span>
                                    <span className="block">Currency - {trx.request_currency}</span>
                                    <span className="block">Status - <span className="inline-flex items-center rounded-md bg-[#11273c] px-2 py-1 text-xs font-medium text--base ring-1 ring-blue-700/10 ring-inset">{trx.string_status.value}</span></span>
                                    <span className="block">Date - {new Date(trx.created_at).toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[5] shadow-lg p-4 transform ${isHelpSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Help</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4">
                    <button className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md" onClick={handleTicketsClick}>Support Tickets</button>
                </div>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[5] shadow-lg p-4 transform ${isTicketsSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Support Tickets</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    {loading ? (
                        <ul className="space-y-4">
                            {[...Array(5)].map((_, index) => (
                                <li key={index} className="w-full py-2 px-3 bg-[#0d1f30] text-white rounded-md animate-pulse">
                                    <span className="block h-4 w-1/4 bg-gray-700 rounded"></span>
                                    <span className="block h-4 w-1/3 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/2 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/4 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/3 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/2 bg-gray-700 rounded mt-2"></span>
                                    <span className="block h-4 w-1/4 bg-gray-700 rounded mt-2"></span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="space-y-4">
                            {tickets.map((ticket, index) => (
                                <div
                                    key={index}
                                    className="w-full py-3 px-4 bg-[#0d1f30] text-white rounded-md flex justify-between items-center"
                                >
                                    <div>
                                        <p className="text-sm font-semibold">Ticket ID: {ticket.token}</p>
                                        <p className="text-sm">Subject: {ticket.subject}</p>
                                        <p className="text-sm">
                                            Status:{" "}
                                            <span
                                                className={`text-[12px] font-bold ${
                                                    ticket.stringStatus?.value === "Pending" ? "text-[#2dd674]" : "text-[#ff5765]"
                                                }`}
                                            >
                                                {ticket.stringStatus?.value}
                                            </span>
                                        </p>
                                    </div>
                                    <button onClick={() => handleNavigateToConversation(ticket.id)}>
                                        <MessageSquare className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            ))}
                            <button className="baseBtn flex justify-center w-full" onClick={handleCreateTicketsClick}>
                                <PlusCircle />
                                Create New Ticket
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[5] shadow-lg p-4 transform ${isCreateTicketsSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Create New Ticket</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleTicketSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={ticketForm.name}
                            onChange={handleFormChange}
                            className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={ticketForm.email}
                            onChange={handleFormChange}
                            className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={ticketForm.subject}
                            onChange={handleFormChange}
                            className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                            placeholder="Enter subject"
                            required
                        />
                    </div>
                    <div className="!mb-[-10px]">
                        <label className="block text-white mb-2">Message</label>
                        <textarea
                            name="message"
                            value={ticketForm.message}
                            onChange={handleFormChange}
                            className="w-full text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg"
                            placeholder="Enter your message"
                            rows="4"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Attachment</label>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="border-2 border-dashed border-slate-800 rounded-md py-8 px-4 flex flex-col items-center justify-center text-white space-y-4"
                        >
                            <p className="text-sm">Drag & Drop files here or click to upload</p>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-input"
                            />
                            <label
                                htmlFor="file-input"
                                className="cursor-pointer text-sm font-semibold text--base"
                            >
                                Choose Files
                            </label>
                        </div>
                        <div className="space-y-2 mt-2">
                            {attachment.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-[#1a2c3d] px-3 py-2 rounded-md"
                                >
                                    <p className="text-white text-sm truncate">{file.name}</p>
                                    <button onClick={() => removeFile(index)} className="text-red-600">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="baseBtn flex justify-center w-full !mt-6"
                    >
                        {loading ? (
                            <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                        ) : (
                            <>
                                Create Ticket 
                                <ArrowRightToLine />
                            </>
                        )}
                    </button>
                </form>
            </div>
            <div className={`fixed bottom-0 left-0 h-full bg-[#051524] border-r-2 border-slate-800 w-full sm:w-[400px] overflow-y-auto z-[5] shadow-lg p-4 transform ${isChatSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-white text-lg font-semibold">Support Chat</h2>
                    <button onClick={closeAllSidebars}>
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 space-y-4 flex flex-col justify-end overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {msg.type === "support" && (
                                <Image
                                    src={msg.image}
                                    width={32}
                                    height={32}
                                    alt="Admin"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <div
                                className={`max-w-xs p-3 rounded-lg text-white ${
                                    msg.type === "user"
                                    ? "bg-blue-600 text-right"
                                    : "bg-[#0d1f30] text-left"
                                }`}
                            >
                                <p>{msg.text}</p>
                                {msg.file && (
                                    <div className="mt-2">
                                        {msg.file.preview.startsWith("blob:") ? (
                                            <img
                                            src={msg.file.preview}
                                            alt="Uploaded file"
                                            className="max-h-40 rounded-lg"
                                            />
                                        ) : (
                                            <a
                                            href={msg.file.preview}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-300 underline"
                                            >
                                            {msg.file.name}
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                            {msg.type === "user" && (
                                <Image
                                    src={msg.image}
                                    width={32}
                                    height={32}
                                    alt="user"
                                    className="w-8 h-8 rounded-full ml-2"
                                />
                            )}
                        </div>
                    ))}
                </div>
                {filePreview && (
                    <div className="p-4 bg-[#0d1f30]">
                        {filePreview.startsWith("blob:") ? (
                            <img
                            src={filePreview}
                            alt="Selected file preview"
                            className="max-h-40 mx-auto rounded-lg"
                            />
                        ) : (
                            <p className="text-white text-sm text-center">{filePreview}</p>
                        )}
                    </div>
                )}
                <div className="p-4 bg-[#0d1f30] flex items-center space-x-2">
                    <label htmlFor="file-input" className="cursor-pointer">
                        <Paperclip className="text-white w-6 h-6" />
                        <input
                            type="file"
                            id="file-input"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="text-sm w-full py-3 px-3 gradient--bg border-slate-800 text-white rounded-md"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                        >
                        <Send className="w-4 h-4 mr-1" />
                        Send
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <div className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-300 ${showContent ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
                    <div className={`bg-[#0d1f30] rounded-xl relative transform transition-all duration-300 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <button onClick={closeModal} className="absolute top-[-10px] right-[-10px] w-10 h-10 bg-[#0d1f30] rounded-full flex items-center justify-center transition-all hover:text-red-500">
                            <X className="w-4 h-auto"/>
                        </button>
                        <div className="sm:w-[400px] w-[300px] p-5">
                            <span className="text-sm">Are you sure you want to log out?</span>
                            <div className="mt-5 space-y-2">
                                <button onClick={onLogout} disabled={loading} className={`w-full py-2 rounded-lg text-sm text-white bg--base transition-all hover:bg-red-500 ${loading ? "cursor-not-allowed" : ""}`}>
                                    {loading ? <LoaderCircle className="inline-block w-5 h-auto animate-spin text-white"/> : "Yes, i want to logout"}
                                </button>
                                <button onClick={closeModal} className="w-full py-2 rounded-lg text-sm border border--base text-white transition-all hover:border-red-500 hover:bg-red-500">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={closeModal} className="fixed top-0 left-0 w-full h-full z-[-2]"></div>
                </div>
            )}
        </>
    )
}