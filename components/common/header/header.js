"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CircleArrowRight, Menu, X } from 'lucide-react';
import styles from "./header.module.css";

import logo from '@/public/images/logo/logo.png';

const navLink = [
    {
        name: 'Trading',
        href: '/',
    },
    {
        name: 'About Us',
        href: '/about',
    },
    {
        name: 'Service',
        href: '/service',
    },
    {
        name: 'News',
        href: '/blog',
    },
    {
        name: 'Help',
        href: '/contact',
    }
]

const header = {
    image: logo,
    button: 'Explore',
}

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="header-section section--bg sticky border-b border-slate-800 py-3 lg:py-0 top-0 z-10">
            <div className="custom-container-hero">
                <div className="header-wrapper flex justify-between items-center">
                    <Link href="/" className="site-logo relative overflow-hidden">
                        <Image src={header.image} 
                            className="object-cover w-[100px] lg:w-[140px]" 
                            width={140} 
                            alt="logo"
                            priority={true} 
                            quality={50}  
                            decoding="async" 
                        />
                    </Link>
                    <ul className={`header-nav ${isMobileMenuOpen ? 'open' : ''} block lg:flex items-center lg:space-x-10`}>
                        {navLink.map(( link ) => {
                            const isActive = pathname == link.href;
                            return (
                                <Link href={link.href} key={link.name} className={isActive ? styles.linkActive : styles.link}>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </ul>
                    <div className="header-action-wrapper flex items-center space-x-3">
                        <div className="header-action">
                            <Link className={styles.headerAction} href="/login">{header.button} <CircleArrowRight /></Link>
                        </div>
                        <div className="lg:hidden">
                            <button onClick={toggleMobileMenu} className="w-10 h-10 flex justify-center items-center border border-slate-800 rounded-full text--base">
                                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}