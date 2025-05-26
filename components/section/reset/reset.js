'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import styles from "./reset.module.css";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { ArrowRightToLine, ArrowBigLeftDash, LoaderCircle } from 'lucide-react';
import { resetPasswordAPI, getLanguageAPI } from "@/services/apiClient/apiClient";
import { useLanguage } from "@/context/languageProvider/languageProvider";

import logo from '@/public/images/logo/favicon.png';

const accountWrapper = {
    backButton: 'Go to home',
	image: logo,
    titleLeft: 'Bin',
    titleMain: 'Trade',
    description: 'Please Enter your new password and get login',
    accountButton: 'Confirm',
    accountSwitchTitle: "Don't have an account?",
    accountSwitchLink: 'Sign up',
}

export default function Reset() {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [translation, setTranslation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [langLoading, setLangLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const { language } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await resetPasswordAPI(token, password, passwordConfirmation);
            response.data.message.success.forEach((msg) => {
                toast.success(msg);
            });
            router.push("/login");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message && error.response.data.message.error) {
                error.response.data.message.error.forEach((msg) => {
                    toast.error(msg);
                });
            } else {
                toast.error("Failed to reset password.");
            }
        } finally {
            setLoading(false);
        }
    };

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
                            <Image src={accountWrapper.image} 
                                className="object-cover mx-auto" 
                                width={50} 
                                alt="logo"
                                priority={true} 
                                quality={50}  
                                decoding="async" 
                            />
                        </Link>
                        <h2 className="text-3xl font-bold mt-5">{t(accountWrapper.titleLeft)}<span className="text--base">{t(accountWrapper.titleMain)}</span></h2>
                        <p className="text-sm mt-3">{t(accountWrapper.description)}</p>
                    </div>
                    <div className="account-footer section--bg p-8">
                        <form className="account-form" onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">{t("New Password")}<span>*</span></label>
                                <input type="password" value={password} placeholder="Type password here..." onChange={(e) => setPassword(e.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-[13px] font-medium block mb-1">{t("Confirm Password")}<span>*</span></label>
                                <input type="password" value={passwordConfirmation} placeholder="Type password here..." onChange={(e) => setPasswordConfirmation(e.target.value)} className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
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