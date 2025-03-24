'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getServiceAPI } from "@/services/apiClient/apiClient";
import styles from "./service.module.css";
import { AlignStartVertical } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { AlignHorizontalDistributeCenter } from 'lucide-react';
import Image from "next/image";

const sectionHeader = {
    sectionSubTitle: 'Service',
    sectionTitleLeft: 'The',
    sectionTitleMain: 'Services',
    sectionTitleRight: 'we publish is specifically designed to meet your needs.',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

const serviceItems = [
    {
        title: 'Demo Account',
        icon: <AlignStartVertical />,
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times. You can use mobile to pay with simple steps.',
    },
    {
        title: 'Fixed time traders',
        icon: <CalendarClock />,
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times. You can use mobile to pay with simple steps.',
    },
    {
        title: 'Stock trading',
        icon: <AlignHorizontalDistributeCenter />,
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times. You can use mobile to pay with simple steps.',
    }
]

export default function Service() {
    const [service, setService] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchService = async () => {
            try {
                const response = await getServiceAPI();
                setService(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, []);

    return (
		<section className="service-section py-20">
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
                        <div className="grid grid-cols-3 gap-5">
                            {[...Array(3)].map((_, index) => (
                                <div className="w-full h-[230px] bg-gray-700 rounded" key={index}></div>
                            ))}
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                            <div className="section-header text-center col-span-4 col-start-2">
                                <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{service.heading}</span>
                                <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{service.sub_heading}</h2>
                                <p className="mt-3.5 text-base">{service.desc}</p>
                            </div>
                        </div>
                        <div className="service-item-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {service?.items?.map(( serviceItem, index ) => {
                                const imageUrl = serviceItem?.icon_image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${serviceItem.icon_image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                return (
                                    <div className={styles.serviceItem} key={index}>
                                        <div className={styles.serviceInnerItem}>
                                            <div className="service-content">
                                                <div className="service-content-header flex justify-between items-center mb-4">
                                                    <h3 className="title text-lg font-bold">{serviceItem.title}</h3>
                                                    <div className={styles.serviceIcon}>
                                                        {imageUrl && (
                                                            <Image src={imageUrl} 
                                                                className="object-cover"
                                                                alt="service"
                                                                width={28}
                                                                height={28}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <p>{serviceItem.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
			</div>
		</section>
    );
}