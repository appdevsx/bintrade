import Image from "next/image";
import Link from "next/link";
import { CircleArrowRight } from 'lucide-react';
import styles from "./banner.module.css";

import bannerBg from '@/public/images/banner/banner-bg.jpg';

const bannerContent = {
    subTitle: 'Online Trading Platform',
    titleMain: 'Trade',
    titleSub: 'your crypto on BinTrade',
    description: 'Bintrade are where merchants can purchase, sell and convert different digital forms of money.',
    button: 'Try demo',
}

export default function Banner() {
    return (
        <section className={styles.bannerSection}>
            <Image src={bannerBg}
                className={styles.bannerBg}
                alt="bannerBg"
                fill={true} 
            />
            <div className="absolute inset-0 bg-black/50 z-[-1] md:hidden"></div>
            <div className="custom-container">
                <div className="banner-content-wrapper grid grid-cols-1 md:grid-cols-2">
                    <div className="banner-content md:mr-10">
                        <span className={styles.subTitle}>{bannerContent.subTitle}</span>
                        <h1 className="title text-white text-[32px] sm:text-[36px] md:text-[40px] lg:text-[46px] xl:text-[55px] font-bold mb-4"><span className="text--base">{bannerContent.titleMain}</span> {bannerContent.titleSub}</h1>
                        <p className={styles.description}>{bannerContent.description}</p>
                        <div className="banner-btn mt-8">
                            <Link className="baseBtn" href="/login">{bannerContent.button} <CircleArrowRight /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}