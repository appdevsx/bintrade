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
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function Testimonial() {
    const [testimonial, setTestimonial] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        setLoading(true);
        const fetchTestimonial = async () => {
            try {
                const response = await getTestimonialAPI(language);
                setTestimonial(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonial();
    }, [language]);

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
                                                <div className={`testimonial-user-content w-[calc(100%-40px)] ${language === 'ar' ? 'pr-2' : 'pl-2'}`}>
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
                            className={`mySwiper testimonial-slider swiper-container swiper-container-free-mode ${language === 'ar' ? 'text-right' : 'text-left'} mt-2`}
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
                                                <div className={`testimonial-user-content w-[calc(100%-40px)] ${language === 'ar' ? 'pr-2' : 'pl-2'}`}>
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