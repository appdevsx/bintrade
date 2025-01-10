'use client'
import styles from "./register.module.css";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { ArrowRightToLine } from 'lucide-react';
import { ArrowBigLeftDash } from 'lucide-react';

import logo from '@/public/images/logo/favicon.png';

const accountWrapper = {
    backButton: 'Go to home',
	image: logo,
    title: 'Create an account',
    description: 'Sign up to create an account and explore many things',
    accountButton: 'Sign up with bintrade',
    accountSwitchTitle: 'Already have an account?',
    accountSwitchLink: 'Sign in',
}

export default function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        toast.success('Registration Successful!', {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
    };
    return (
		<section className="account-section relative">
            <Toaster reverseOrder={false} theme="dark" />
            <div className={styles.accountElement}></div>
            <div className="back-to-home-btn absolute top-5 left-5">
                <Link href="/" className="custom--btn--bg inline-flex items-center gap-2 text-white font-semibold rounded-md transition-all hover:bg-blue-700 px-6 py-2 text-sm custom--shadow"><ArrowBigLeftDash /> {accountWrapper.backButton}</Link>
            </div>
            <div className="account-section-inner h-screen flex justify-center items-center py-20 px-3.5">
                <div className={styles.accountWrapper}>
                    <div className="account-header gradient--bg py-10 px-8 text-center border-b border-slate-800">
                        <Link href="/" className="site-logo relative overflow-hidden">
                            <Image src={accountWrapper.image} 
                                className="object-cover mx-auto" 
                                width={50} 
                                alt="logo"
                                priority={true} 
                                quality={50}  
                                decoding="async" 
                            />
                        </Link>
                        <h2 className="text-2xl font-bold mt-5">{accountWrapper.title}</h2>
                        <p className="text-sm mt-3">{accountWrapper.description}</p>
                    </div>
                    <div className="account-footer section--bg p-8">
                        <form className="account-form" onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">Full Name<span>*</span></label>
                                <input type="text" placeholder="Type fullname here..." className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">Email<span>*</span></label>
                                <input type="email" placeholder="Type email here..." className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <div className="form-group mb-4">
                                <label className="text-[13px] font-medium block mb-1">Password<span>*</span></label>
                                <input type="password" placeholder="Type password here..." className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <button type="submit" className="baseBtn w-full justify-center text-sm">{accountWrapper.accountButton} <ArrowRightToLine /></button>
                            <div className="text-center mt-5">
                                <p className="text-sm">{accountWrapper.accountSwitchTitle} <Link href="/login" className="font-bold text--base">{accountWrapper.accountSwitchLink}</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		</section>
    );
}