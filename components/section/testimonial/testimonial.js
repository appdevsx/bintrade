'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getTestimonialAPI } from "@/services/apiClient/apiClient";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Autoplay } from 'swiper/modules';
import Image from "next/image";
import styles from "./testimonial.module.css";

import userOne from '@/public/images/user/user-1.webp';
import userTwo from '@/public/images/user/user-2.webp';
import userThree from '@/public/images/user/user-3.webp';
import userFour from '@/public/images/user/user-4.webp';
import userFive from '@/public/images/user/user-1.webp';
import userSix from '@/public/images/user/user-2.webp';

const sectionHeader = {
    sectionSubTitle: 'Testimonial',
    sectionTitleLeft: 'People’s',
    sectionTitleMain: 'Say',
    sectionTitleRight: 'About Our Pannel',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

const testimonialItems = [
    {
        description: "“ Investing in startups or early-stage companies can offer significant potential returns, but it also comes with higher risk due to the volatility of young businesses. “",
        userImage: userOne,
        userTitle: "Crystal Logan",
        userSubTitle: "22y, Naperville",
    },
    {
        description: "“ Investing in startups or early-stage companies can offer significant potential returns, but it also comes with higher risk due to the volatility of young businesses. “",
        userImage: userTwo,
        userTitle: "Crystal Logan",
        userSubTitle: "22y, Naperville",
    },
    {
        description: "“ Investing in startups or early-stage companies can offer significant potential returns, but it also comes with higher risk due to the volatility of young businesses. “",
        userImage: userThree,
        userTitle: "Crystal Logan",
        userSubTitle: "22y, Naperville",
    },
    {
        description: "“ Investing in startups or early-stage companies can offer significant potential returns, but it also comes with higher risk due to the volatility of young businesses. “",
        userImage: userFour,
        userTitle: "Crystal Logan",
        userSubTitle: "22y, Naperville",
    },
    {
        description: "“ Investing in startups or early-stage companies can offer significant potential returns, but it also comes with higher risk due to the volatility of young businesses. “",
        userImage: userFive,
        userTitle: "Crystal Logan",
        userSubTitle: "22y, Naperville",
    },
    {
        description: "“ Investing in startups or early-stage companies can offer significant potential returns, but it also comes with higher risk due to the volatility of young businesses. “",
        userImage: userSix,
        userTitle: "Crystal Logan",
        userSubTitle: "22y, Naperville",
    },
]

export default function Testimonial() {
    const [testimonial, setTestimonial] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchTestimonial = async () => {
            try {
                const response = await getTestimonialAPI();
                setTestimonial(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonial();
    }, []);

    return (
        <section className="testimonial-section py-20">
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
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-5">
                                {[...Array(4)].map((_, index) => (
                                    <div className="w-full h-[200px] bg-gray-700 rounded" key={index}></div>
                                ))}
                            </div>
                            <div className="grid grid-cols-4 gap-5">
                                {[...Array(4)].map((_, index) => (
                                    <div className="w-full h-[200px] bg-gray-700 rounded" key={index}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                            <div className="section-header text-center col-span-4 col-start-2">
                                <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{testimonial.heading}</span>
                                <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{testimonial.sub_heading}</h2>
                                <p className="mt-3.5 text-base">{testimonial.desc}</p>
                            </div>
                        </div>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={5}
                            autoplay={{
                                delay: 2500,
                                pauseOnMouseEnter:true,
                                disableOnInteraction: false,
                            }}
                            speed={8000}
                            loop={true}
                            freeMode={true}
                            loopAddBlankSlides={true}
                            cssMode={true}
                            loopAdditionalSlides={4}
                            modules={[FreeMode, Autoplay]}
                            breakpoints={{
                                320: { slidesPerView: 1.2, spaceBetween: 10 },
                                480: { slidesPerView: 1.5, spaceBetween: 15 },
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 20 },
                                1024: { slidesPerView: 4, spaceBetween: 25 },
                            }}
                            className="mySwiper testimonial-slider swiper-container swiper-container-free-mode"
                        >
                            {testimonial?.items?.map(( testimonialItem, index ) => {
                                const imageUrl = testimonialItem?.image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${testimonialItem.image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                return (
                                    <SwiperSlide key={index}>
                                        <div className={styles.testimonialItem}>
                                            <div className="testimonial-content">
                                                <p className="text-sm">{testimonialItem.comment}</p>
                                            </div>
                                            <div className="testimonial-user-wrapper flex items-center mt-4">
                                                <div className="testimonial-user-thumb w-[40px] h-[40px] rounded-full overflow-hidden">
                                                    {imageUrl && (
                                                        <Image src={imageUrl} 
                                                            className="object-cover rounded-full"
                                                            width={100}
                                                            height={100}
                                                            alt="user"
                                                            priority={true}
                                                            quality={50}  
                                                            decoding="async"
                                                        />
                                                    )}
                                                </div>
                                                <div className="testimonial-user-content w-[calc(100%-40px)] pl-2">
                                                    <h6 className="title">{testimonialItem.name}</h6>
                                                    <span className="sub-title text-sm">{testimonialItem.designation}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={5}
                            autoplay={{
                                delay: 2500,
                                pauseOnMouseEnter:true,
                                disableOnInteraction: false,
                            }}
                            speed={8000}
                            loop={true}
                            freeMode={true}
                            loopAddBlankSlides={true}
                            cssMode={true}
                            loopAdditionalSlides={4}
                            modules={[FreeMode, Autoplay]}
                            dir="rtl"
                            breakpoints={{
                                320: { slidesPerView: 1.2, spaceBetween: 10 },
                                480: { slidesPerView: 1.5, spaceBetween: 15 },
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 20 },
                                1024: { slidesPerView: 4, spaceBetween: 25 },
                            }}
                            className="mySwiper testimonial-slider swiper-container swiper-container-free-mode text-left mt-2"
                        >
                            {testimonial?.items?.map(( testimonialItem, index ) => {
                                const imageUrl = testimonialItem?.image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${testimonialItem.image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                return (
                                    <SwiperSlide key={index}>
                                        <div className={styles.testimonialItem}>
                                            <div className="testimonial-content">
                                                <p className="text-sm">{testimonialItem.comment}</p>
                                            </div>
                                            <div className="testimonial-user-wrapper flex items-center mt-4" dir="ltr">
                                                <div className="testimonial-user-thumb w-[40px] h-[40px] rounded-full overflow-hidden">
                                                    {imageUrl && (
                                                        <Image src={imageUrl} 
                                                            className="object-cover rounded-full"
                                                            width={100}
                                                            height={100}
                                                            alt="user"
                                                            priority={true}
                                                            quality={50}  
                                                            decoding="async"
                                                        />
                                                    )}
                                                </div>
                                                <div className="testimonial-user-content w-[calc(100%-40px)] pl-2">
                                                    <h6 className="title">{testimonialItem.name}</h6>
                                                    <span className="sub-title text-sm">{testimonialItem.designation}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </>
                )}
            </div>
        </section>
    )
}