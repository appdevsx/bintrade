'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getStepAPI } from "@/services/apiClient/apiClient";
import styles from "./step.module.css";
import { CircleArrowRight } from 'lucide-react';
import Image from "next/image";
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function Step() {
    const [step, setStep] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        setLoading(true);
        const fetchStep = async () => {
            try {
                const response = await getStepAPI(language);
                setStep(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchStep();
    }, [language]);

    return (
        <section className="step-section py-20">
            <div className="custom-container">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-6 mb-10">
                            <div className="space-y-4 col-span-4 col-start-2">
                                <div className="w-20 h-8 mx-auto bg-gray-700 rounded"></div>
                                <div className="w-full h-8 bg-gray-700 rounded"></div>
                                <div className="w-full h-8 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {[...Array(4)].map((_, index) => (
                                <div className="w-full h-[250px] bg-gray-700 rounded" key={index}></div>
                            ))}
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                            <div className="section-header text-center col-span-4 col-start-2">
                                <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{step.sub_heading}</span>
                                <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{step.heading}</h2>
                                <p className="mt-3.5 text-base">{step.desc}</p>
                            </div>
                        </div>
                        <div className="step-item-wrapper grid grid-cols-12 gap-5">
                            {step?.items?.map(( stepItem, index ) => {
                                const imageUrl = stepItem?.image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${stepItem.image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                const colSpanClass = index % 4 === 0 || index % 4 === 3 ? "lg:col-span-5" : "lg:col-span-7";
                                const showImage = colSpanClass === "lg:col-span-7";
                                const contentClass = showImage ? "w-full md:w-7/12" : "";
                                return (
                                    <div className={`col-span-12 ${colSpanClass} step-item-inner`} key={index}>
                                        <div className={styles.stepItem}>
                                            <div className={`step-content ${contentClass}`}>
                                                <span className="sub-title text-white flex items-center mb-3"><span className={`number w-7 h-7 border-2 border--base rounded-full flex justify-center items-center text-center text-lg text--base ${language === 'ar' ? 'ml-2' : 'mr-2'} font-bold`}>{index + 1}</span> {stepItem.title} <CircleArrowRight className={`${language === 'ar' ? 'mr-1 transform rotate-[180deg]' : 'ml-1'} w-4`} /></span>
                                                <h3 className="title text-xl font-bold mb-3">{stepItem.heading}</h3>
                                                <p>{stepItem.desc}</p>
                                            </div>
                                            {showImage && imageUrl && (
                                                <div className={`step-thumb relative md:absolute bottom-0 ${language === 'ar' ? 'left-0' : 'right-0'}`}>
                                                    <Image
                                                        src={imageUrl}
                                                        className="object-cover"
                                                        width={250}
                                                        height={388}
                                                        alt="step"
                                                        priority={true}
                                                        quality={50}
                                                        decoding="async"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}