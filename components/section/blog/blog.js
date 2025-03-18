'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import styles from "./blog.module.css";
import Link from "next/link";
import { CircleArrowRight } from 'lucide-react';
import Image from "next/image";
import { getBlogsAPI } from "@/services/apiClient/apiClient";

import blogOne from '@/public/images/blog/blog-1.webp';
import blogTwo from '@/public/images/blog/blog-2.webp';
import blogThree from '@/public/images/blog/blog-3.webp';

const sectionHeader = {
    sectionSubTitle: 'Posts',
    sectionTitleLeft: 'The',
    sectionTitleMain: 'Posts',
    sectionTitleRight: 'we publish is specifically designed to meet your needs.',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

const blogItems = [
    {
        image: blogOne,
        date: '15th July, 2024',
        title: '2023 review: Milestones we’re proud of 🌟',
        description: 'It’s been 9 years since we entered the market, and we’ve achieved so much with BinTrade. We’re focused on improving our platform to make a positive impact on traders and the world around. Here’s how 2023 went.',
		button: 'Read more',
    },
    {
        image: blogTwo,
        date: '15th July, 2024',
        title: '2023 review: Milestones we’re proud of 🌟',
        description: 'It’s been 9 years since we entered the market, and we’ve achieved so much with BinTrade. We’re focused on improving our platform to make a positive impact on traders and the world around. Here’s how 2023 went.',
		button: 'Read more',
    },
    {
        image: blogThree,
        date: '15th July, 2024',
        title: '2023 review: Milestones we’re proud of 🌟',
        description: 'It’s been 9 years since we entered the market, and we’ve achieved so much with BinTrade. We’re focused on improving our platform to make a positive impact on traders and the world around. Here’s how 2023 went.',
		button: 'Read more',
    }
]

export default function Blog() {
	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchBlogs = async () => {
			try {
				const response = await getBlogsAPI();
				setBlogs(response.data?.data?.journals?.data || []);
			} catch (error) {
				toast.error("Server did not respond");
			} finally {
				setLoading(false);
			}
		};

		fetchBlogs();
	}, []);

    return (
		<section className="blog-section py-20">
            <div className="custom-container">
				<div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
					<div className="section-header text-center col-span-4 col-start-2">
						<span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
						<h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
						<p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
					</div>
				</div>
				<div className="blog-item-wrapper mb-60-none">
					{blogs.map(( blogItem, index ) => {
						return (
							<div className={styles.blogItem} key={index}>
								<div className={styles.blogThumb}>
									<Image src={blogItem.image} 
										className="object-cover rounded-xl"
										alt="blog"
									/>
								</div>
								<div className={styles.blogContent}>
									<span className="date block mb-4">{blogItem.date}</span>
									<h3 className="title text-lg sm:text-xl font-bold mb-4">{blogItem.title}</h3>
									<p>{blogItem.description}</p>
									<div className="blog-btn mt-6">
										<Link className={styles.customBtn} href="/blogDetails">{blogItem.button} <CircleArrowRight /></Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
    );
}