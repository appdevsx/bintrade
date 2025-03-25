'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getFaqAPI } from "@/services/apiClient/apiClient";
import Link from "next/link";
import { CircleArrowDown, CircleArrowRight } from 'lucide-react';
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);
    const [faq, setFaq] = useState([]);
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        setLoading(true);
        const fetchFaq = async () => {
            try {
                const response = await getFaqAPI(language);
                setFaq(response.data?.data?.section);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchFaq();
    }, [language]);

    const toggleFaqItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
		<section className="faq-section py-20">
            <div className="custom-container">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-4">
                                <div className="w-20 h-8 bg-gray-700 rounded"></div>
                                <div className="w-full h-8 bg-gray-700 rounded"></div>
                                <div className="w-full h-14 bg-gray-700 rounded"></div>
                                <div className="w-[100px] h-12 bg-gray-700 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                {[...Array(4)].map((_, index) => (
                                    <div className="w-full h-[100px] bg-gray-700 rounded" key={index}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="section-header-wrapper">
                                <div className="section-header">
                                    <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{faq.heading}</span>
                                    <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{faq.sub_heading}</h2>
                                    <p className="mt-3.5 text-base">{faq.desc}</p>
                                    <div className="faq-btn mt-8">
                                        <Link className="baseBtn" href={faq.btn_url || "#"}>{faq.btn_text} <CircleArrowRight className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} /></Link>
                                    </div>
                                </div>
                            </div>
                            <ul className="space-y-2">
                                {faq?.items?.map((faqItem, index) => {
                                    const isOpen = openIndex === index;
                                    return (
                                        <li
                                            className="section--bg border border-slate-800 py-4 lg:py-7 px-5 lg:px-10 rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out"
                                            key={index}
                                        >
                                            <div className="flex items-center justify-between" onClick={() => toggleFaqItem(index)}>
                                                <h4 className="text-md sm:text-lg font-semibold w-[90%]">
                                                    {faqItem.question}
                                                </h4>
                                                <div
                                                    className={`relative right-[-10px] lg:right-[-10px] transform ${
                                                        isOpen ? "rotate-180" : ""
                                                    }`}
                                                >
                                                    <CircleArrowDown className="w-5 sm:w-7" />
                                                </div>
                                            </div>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                    isOpen
                                                        ? "max-h-[500px] opacity-100 pt-3"
                                                        : "max-h-0 opacity-0"
                                                }`}
                                            >
                                                <p className="w-full">
                                                    {faqItem.answer}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </>
                )}
			</div>
		</section>
    );
}