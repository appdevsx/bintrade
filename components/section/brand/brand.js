'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getBrandAPI } from "@/services/apiClient/apiClient";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Autoplay } from 'swiper/modules';
import Image from "next/image";
import { useLanguage } from "@/context/languageProvider/languageProvider";

export default function Brand() {
    const [brand, setBrand] = useState([]);
    const [imagePaths, setImagePaths] = useState({});
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        setLoading(true);
        const fetchBrand = async () => {
            try {
                const response = await getBrandAPI(language);
                setBrand(response.data?.data?.section);
                setImagePaths(response.data?.data?.image_paths);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchBrand();
    }, [language]);

    return (
        <section className="brand-section gradient--bg py-20">
            <div className="custom-container">
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        <div className="w-[500px] h-8 bg-gray-700 rounded"></div>
                        <div className="grid grid-cols-6 gap-4">
                            {[...Array(6)].map((_, index) => (
                                <div className="w-[100px] h-[40px] bg-gray-700 rounded" key={index}></div>
                            ))}
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="brand-header">
                            <h3 className="title text-lg md:text-xl mb-4 font-semibold">{brand.heading}</h3>
                        </div>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={20}
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
                            loopAdditionalSlides={6}
                            modules={[FreeMode, Autoplay]}
                            breakpoints={{
                                320: { slidesPerView: 2, spaceBetween: 10 },
                                480: { slidesPerView: 3, spaceBetween: 15 },
                                768: { slidesPerView: 4, spaceBetween: 20 },
                                1024: { slidesPerView: 5, spaceBetween: 20 },
                                1280: { slidesPerView: 6, spaceBetween: 20 },
                            }}
                            className="mySwiper brand-slider swiper-container swiper-container-free-mode"
                        >
                            {brand?.items?.map(( brandItem, index ) => {
                                const imageUrl = brandItem?.image 
                                    ? `${imagePaths?.base_url}/${imagePaths?.path_location}/${brandItem.image}`
                                    : `${imagePaths?.base_url}/${imagePaths?.default_image}`;
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="brand-item">
                                            {imageUrl && (
                                                <Image src={imageUrl} 
                                                    className="object-cover"
                                                    width={100}
                                                    height={40}
                                                    alt="brand"
                                                    priority={true}
                                                    quality={50}  
                                                    decoding="async" 
                                                />
                                            )}
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