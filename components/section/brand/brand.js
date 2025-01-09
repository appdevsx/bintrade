'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Autoplay } from 'swiper/modules';
import Image from "next/image";

import brandOne from '@/public/images/brand/brand-1.svg';
import brandTwo from '@/public/images/brand/brand-2.svg';
import brandThree from '@/public/images/brand/brand-3.svg';
import brandFour from '@/public/images/brand/brand-4.svg';
import brandFive from '@/public/images/brand/brand-1.svg';
import brandSix from '@/public/images/brand/brand-2.svg';

const brandHeader = {
    titleLeft: 'Over 1500 companies trust',
    titleMain: 'Fintech',
    titleRight: 'for bussines.',
}

const brandItems = [
    {
        image: brandOne,
    },
    {
        image: brandTwo,
    },
    {
        image: brandThree,
    },
    {
        image: brandFour,
    },
    {
        image: brandFive,
    },
    {
        image: brandSix,
    },
    {
        image: brandOne,
    },
    {
        image: brandTwo,
    },
    {
        image: brandThree,
    },
    {
        image: brandFour,
    },
    {
        image: brandFive,
    },
    {
        image: brandSix,
    }
]

export default function Brand() {
    return (
        <section className="brand-section gradient--bg py-20">
            <div className="custom-container">
                <div className="brand-header">
                    <h3 className="title text-xl mb-4 font-semibold">{brandHeader.titleLeft} <span className="font-bold text--base">{brandHeader.titleMain}</span> {brandHeader.titleRight}</h3>
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
                    className="mySwiper brand-slider swiper-container swiper-container-free-mode"
                >
                    {brandItems.map(( brandItem, index ) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="brand-item">
                                    <Image src={brandItem.image} 
                                        className="object-cover"
                                        width={100} 
                                        alt="brand"
                                        priority={true}
                                        quality={50}  
                                        decoding="async" 
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    )
}