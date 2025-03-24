"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getBannerAPI } from "@/services/apiClient/apiClient";
import Image from "next/image";
import Link from "next/link";
import { CircleArrowRight, LoaderCircle } from "lucide-react";
import styles from "./banner.module.css";
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function Banner() {
	const [banner, setBanner] = useState([]);
	const [imagePaths, setImagePaths] = useState({});
	const [loading, setLoading] = useState(false);
	// const [language, setLanguage] = useState([]);
	const { language } = useLanguage();

	// useEffect(() => {
	// 	const userLang = navigator.language.split("-")[0];
	// 	setLanguage(userLang);
	// }, []);

  	useEffect(() => {
		setLoading(true);
		const fetchBanner = async () => {
		try {
			const response = await getBannerAPI(language);
			setBanner(response.data?.data?.section);
			setImagePaths(response.data?.data?.image_paths);
		} catch (error) {
			toast.error("Server did not respond");
		} finally {
			setLoading(false);
		}
    };

		fetchBanner();
	}, [language]);

	const decodeText = (text) => {
		if (!text) return "";
		try {
			return decodeURIComponent(escape(text));
		} catch {
			return text;
		}
	};

	const isRTL = ["ar", "he", "fa", "ur"].includes(language);

	const imageUrl = banner?.image
		? `${imagePaths?.base_url}/${imagePaths?.path_location}/${banner.image}`
		: `${imagePaths?.base_url}/${imagePaths?.default_image}`;

	return (
		<section className={styles.bannerSection} dir={isRTL ? "rtl" : "ltr"}>
			{loading ? (
				<div className="h-full w-full absolute top-0 left-0 flex items-center justify-center bg-gray-700 animate-pulse">
					<LoaderCircle className="inline-block w-10 h-auto animate-spin text-[#cbd5e1] relative left-[200px]" />
				</div>
			) : (
				imageUrl && (
					<Image
						src={imageUrl}
						className={styles.bannerBg}
						alt="bannerBg"
						fill={true}
					/>
				)
			)}
			<div className="custom-container">
				{loading ? (
                    <div className="animate-pulse grid grid-cols-2">
						<div className="space-y-4">
							<div className="w-[300px] h-8 bg-gray-700 rounded"></div>
							<div className="w-full h-14 bg-gray-700 rounded"></div>
							<div className="w-full h-10 bg-gray-700 rounded"></div>
							<div className="w-[100px] h-12 bg-gray-700 rounded"></div>
						</div>
                    </div>
                    ) : (
                    <>
						<div className="banner-content-wrapper grid grid-cols-1 md:grid-cols-2">
							<div className="banner-content md:mr-10">
								<span className={styles.subTitle}>{decodeText(banner?.heading)}</span>
								<h1 className="title text-white text-[32px] sm:text-[36px] md:text-[40px] lg:text-[46px] xl:text-[55px] font-bold mb-4">
									{decodeText(banner?.sub_heading)}
								</h1>
								<p className={styles.description}>{decodeText(banner?.desc)}</p>
								<div className="banner-btn mt-8">
									<Link className="baseBtn" href={banner?.btn_url || "#"}>
										{decodeText(banner?.btn_text)} <CircleArrowRight />
									</Link>
								</div>
							</div>
						</div>
					</>
                )}
			</div>
		</section>
	);
}