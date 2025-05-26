"use client";
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CircleArrowRight, Menu, X, LoaderCircle } from 'lucide-react';
import { basicSettingsAPI, getLanguageAPI } from "@/services/apiClient/apiClient";
import styles from "./header.module.css";
import { useLanguage } from "@/context/languageProvider/languageProvider";

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
    button: 'Explore',
}

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { language, setLanguage } = useLanguage();
    const [translation, setTranslation] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(language);
    const [siteLogo, setSiteLogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [langLoading, setLangLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
        setIsLoggedIn(!!token);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    useEffect(() => {
        setLoading(true);
        const fetchLanguages = async () => {
            try {
                const response = await basicSettingsAPI();
                setLanguages(response.data?.data?.languages || []);
                setSiteLogo(response.data?.data?.basic_settings?.logo);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    useEffect(() => {
        setLangLoading(true);
        const getLanguages = async () => {
            try {
                const response = await getLanguageAPI(language);
                const currentLang = response.data?.data?.languages?.find(l => l.code === language);
                setTranslation(currentLang?.translate_key_values || {});
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLangLoading(false);
            }
        };

        getLanguages();
    }, [language]);

    const t = (key) => translation[key] || key;

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setSelectedLanguage(newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <header className="header-section section--bg sticky border-b border-slate-800 py-3 lg:py-0 top-0 z-10">
            <div className="custom-container-hero">
                <div className="header-wrapper flex justify-between items-center">
                    <Link href="/" className="site-logo relative overflow-hidden">
                        {siteLogo ? (
                            <Image src={siteLogo}
                                className="object-cover w-[100px] lg:w-[140px]" 
                                width={140}
                                height={40}
                                alt="logo"
                                priority={true}
                                quality={50}
                                decoding="async"
                            />
                        ) : (
                            <div className="h-10 w-[100px] bg-gray-800 animate-pulse rounded-md"></div>
                        )}
                    </Link>
                    <ul className={`header-nav ${isMobileMenuOpen ? 'open' : ''} block lg:flex items-center gap-10`}>
                        {navLink.map(( link ) => {
                            const isActive = pathname == link.href;
                            return (
                                <Link href={link.href} key={link.name} className={isActive ? styles.linkActive : styles.link}>
                                    {t(link.name)}
                                </Link>
                            );
                        })}
                    </ul>
                    <div className="header-action-wrapper flex items-center gap-3">
                        <div>
                            {loading ? (
                                <div className="animate-pulse">
                                    <div className="h-6 w-20 bg-gray-700 rounded-md"></div>
                                    <div className="h-4 w-24 bg-gray-800 mt-1 rounded-md"></div>
                                </div>
                            ) : (
                                <select className="section--bg border-slate-800 text-slate-300 text-xs md:text-sm rounded-md mr-2 lg:mr-0" value={selectedLanguage} onChange={handleLanguageChange} disabled={loading}>
                                    {languages.length > 0 ? (
                                        languages.map((lang) => (
                                            <option key={lang.id} value={lang.code}>
                                                {lang.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No languages available</option>
                                    )}
                                </select>
                            )}
                        </div>
                        <div className="header-action hidden md:block mr-2 lg:mr-0">
                            {isLoggedIn ? (
                                <Link className={styles.headerAction} href="/trading">{t(header.button)} <CircleArrowRight className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} /></Link>
                            ) : (
                                <>
                                    <Link className={styles.headerAction} href="/login">{t(header.button)} <CircleArrowRight className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} /></Link>
                                </>
                            )}
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