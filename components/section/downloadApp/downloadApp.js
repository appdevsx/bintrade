'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getDownloadAppAPI } from "@/services/apiClient/apiClient";
import styles from "./downloadApp.module.css";
import Image from "next/image";
import Link from "next/link";
import { CircleArrowRight } from 'lucide-react';
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function DownloadApp() {
    const [downloadApp, setDownloadApp] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        setLoading(true);
        const fetchDownloadApp = async () => {
            try {
                const response = await getDownloadAppAPI(language);
                setDownloadApp(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchDownloadApp();
    }, [language]);

    return (
        <section className="app-section py-20">
            <div className="custom-container">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 md:grid-cols-6 mb-10">
                            <div className="space-y-4 col-span-4">
                                <div className="w-20 h-8 bg-gray-700 rounded"></div>
                                <div className="w-full h-8 bg-gray-700 rounded"></div>
                                <div className="w-full h-8 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            {[...Array(2)].map((_, index) => (
                                <div className="w-full h-[250px] bg-gray-700 rounded" key={index}></div>
                            ))}
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                            <div className="section-header col-span-3">
                                <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{downloadApp.heading}</span>
                                <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{downloadApp.sub_heading}</h2>
                                <p className="mt-3.5 text-base">{downloadApp.desc}</p>
                            </div>
                        </div>
                        <div className="app-item-wrapper grid grid-cols-1 md:grid-cols-2 gap-5">
                            {downloadApp?.items?.map(( appItem, index ) => {
                                const imageUrl = appItem?.image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${appItem.image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                
                                const iconImageUrl = appItem?.icon_image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${appItem.icon_image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                return (
                                    <div className={styles.appItem} key={index}>
                                        <div className="app-content w-full lg:w-4/6">
                                            <div className="app-icon mb-4">
                                                {imageUrl && (
                                                    <Image src={iconImageUrl} 
                                                        className="object-cover"
                                                        alt="app"
                                                        width={28}
                                                        height={28}
                                                    />
                                                )}
                                            </div>
                                            <h3 className="title text-xl font-bold mb-2">{appItem.title}</h3>
                                            <p>{appItem.desc}</p>
                                            <div className="app-btn mt-3">
                                                <Link className="customBtn" href="/login">Download App <CircleArrowRight className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} /></Link>
                                            </div>
                                        </div>
                                        <div className={`app-thumb relative lg:absolute bottom-[-30px] lg:bottom-0 ${language === 'ar' ? 'lg:left-10' : 'lg:right-10'}`}>
                                            {imageUrl && (
                                                <Image src={imageUrl} 
                                                    className="object-cover"
                                                    width={140}
                                                    height={308}
                                                    alt="app"
                                                    priority={true}
                                                    quality={50}  
                                                    decoding="async" 
                                                />
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