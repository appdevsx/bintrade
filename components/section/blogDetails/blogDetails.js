'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { getBlogDetailsAPI, getLanguageAPI } from "@/services/apiClient/apiClient";
import { useLanguage } from "@/context/languageProvider/languageProvider";

const blogSocials = [
    {
        name: 'Twitter',
        href: 'https://x.com',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com',
    },
    {
        name: 'Linked In',
        href: 'https://linkedin.com',
    }
]

export default function BlogDetails({ slug }) {
    const [blogDetails, setBlogDetails] = useState(null);
    const { language } = useLanguage();
    const [imagePaths, setImagePaths] = useState(null);
    const [translation, setTranslation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [langLoading, setLangLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchBlogs = async () => {
            try {
                const response = await getBlogDetailsAPI(slug, language);
                setBlogDetails(response.data?.data?.journal || null);
                setImagePaths(response.data?.data?.image_paths || null);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [slug, language]);

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

    const imageUrl = blogDetails?.data?.image && imagePaths
      ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${blogDetails.data.image}`
      : imagePaths?.default_image
      ? `${imagePaths?.base_url}/${imagePaths?.default_image}`
      : null;

    return (
        <section className="blog-details-section py-20">
            <div className="custom-container">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <div className="w-20 h-8 mx-auto bg-gray-700 rounded"></div>
                                <div className="w-full h-8 mx-auto bg-gray-700 rounded"></div>
                            </div>
                            <div className="w-[800px] h-[400px] mx-auto bg-gray-700 rounded"></div>
                            <div className="w-full md:w-8/12 mx-auto space-y-4 mt-4">
                                <div className="w-full h-[100px] mx-auto bg-gray-700 rounded"></div>
                                <div className="flex items-center">
                                    <div className="w-20 h-8 bg-gray-700 rounded mr-4"></div>
                                    <div className="flex items-center justify-between gap-7">
                                        {[...Array(3)].map((_, index) => (
                                            <div className="w-[100px] h-8 bg-gray-700 rounded" key={index}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : blogDetails ? (
                    <div className="blog-item-wrapper">
                        <div className="blog-item">
                            <div className="blog-content">
                                <div className="text-center">
                                    <span className="date block mb-4">
                                        {blogDetails.category.name.language[language]?.name || blogDetails.category.get_name}
                                    </span>
                                    <h2 className="title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                                        {blogDetails?.short_title || blogDetails?.data?.language?.en?.title || 'No title'}
                                    </h2>
                                </div>
                                {imageUrl && (
                                    <div className="blog-thumb w-full md:w-9/12 mx-auto my-8">
                                        <Image 
                                            src={imageUrl} 
                                            className="object-cover rounded-xl w-full h-[500px]"
                                            width={664}
                                            height={400}
                                            alt="blog"
                                        />
                                    </div>
                                )}
                                <div className="w-full md:w-8/12 mx-auto">
                                    <div dangerouslySetInnerHTML={{ 
                                        __html: blogDetails?.long_desc || 
                                                blogDetails?.long_desc || 
                                                '<p>No content available</p>' 
                                    }} />
                                    <div className="blog-share flex items-center border-t-2 border-slate-800 pt-6 mt-6">
                                        <span className={`text-white text-lg font-bold ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>{t("Share")} : </span>
                                        <div className="blog-social-wrapper">
                                            <ul className="blog-social-list flex items-center justify-between gap-7">
                                                {blogSocials.map((blogSocial, index) => (
                                                    <li className="font-medium text-sm text-slate-300" key={index}>
                                                        <Link href={blogSocial.href}>{t(blogSocial.name)}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p>Blog post not found</p>
                    </div>
                )}
            </div>
        </section>
    );
}