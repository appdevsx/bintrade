"use client";
import { useState } from "react";
import { useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, StepForward, Minimize2 } from 'lucide-react';
import styles from "./sidebar.module.css";

const sidebarLinks = [
    {
        icon: Minimize2,
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
        icon: Minimize2,
        name: 'History',
        href: '/',
        submenu: null,
        arrow: null,
    },
    {
        icon: Minimize2,
        name: 'Help',
        href: '',
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

    const handleLinkClick = (e, sidebarLink, index) => {
        if (!sidebarLink.href) {
            e.preventDefault();
            setOpenSubmenus(prevState => ({
                ...prevState,
                [index]: !prevState[index]
            }));
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="fixed top-0 left-0 w-[80px] h-screen section--bg border-r border-slate-800 py-8 px-2">
            <button className={`sidebar-mobile-toggle lg:hidden fixed top-1/2 left-0 z-50 lg:z-0 bg-white custom--shadow-inner text--base py-2 pr-3 ${isSidebarOpen ? 'active-class' : ''}`}
                onClick={toggleSidebar}>
                <StepForward size={25} />
            </button>
            <div className="">
                <div className="sidebar-wrapper">
                    <ul className="sidebar-main-menu space-y-2">
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
    )
}