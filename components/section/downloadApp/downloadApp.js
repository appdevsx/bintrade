import styles from "./downloadApp.module.css";
import Image from "next/image";
import Link from "next/link";
import { CircleArrowRight } from 'lucide-react';
import { Apple } from 'lucide-react';
import { Airplay } from 'lucide-react';

import app from '@/public/images/app/app.webp';

const sectionHeader = {
    sectionSubTitle: 'App',
    sectionTitleLeft: 'Download and Register From Mobile',
    sectionTitleMain: 'App',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

const appItems = [
    {
        icon: <Airplay />,
        title: 'Download on Play Store',
        description: 'Work with the pro, talented people at the most affordable price to get the most out of your time and cost using mobile apps.',
        button: 'On play store',
        image: app,
    },
    {
        icon: <Apple />,
        title: 'Download on App Store',
        description: 'Work with the pro, talented people at the most affordable price to get the most out of your time and cost using mobile apps.',
        button: 'On App store',
        image: app,
    }
]

export default function DownloadApp() {
    return (
        <section className="app-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header col-span-3">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span></h2>
                        <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
                    </div>
                </div>
                <div className="app-item-wrapper grid grid-cols-1 md:grid-cols-2 gap-5">
                    {appItems.map(( appItem, index ) => {
                        return (
                            <div className={styles.appItem} key={index}>
                                <div className="app-content w-full lg:w-4/6">
                                    <div className="app-icon mb-4">
                                        {appItem.icon}
                                    </div>
                                    <h3 className="title text-xl font-bold mb-2">{appItem.title}</h3>
                                    <p>{appItem.description}</p>
                                    <div className="app-btn mt-3">
                                        <Link className="customBtn" href="/login">{appItem.button} <CircleArrowRight /></Link>
                                    </div>
                                </div>
                                <div className="app-thumb relative lg:absolute bottom-[-30px] lg:bottom-0 lg:right-10">
                                    <Image src={appItem.image} 
                                        className="object-cover"
                                        width={140} 
                                        alt="app"
                                        priority={true}
                                        quality={50}  
                                        decoding="async" 
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}