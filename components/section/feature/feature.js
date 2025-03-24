'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getFeatureAPI } from "@/services/apiClient/apiClient";
import styles from "./feature.module.css";
import Image from "next/image";
import { WalletCards } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { MessageSquareDot } from 'lucide-react';

const featureItems = [
    {
        icon: <WalletCards />,
        title: 'Demo Account',
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times.',
    },
    {
        icon: <LockKeyhole />,
        title: 'Ready-to-go Strategies',
        description: 'You can use mobile device to pay with simple steps in value. Compellingly pay with simple steps in value',
    },
    {
        icon: <MessageSquareDot />,
        title: 'Online Payment',
        description: 'You can use mobile device to pay with simple steps in value. Compellingly pay with simple steps in value',
    }
]

export default function Feature() {
    const [feature, setFeature] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchFeature = async () => {
			try {
				const response = await getFeatureAPI();
				setFeature(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
			} catch (error) {
				toast.error("Server did not respond");
			} finally {
				setLoading(false);
			}
		};

		fetchFeature();
	}, []);

    return (
        <section className="feature-section py-20">
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
                                <div className="w-full h-[180px] bg-gray-700 rounded" key={index}></div>
                            ))}
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                            <div className="section-header text-center col-span-4 col-start-2">
                                <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{feature.sub_heading}</span>
                                <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{feature.heading} </h2>
                                <p className="mt-3.5 text-base">{feature.desc}</p>
                            </div>
                        </div>
                        <div className="feature-item-wrapper grid grid-cols-3 gap-5">
                            {feature?.items?.map(( featureItem, index ) => {
                                const imageUrl = featureItem?.image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${featureItem.image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                return (
                                    <div className={styles.featureItem} key={index}>
                                        <div className="feature-icon w-12 h-12 flex justify-center items-center bg--base text-white rounded-lg text-4xl mb-4">
                                            {imageUrl && (
                                                <Image src={imageUrl} 
                                                    className="object-cover"
                                                    alt="feature"
                                                    width={28}
                                                    height={28}
                                                />
                                            )}
                                        </div>
                                        <div className="feature-content">
                                            <h3 className="title text-lg font-bold mb-1">{featureItem.title}</h3>
                                            <p>{featureItem.desc}</p>
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