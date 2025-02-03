'use client'
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
    return (
        <section className="testimonial-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header text-center col-span-4 col-start-2">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
                        <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
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
                    {testimonialItems.map(( testimonialItem, index ) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.testimonialItem}>
                                    <div className="testimonial-content">
                                        <p className="text-sm">{testimonialItem.description}</p>
                                    </div>
                                    <div className="testimonial-user-wrapper flex items-center mt-4">
                                        <div className="testimonial-user-thumb w-[40px] h-[40px] rounded-full overflow-hidden">
                                            <Image src={testimonialItem.userImage} 
                                                className="object-cover rounded-full"
                                                width={100}
                                                height={100}
                                                alt="user"
                                                priority={true}
                                                quality={50}  
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="testimonial-user-content w-[calc(100%-40px)] pl-2">
                                            <h6 className="title">{testimonialItem.userTitle}</h6>
                                            <span className="sub-title text-sm">{testimonialItem.userSubTitle}</span>
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
                    {testimonialItems.map(( testimonialItem, index ) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.testimonialItem}>
                                    <div className="testimonial-content">
                                        <p className="text-sm">{testimonialItem.description}</p>
                                    </div>
                                    <div className="testimonial-user-wrapper flex items-center mt-4" dir="ltr">
                                        <div className="testimonial-user-thumb w-[40px] h-[40px] rounded-full overflow-hidden">
                                            <Image src={testimonialItem.userImage} 
                                                className="object-cover rounded-full"
                                                width={100}
                                                height={100}
                                                alt="user"
                                                priority={true}
                                                quality={50}  
                                                decoding="async"
                                            />
                                        </div>
                                        <div className="testimonial-user-content w-[calc(100%-40px)] pl-2">
                                            <h6 className="title">{testimonialItem.userTitle}</h6>
                                            <span className="sub-title text-sm">{testimonialItem.userSubTitle}</span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    )
}