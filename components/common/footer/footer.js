'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/button";
import { ArrowRightToLine, LoaderCircle } from 'lucide-react';
import { newsletterAPI, getUsefullLinksAPI, getFooterAPI } from "@/services/apiClient/apiClient";
import { useLanguage } from "@/context/languageProvider/languageProvider";

import logo from '@/public/images/logo/logo.png';

const footerWidget = {
    titleOne: 'Pages',
    titleTwo: 'Usefull',
    titleThree: 'Company',
    titleFour: 'Access',
}

const footerFirstLists = [
    {
        name: 'About Us',
        href: '/about',
    },
    {
        name: 'Contact',
        href: '/contact',
    },
    {
        name: 'FAQ',
        href: '/faq',
    }
]

const footerSecondLists = [
    {
        name: 'Download App',
        href: '/app',
    },
    {
        name: 'Web Journal',
        href: '/blog',
    },
    {
        name: 'Services',
        href: '/service',
    }
]

const footerThirdLists = [
    {
        name: 'Privacy Policy',
        href: '/privacy',
    },
    {
        name: 'Terms & Conditions',
        href: '/terms',
    },
    {
        name: 'Refund Policy',
        href: '/refund',
    }
]

const footerFourthLists = [
    {
        name: 'Register',
        href: '/register',
    },
    {
        name: 'Login',
        href: '/login',
    }
]

const footerSubscribe = {
    title: 'What about trading?',
    description: 'Please fill this form and we will notify you about the newest update',
}

const footerSocials = [
    {
        name: 'Twitter',
        href: 'https://x.com',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com',
    },
    {
        name: 'Linked In',
        href: 'https://linkedin.com',
    }
]

export default function Footer() {
    const [email, setEmail] = useState('');
    const [links, setLinks] = useState([]);
    const [footer, setFooter] = useState([]);
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await newsletterAPI(email);

            if (response.data.type === "success") {
                toast.success(response.data.message.success[0]);
            } else {
                toast.error(response.data.message.error[0]);
            }
        } catch (error) {
            toast.error("Server did not respond");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchUsefullLinks = async () => {
            try {
                const response = await getUsefullLinksAPI();
                setLinks(response.data?.data?.useful_links || []);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchUsefullLinks();
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchFooter = async () => {
            try {
                const response = await getFooterAPI();
                setFooter(response.data?.data?.section);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchFooter();
    }, []);

    return (
        <footer className="footer-section section--bg pt-20">
            <Toaster reverseOrder={false} theme="dark" />
            <div className="footer-top-area">
                <div className="custom-container">
                    <div className="footer-top-wrapper grid grid-cols-1 gap-8 lg:grid-cols-1">
                        <div className="flex">
                            <div className="footer-widget">
                                <div className="foote-logo">
                                    <Link href="/" className="site-logo relative overflow-hidden">
                                        <Image src={logo} 
                                            className="object-cover"
                                            width={140}
                                            alt="logo"
                                            priority={true} 
                                            quality={50}
                                            decoding="async"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerWidget.titleOne}</h4>
                                <ul className="footer-list space-y-2">
                                    {footerFirstLists.map(( footerFirstList, index ) => {
                                        return (
                                            <li className="font-medium text-sm text-slate-300 hover:text-white" key={index}>
                                                <Link href={footerFirstList.href}>{footerFirstList.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerWidget.titleTwo}</h4>
                                <ul className="footer-list space-y-2">
                                    {footerSecondLists.map(( footerSecondList, index ) => {
                                        return (
                                            <li className="font-medium text-sm text-slate-300 hover:text-white" key={index}>
                                                <Link href={footerSecondList.href}>{footerSecondList.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerWidget.titleThree}</h4>
                                {loading ? (
                                    <div className="animate-pulse">
                                        <div className="h-6 w-20 bg-gray-700 rounded-md"></div>
                                        <div className="h-4 w-24 bg-gray-800 mt-1 rounded-md"></div>
                                    </div>
                                ) : (
                                    <ul className="footer-list space-y-2">
                                        {links.map(( footerThirdList, index ) => {
                                            return (
                                                <li className="font-medium text-sm text-slate-300 hover:text-white" key={index}>
                                                    <Link href={footerThirdList.slug}>{footerThirdList.url}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerWidget.titleFour}</h4>
                                <ul className="footer-list space-y-2">
                                    {footerFourthLists.map(( footerFourthList, index ) => {
                                        return (
                                            <li className="font-medium text-sm text-slate-300 hover:text-white" key={index}>
                                                <Link href={footerFourthList.href}>{footerFourthList.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footer.newsletter_title}</h4>
                                <p className="text-sm text-slate-300">{footer.newsletter_desc}</p>
                                <form className={`flex ${language === 'ar' ? 'lg:space-x-reverse lg:space-x-2' : 'lg:space-x-2'} mt-4`} onSubmit={handleSubmit}>
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Type email here..." className="w-full h-10 text-xs font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-slate-900" required></input>
                                    <Button type="submit" size="xs" disabled={loading}>
                                        {loading ? (
                                        <LoaderCircle className="animate-spin text-4xl" />
                                            ) : (
                                            <ArrowRightToLine className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} />
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-area">
                <div className="custom-container">
                    <div className="footer-bottom-wrapper block text-center sm:flex items-center justify-between border-t-2 border-slate-800 pt-10 pb-10 mt-14">
                        <div className="copyright-wrapper">
                            <p className="font-medium text-sm text-slate-300">{footer.copyright_text}</p>
                        </div>
                        <div className="footer-social-wrapper">
                            <ul className="footer-social-list flex items-center mt-2 sm:mt-0 justify-center sm:justify-between space-x-7">
                                {footer?.social_links?.map((footerSocial, index) => (
                                    <li className="font-medium text-sm text-slate-300" key={index}>
                                        <Link href={footerSocial.link} target="_blank">
                                            {footerSocial.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
