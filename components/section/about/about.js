'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getAboutAPI } from "@/services/apiClient/apiClient";
import styles from "./about.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function About() {
	const [about, setAbout] = useState({});
	const [imagePaths, setImagePaths] = useState({});
	const [loading, setLoading] = useState(false);
	const { language } = useLanguage();

	useEffect(() => {
		setLoading(true);
		const fetchAbout = async () => {
			try {
				const response = await getAboutAPI(language);
				setAbout(response.data?.data?.section);
				setImagePaths(response.data?.data?.image_paths);
			} catch (error) {
				toast.error("Server did not respond");
			} finally {
				setLoading(false);
			}
		};

		fetchAbout();
	}, [language]);

	const imageUrl = about?.image 
	  ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${about.image}`
	  : `${imagePaths?.base_url}/${imagePaths?.default_image}`;

    return (
		<section className="about-section pt-20">
            <div className="custom-container">
				<div className={styles.aboutWrapper}>
					{loading ? (
						<div className="animate-pulse">
							<div className="grid grid-cols-1 grid-cols-2 gap-5 items-center">
								<div className="space-y-4 mr-8">
									<div className="w-20 h-8 bg-gray-700 rounded"></div>
									<div className="w-full h-8 bg-gray-700 rounded"></div>
									<div className="w-full h-16 bg-gray-700 rounded"></div>
								</div>
								<div className="w-[400px] h-[445px] ml-auto bg-gray-700 rounded"></div>
							</div>
						</div>
						) : (
						<>
							<div className="about-inner-wrapper grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
								<div className="about-content-wrapper mr-0 md:mr-8">
									<span className="sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{about.heading}</span>
									<h2 className="title text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{about.sub_heading}</h2>
									<p className="mb-2">{about.desc}</p>
								</div>
								<div className="about-thumb">
									{imageUrl && (
										<Image 
											src={imageUrl}
											className={`object-cover rounded-xl ${language === 'ar' ? 'md:mr-auto' : 'md:ml-auto'}`}
											alt="about"
											width={400}
											height={445}
											unoptimized
										/>
									)}
								</div>
							</div>
						</>
                	)}
				</div>
			</div>
		</section>
    );
}
