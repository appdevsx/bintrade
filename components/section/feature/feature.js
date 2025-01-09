import styles from "./feature.module.css";
import { WalletCards } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { MessageSquareDot } from 'lucide-react';

const sectionHeader = {
    sectionSubTitle: 'Features',
    sectionTitleLeft: 'The',
    sectionTitleMain: 'Features',
    sectionTitleRight: 'we offer is specifically designed to meet your needs.',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

const featureItems = [
    {
        icon: <WalletCards />,
        title: 'Demo Account',
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times.',
    },
    {
        icon: <LockKeyhole />,
        title: 'Ready-to-go Strategies',
        description: 'You can use mobile device to pay with simple steps in value. Compellingly pay with simple steps in value',
    },
    {
        icon: <MessageSquareDot />,
        title: 'Online Payment',
        description: 'You can use mobile device to pay with simple steps in value. Compellingly pay with simple steps in value',
    }
]

export default function Feature() {
    return (
        <section className="feature-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header text-center col-span-4 col-start-2">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                        <h2 className="section-title text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
                        <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
                    </div>
                </div>
                <div className="feature-item-wrapper grid grid-cols-3 gap-5">
                    {featureItems.map(( featureItem, index ) => {
                        return (
                            <div className={styles.featureItem} key={index}>
                                <div className="feature-icon w-12 h-12 flex justify-center items-center bg--base text-white rounded-lg text-4xl mb-4">
                                    {featureItem.icon}
                                </div>
                                <div className="feature-content">
                                    <h3 className="title text-lg font-bold mb-1">{featureItem.title}</h3>
                                    <p>{featureItem.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}