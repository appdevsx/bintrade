'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import styles from "./login.module.css";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { ArrowRightToLine, ArrowBigLeftDash, LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { loginAPI, basicSettingsAPI, getLanguageAPI } from "@/services/apiClient/apiClient";
import useAuthRedirect from "@/utility/useAuthRedirect/useAuthRedirect";
import { useLanguage } from "@/context/languageProvider/languageProvider";

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
    const [siteLogo, setSiteLogo] = useState(null);
    const [siteName, setSiteName] = useState(null);
    const [translation, setTranslation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [logoLoading, setLogoLoading] = useState(false);
    const [langLoading, setLangLoading] = useState(true);
    const [credentials, setCredentials] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { language } = useLanguage();

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
                
                // Check if two-factor is disabled (status 0)
                const twoFactorStatus = response?.data?.data?.user_info?.two_factor_status;
                
                if (authorizationStatus === true && authorizationToken) {
                    router.push(`/authorization?token=${authorizationToken}`);
                } 
                // Redirect to two-factor page if two-factor is disabled
                else if (twoFactorStatus === 0) {
                    router.push("/two-factor");
                }
                else {
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

    useEffect(() => {
        setLogoLoading(true);
        const fetchLanguages = async () => {
            try {
                const response = await basicSettingsAPI();
                setSiteName(response.data?.data?.basic_settings?.site_name);
                setSiteLogo(response.data?.data?.basic_settings?.fav);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLogoLoading(false);
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

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
		<section className="account-section relative overflow-hidden">
            <Toaster reverseOrder={false} theme="dark" />
            <div className={styles.accountElement}></div>
            <div className={`back-to-home-btn absolute top-5 ${language === 'ar' ? 'right-5' : 'left-5'}`}>
                <Link href="/" className="custom--btn--bg inline-flex items-center gap-2 text-white font-semibold rounded-md transition-all hover:bg-blue-700 px-6 py-2 text-sm custom--shadow"><ArrowBigLeftDash className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} /> {t(accountWrapper.backButton)}</Link>
            </div>
            <div className="account-section-inner min-h-screen flex justify-center items-center py-20 px-3.5">
                <div className={styles.accountWrapper}>
                    <div className="account-header gradient--bg py-10 px-8 text-center border-b border-slate-800">
                        <Link href="/" className="site-logo relative overflow-hidden">
                            {siteLogo ? (
                                <Image src={siteLogo} 
                                    className="object-cover mx-auto" 
                                    width={50}
                                    height={50}
                                    alt="logo"
                                    priority={true} 
                                    quality={50}  
                                    decoding="async" 
                                />
                            ) : (
                                <div className="h-10 w-[100px] mx-auto bg-gray-800 animate-pulse rounded-md"></div>
                            )}
                        </Link>
                        <h2 className="text-3xl font-bold mt-5">
                            {siteName}
                        </h2>
                        <p className="text-sm mt-3">{t(accountWrapper.description)}</p>
                    </div>
                    <div className="account-footer section--bg p-8">
                        <form className="account-form" onSubmit={submitLogin}>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">{t("Email")}<span>*</span></label>
                                <input type="email" value={credentials} placeholder="Type email here..." onChange={(event) => setCredentials(event.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <div className="form-group relative mb-2">
                                <label className="text-[13px] font-medium block mb-1">{t("Password")}<span>*</span></label>
                                <input id="password" type={showPassword ? "text" : "password" } value={password} placeholder="Type password here..." onChange={(e) => setPassword(e.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required autoComplete="current-password"></input>
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className={`absolute top-[42px] ${language === 'ar' ? 'left-3' : 'right-3'} transition-all text-slate-300`}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-auto" />
                                    ) : (
                                        <Eye className="w-5 h-auto" />
                                    )}
                                </button>
                            </div>
                            <div className="form-group flex items-center justify-between my-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text--base transition-all"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-sm`}>{t("Remember Me")}</span>
                                </label>
                                <Link href="/password/forgot" className="text-sm hover:text-white">
                                    {t("Forgot Password")}?
                                </Link>
                            </div>
                            <button type="submit" className={`baseBtn w-full justify-center text-sm mt-2 ${loading ? 'cursor-not-allowed' : ''}`} disabled={loading}>
                                {loading ? (
                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                ) : (
                                    <>
                                        {t(accountWrapper.accountButton)}
                                        <ArrowRightToLine className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} />
                                    </>
                                )}
                            </button>
                            <div className="text-center mt-5">
                                <p className="text-sm">{t(accountWrapper.accountSwitchTitle)} <Link href="/register" className="font-bold text--base">{t(accountWrapper.accountSwitchLink)}</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		</section>
    );
}