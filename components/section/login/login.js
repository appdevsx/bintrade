'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { ArrowRightToLine, ArrowBigLeftDash, LoaderCircle } from 'lucide-react';
import { loginAPI } from "@/services/apiClient/apiClient";
import useAuthRedirect from "@/utility/useAuthRedirect/useAuthRedirect";

import logo from '@/public/images/logo/favicon.png';

const accountWrapper = {
    backButton: 'Go to home',
	image: logo,
    titleLeft: 'Bin',
    titleMain: 'Trade',
    description: 'Welcome back! login with your credentials',
    accountButton: 'Sign in with bintrade',
    accountSwitchTitle: "Don't have an account?",
    accountSwitchLink: 'Sign up',
}

export default function Login() {
    useAuthRedirect();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const submitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginAPI(credentials, password);

            if (response.status === 200 && response.data?.data?.token) {
                const token = response?.data?.data?.token;
                const userInfo = response?.data?.data?.user_info;
                const successMessage = response?.data?.message?.success || "Login successful";

                setCredentials("");
                setPassword("");

                if (rememberMe) {
                    localStorage.setItem("jwtToken", token);
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                } else {
                    sessionStorage.setItem("jwtToken", token);
                    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                }

                const authorizationStatus = response?.data?.data?.authorization?.status;
                const authorizationToken = response?.data?.data?.authorization?.token;
                
                if (authorizationStatus === true && authorizationToken) {
                    router.push(`/authorization?token=${authorizationToken}`);
                } else {
                    router.push("/trading");
                }
                
                toast.success(successMessage);
            } else {
                toast.error("Unexpected response from the server.");
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
                        <h2 className="text-3xl font-bold mt-5">{accountWrapper.titleLeft}<span className="text--base">{accountWrapper.titleMain}</span></h2>
                        <p className="text-sm mt-3">{accountWrapper.description}</p>
                    </div>
                    <div className="account-footer section--bg p-8">
                        <form className="account-form" onSubmit={submitLogin}>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">Email<span>*</span></label>
                                <input id="email" type="email" value={credentials} placeholder="Type email here..." onChange={(event) => setCredentials(event.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required autoFocus></input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">Password<span>*</span></label>
                                <input id="password" type="password" value={password} placeholder="Type password here..." onChange={(e) => setPassword(e.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required autoComplete="current-password"></input>
                            </div>
                            <div className="form-group flex items-center justify-between my-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text--base transition-all"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="ml-2 text-sm">Remember Me</span>
                                </label>
                                <Link href="/password/forgot" className="text-sm hover:text-white">
                                    Forgot Password?
                                </Link>
                            </div>
                            <button type="submit" className={`baseBtn w-full justify-center text-sm mt-2 ${loading ? 'cursor-not-allowed' : ''}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                ) : (
                                    <>
                                        {accountWrapper.accountButton} 
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </button>
                            <div className="text-center mt-5">
                                <p className="text-sm">{accountWrapper.accountSwitchTitle} <Link href="/register" className="font-bold text--base">{accountWrapper.accountSwitchLink}</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		</section>
    );
}