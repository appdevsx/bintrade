'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import styles from "./register.module.css";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { ArrowRightToLine, ArrowBigLeftDash, LoaderCircle } from 'lucide-react';
import { registerAPI } from "@/services/apiClient/apiClient";
import useAuthRedirect from "@/utility/useAuthRedirect/useAuthRedirect";

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
    useAuthRedirect();
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [lastName, setLastName] = useState('dfsdfsdfsdfd');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("firstname", fullName);
        formData.append("lastname", lastName);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await registerAPI(formData);

            if (response.status === 200 && response.data?.data?.token) {
                const token = response.data.data.token;
                const userInfo = response.data.data.user_info;
                const successMessage = response.data.message.success || 'Registration Successful';

                setFullName("");
                setEmail("");
                setPassword("");

                localStorage.setItem('jwtToken', token);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                const authorizationStatus = response.data.data?.authorization?.status;
                const authorizationToken = response.data.data?.authorization?.token;

                if (authorizationStatus === true && authorizationToken) {
                    router.push(`/authorization?token=${authorizationToken}`);
                } else {
                    router.push("/trading");
                }

                toast.success(successMessage);
            } else {
                toast.error('Unexpected response from the server.');
            }
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

    const handleSubmit = (event) => {
        event.preventDefault();
        toast.success('Registration Successful!', {duration: 4000, style: {background: '#081e32', color: '#ffffff'},});
    };

    return (
		<section className="account-section relative overflow-hidden">
            <Toaster reverseOrder={false} theme="dark" />
            <div className={styles.accountElement}></div>
            <div className="back-to-home-btn absolute top-5 left-5">
                <Link href="/" className="custom--btn--bg inline-flex items-center gap-2 text-white font-semibold rounded-md transition-all hover:bg-blue-700 px-6 py-2 text-sm custom--shadow"><ArrowBigLeftDash /> {accountWrapper.backButton}</Link>
            </div>
            <div className="account-section-inner min-h-screen flex justify-center items-center py-20 px-3.5">
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
                        <form className="account-form" onSubmit={submitRegister}>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">Full Name<span>*</span></label>
                                <input type="text" placeholder="Type fullname here..." value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">Email<span>*</span></label>
                                <input type="email" placeholder="Type email here..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <div className="form-group mb-4">
                                <label className="text-[13px] font-medium block mb-1">Password<span>*</span></label>
                                <input type="password" placeholder="Type password here..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <button type="submit" className={`baseBtn w-full justify-center text-sm mt-2 ${loading ? 'cursor-not-allowed' : ''}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white__color" />
                                ) : (
                                    <>
                                        {accountWrapper.accountButton} 
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </button>
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