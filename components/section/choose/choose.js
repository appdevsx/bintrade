'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getChooseAPI } from "@/services/apiClient/apiClient";
import styles from "./choose.module.css";
import Image from "next/image";

import choose from '@/public/images/choose/choose.webp';
import chooseElementOne from '@/public/images/choose/choose-element-1.webp';
import chooseElementTwo from '@/public/images/choose/choose-element-2.webp';

const sectionHeader = {
    sectionSubTitle: 'Why choose BinTrade',
    sectionTitleLeft: 'Finances Through Secure',
    sectionTitleMain: 'Trading',
    sectionTitleRight: 'Practices',
}

const chooseItems = [
    {
        image: chooseElementOne,
        title: '190+ Forex pairs, including majors, minors, exotics, crypto and spot metals',
    },
    {
        image: chooseElementTwo,
        title: '50+ technical indicators, integrated trade signals and innovative risk mitigation tools',
    }
]

const chooseWrapper = {
    image: choose,
}

export default function Choose() {
    const [choose, setChoose] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchChoose = async () => {
            try {
                const response = await getChooseAPI();
                setChoose(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchChoose();
    }, []);

    const imageUrl = choose?.image 
	  ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${choose.image}`
	  : `${imagePaths?.base_url}/${imagePaths?.default_image}`;

    return (
        <section className="choose-section section--bg py-20">
            <div className="custom-container">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="grid grid-cols-1 grid-cols-2 gap-5">
                            <div className="col-span-2 space-y-4">
                                <div className="grid grid-cols-6">
                                    <div className="col-span-4 space-y-4">
                                        <div className="w-20 h-8 bg-gray-700 rounded"></div>
                                        <div className="w-full h-8 bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    {[...Array(2)].map((_, index) => (
                                        <div className="w-full h-[250px] bg-gray-700 rounded" key={index}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-4 col-start-3">
                                <div className="w-[330px] h-[491px] bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="choose-item-wrapper grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="col-span-12 lg:col-span-2">
                                <div className="choose-wrapper">
                                    <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                                        <div className="section-header col-span-4">
                                            <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{choose.heading}</span>
                                            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{choose.sub_heading} </h2>
                                        </div>
                                    </div>
                                    <div className="choose-item-wrapper grid grid-cols-1 lg:grid-cols-2 gap-5">
                                        {choose?.items?.map(( chooseItem, index ) => {
                                            const itemImageUrl = chooseItem?.image 
                                                ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${chooseItem.image}`
                                                : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                            return (
                                                <div className={styles.chooseItem} key={index}>
                                                    <div className="choose-thumb">
                                                        {itemImageUrl && (
                                                            <Image src={itemImageUrl}
                                                                className="object-cover mx-auto"
                                                                width={300}
                                                                height={170}
                                                                alt="choose"
                                                                priority={true}
                                                                quality={50}  
                                                                decoding="async" 
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="choose-content mt-6">
                                                        <h3 className="choose-title text-lg md:text-xl font-semibold">{chooseItem.title}</h3>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-4 lg:col-start-3">
                                <div className="choose-thumb">
                                    {imageUrl && (
                                        <Image src={imageUrl} 
                                            className="object-cover"
                                            width={330}
                                            height={491}
                                            alt="choose"
                                            priority={true}
                                            quality={50}  
                                            decoding="async" 
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}