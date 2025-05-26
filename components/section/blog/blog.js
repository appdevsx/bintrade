'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import styles from "./blog.module.css";
import Link from "next/link";
import { CircleArrowRight } from 'lucide-react';
import Image from "next/image";
import { getBlogsAPI, getAnnouncementAPI, getLanguageAPI } from "@/services/apiClient/apiClient";
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function Blog() {
	const [blogs, setBlogs] = useState([]);
	const [announcements, setAnnouncements] = useState([]);
	const [imagePaths, setImagePaths] = useState({});
	const [translation, setTranslation] = useState([]);
	const [loading, setLoading] = useState(false);
	const [langLoading, setLangLoading] = useState(true);
	const { language } = useLanguage();

	useEffect(() => {
		setLoading(true);
		const fetchBlogs = async () => {
			try {
				const response = await getBlogsAPI(language);
				setBlogs(response.data?.data?.journals?.data || []);
				setImagePaths(response.data?.data?.image_paths);
			} catch (error) {
				toast.error("Server did not respond");
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, [language]);

	useEffect(() => {
		setLoading(true);
		const fetchAnnouncements = async () => {
			try {
				const response = await getAnnouncementAPI(language);
				setAnnouncements(response.data?.data?.section || []);
			} catch (error) {
				toast.error("Server did not respond");
			} finally {
				setLoading(false);
			}
		};

		fetchAnnouncements();
	}, [language]);

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
		<section className="blog-section py-20">
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
                        <div className="grid grid-cols-1 gap-10">
                            {[...Array(3)].map((_, index) => (
                                <div className="flex" key={index}>
									<div className="w-[46%] h-[305px] bg-gray-700 rounded"></div>
									<div className="w-[calc(100%-70%)] mx-[80px] space-y-4">
										<div className="w-20 h-8 bg-gray-700 rounded"></div>
										<div className="w-full h-8 bg-gray-700 rounded"></div>
										<div className="w-full h-[120px] bg-gray-700 rounded"></div>
										<div className="w-16 h-10 bg-gray-700 rounded"></div>
									</div>
								</div>
                            ))}
                        </div>
                    </div>
                    ) : (
                    <>
						<div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
							<div className="section-header text-center col-span-4 col-start-2">
								<span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{announcements.heading}</span>
								<h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{announcements.sub_heading}</h2>
								<p className="mt-3.5 text-base">{announcements.desc}</p>
							</div>
						</div>
						<div className="blog-item-wrapper mb-60-none">
							{blogs.map(( blogItem, index ) => {
								const imageUrl = blogItem?.data?.image 
									? `${imagePaths?.base_url}/${imagePaths?.path_location}/${blogItem.data.image}`
									: `${imagePaths?.base_url}/${imagePaths?.default_image}`;
								return (
									<div className={styles.blogItem} key={index}>
										<div className={styles.blogThumb}>
											{imageUrl && (
												<Image src={imageUrl} 
													className="object-cover rounded-xl"
													alt="blog"
													width={507}
													height={305}
												/>
											)}
										</div>
										<div className={styles.blogContent}>
											<span className="date block mb-4">{blogItem.category.name.language[language]?.name || blogItem.category.get_name}</span>
											<h3 className="title text-lg sm:text-xl font-bold mb-4">{blogItem.short_title}</h3>
											<p>{blogItem.short_desc}</p>
											<div className="blog-btn mt-6">
												<Link className={styles.customBtn} href={`/blog/${blogItem.slug}`}>{t("Read more")} <CircleArrowRight className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} /></Link>
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