import styles from "./choose.module.css";
import Image from "next/image";

import choose from '@/public/images/choose/choose.webp';
import chooseElementOne from '@/public/images/choose/choose-element-1.webp';
import chooseElementTwo from '@/public/images/choose/choose-element-2.webp';

const sectionHeader = {
    sectionSubTitle: 'Why choose BinTrade',
    sectionTitleLeft: 'Finances Through Secure',
    sectionTitleMain: 'Trading',
    sectionTitleRight: 'Practices',
}

const chooseItems = [
    {
        image: chooseElementOne,
        title: '190+ Forex pairs, including majors, minors, exotics, crypto and spot metals',
    },
    {
        image: chooseElementTwo,
        title: '50+ technical indicators, integrated trade signals and innovative risk mitigation tools',
    }
]

const chooseWrapper = {
    image: choose,
}

export default function Choose() {
    return (
        <section className="choose-section section--bg py-20">
            <div className="custom-container">
                <div className="choose-item-wrapper grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                        <div className="choose-wrapper">
                            <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                                <div className="section-header col-span-4">
                                    <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                                    <h2 className="section-title text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
                                </div>
                            </div>
                            <div className="choose-item-wrapper grid grid-cols-2 gap-5">
                                {chooseItems.map(( chooseItem, index ) => {
                                    return (
                                        <div className={styles.chooseItem} key={index}>
                                            <div className="choose-thumb">
                                                <Image src={chooseItem.image}
                                                    className="object-cover"
                                                    width={300}
                                                    alt="choose"
                                                    priority={true}
                                                    quality={50}  
                                                    decoding="async" 
                                                />
                                            </div>
                                            <div className="choose-content mt-6">
                                                <h3 className="choose-title text-xl font-semibold">{chooseItem.title}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 col-start-3">
                        <div className="choose-thumb">
                            <Image src={chooseWrapper.image} 
                                className="object-cover"
                                width={330}
                                alt="choose"
                                priority={true}
                                quality={50}  
                                decoding="async" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}