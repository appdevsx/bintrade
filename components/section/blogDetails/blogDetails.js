'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { getBlogDetailsAPI } from "@/services/apiClient/apiClient";
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
    const [blogDetails, setBlogDetails] = useState([]);
    const { language } = useLanguage();
    const [imagePaths, setImagePaths] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchBlogs = async () => {
			try {
				const response = await getBlogDetailsAPI(slug, language);
                console.log(response);
				setBlogDetails(response.data?.data?.journal);
                setImagePaths(response.data?.data?.image_paths);
			} catch (error) {
				toast.error("Server did not respond");
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, [slug, language]);

    const imageUrl = blogDetails?.data?.image 
	  ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${blogDetails.data.image}`
	  : `${imagePaths?.base_url}/${imagePaths?.default_image}`;

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
                                    <div className="flex items-center justify-between space-x-7">
                                        {[...Array(3)].map((_, index) => (
                                            <div className="w-[100px] h-8 bg-gray-700 rounded" key={index}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="blog-item-wrapper">
                            <div className="blog-item">
                                <div className="blog-content">
                                    <div className="text-center">
                                        <span className="date block mb-4">{blogDetails?.category?.name?.language?.en?.name}</span>
                                        <h2 className="title text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{blogDetails?.short_title}</h2>
                                    </div>
                                    <div className="blog-thumb w-full md:w-9/12 mx-auto my-8">
                                        {imageUrl && (
                                            <Image src={imageUrl} 
                                                className="object-cover rounded-xl w-full h-[500px]"
                                                width={664}
                                                height={400}
                                                alt="blog"
                                            />
                                        )}
                                    </div>
                                    <div className="w-full md:w-8/12 mx-auto">
                                        <p dangerouslySetInnerHTML={{ __html: blogDetails?.short_desc}} />
                                        <div className="blog-share flex items-center border-t-2 border-slate-800 pt-6 mt-6">
                                            <span className="text-white text-lg font-bold mr-4">Share : </span>
                                            <div className="blog-social-wrapper">
                                                <ul className="blog-social-list flex items-center justify-between space-x-7">
                                                    {blogSocials.map(( blogSocial, index ) => {
                                                        return (
                                                            <li className="font-medium text-sm text-slate-300" key={index}>
                                                                <Link href={blogSocial.href}>{blogSocial.name}</Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
			</div>
		</section>
    );
}