import Link from "next/link";
import Image from "next/image";
import Button from "../button/button";
import { ArrowRightToLine } from 'lucide-react';

import logo from '@/public/images/logo/logo.png';

const footer = {
    image: logo,
    copyright: '© Copyright 2025. Template by AppDevs®'
}

const footerWidget = {
    titleOne: 'Pages',
    titleTwo: 'Usefull',
    titleThree: 'Company',
    titleFour: 'Access',
}

const footerFirstLists = [
    {
        name: 'About Us',
        href: '/',
    },
    {
        name: 'Contact',
        href: '/',
    },
    {
        name: 'FAQ',
        href: '/',
    }
]

const footerSecondLists = [
    {
        name: 'Download App',
        href: '/',
    },
    {
        name: 'Web Journal',
        href: '/',
    },
    {
        name: 'Services',
        href: '/',
    }
]

const footerThirdLists = [
    {
        name: 'Privacy Policy',
        href: '/',
    },
    {
        name: 'Terms & Conditions',
        href: '/',
    },
    {
        name: 'Refund Policy',
        href: '/',
    }
]

const footerFourthLists = [
    {
        name: 'Register',
        href: '/',
    },
    {
        name: 'Login',
        href: '/',
    }
]

const footerSubscribe = {
    title: 'What about trading?',
    description: 'Please fill this form and we will notify you about the newest update',
}

const footerSocials = [
    {
        name: 'Twitter',
        href: '/',
    },
    {
        name: 'Instagram',
        href: '/',
    },
    {
        name: 'Linked In',
        href: '/',
    }
]

export default function Footer() {
    return (
        <footer className="footer-section section--bg pt-20">
            <div className="footer-top-area">
                <div className="custom-container">
                    <div className="footer-top-wrapper grid grid-cols-1 gap-8 lg:grid-cols-1">
                        <div className="flex justify-center sm:justify-start">
                            <div className="footer-widget">
                                <div className="foote-logo">
                                    <Link href="/" className="site-logo relative overflow-hidden">
                                        <Image src={footer.image} 
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
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerWidget.titleOne}</h4>
                                <ul className="footer-list space-y-2">
                                    {footerFirstLists.map(( footerFirstList, index ) => {
                                        return (
                                            <li className="font-medium text-sm text-slate-300" key={index}>
                                                <Link href="{footerFirstList.href}">{footerFirstList.name}</Link>
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
                                            <li className="font-medium text-sm text-slate-300" key={index}>
                                                <Link href="{footerSecondList.href}">{footerSecondList.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerWidget.titleThree}</h4>
                                <ul className="footer-list space-y-2">
                                    {footerThirdLists.map(( footerThirdList, index ) => {
                                        return (
                                            <li className="font-medium text-sm text-slate-300" key={index}>
                                                <Link href="{footerThirdList.href}">{footerThirdList.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerWidget.titleFour}</h4>
                                <ul className="footer-list space-y-2">
                                    {footerFourthLists.map(( footerFourthList, index ) => {
                                        return (
                                            <li className="font-medium text-sm text-slate-300" key={index}>
                                                <Link href="{footerFourthList.href}">{footerFourthList.name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="footer-widget">
                                <h4 className="widget-title text-lg font-bold mb-2.5 text-white">{footerSubscribe.title}</h4>
                                <p className="text-sm text-slate-300">{footerSubscribe.description}</p>
                                <form className="flex space-x-2 mt-4">
                                    <input type="text" placeholder="Type email here..." className="w-full h-10 text-xs font-medium rounded-md shadow-sm border-slate-800 text-slate-300 bg-slate-900"></input>
                                    <Button type="submit" size="xs"><ArrowRightToLine /></Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom-area">
                <div className="custom-container">
                    <div className="footer-bottom-wrapper flex items-center justify-between border-t-2 border-slate-800 pt-10 pb-10 mt-14">
                        <div className="copyright-wrapper">
                            <p className="font-medium text-sm text-slate-300">{footer.copyright}</p>
                        </div>
                        <div className="footer-social-wrapper">
                            <ul className="footer-social-list flex items-center justify-between space-x-7">
                                {footerSocials.map(( footerSocial, index ) => {
                                    return (
                                        <li className="font-medium text-sm text-slate-300" key={index}>
                                            <Link href="{footerSocial.href}">{footerSocial.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
