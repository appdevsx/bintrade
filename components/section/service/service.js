import styles from "./service.module.css";
import { AlignStartVertical } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import { AlignHorizontalDistributeCenter } from 'lucide-react';

const sectionHeader = {
    sectionSubTitle: 'Service',
    sectionTitleLeft: 'The',
    sectionTitleMain: 'Services',
    sectionTitleRight: 'we publish is specifically designed to meet your needs.',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

const serviceItems = [
    {
        title: 'Demo Account',
        icon: <AlignStartVertical />,
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times. You can use mobile to pay with simple steps.',
    },
    {
        title: 'Fixed time traders',
        icon: <CalendarClock />,
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times. You can use mobile to pay with simple steps.',
    },
    {
        title: 'Stock trading',
        icon: <AlignHorizontalDistributeCenter />,
        description: 'We employ state-of-the-art encryption and security protocols to ensure your financial data is protected at all times. You can use mobile to pay with simple steps.',
    }
]

export default function Service() {
    return (
		<section className="service-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header text-center col-span-4 col-start-2">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                        <h2 className="section-title text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
                        <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
                    </div>
                </div>
                <div className="service-item-wrapper grid grid-cols-3 gap-5">
                    {serviceItems.map(( serviceItem, index ) => {
                        return (
                            <div className={styles.serviceItem} key={index}>
                                <div className={styles.serviceInnerItem}>
                                    <div className="service-content">
                                        <div className="service-content-header flex justify-between items-center mb-4">
                                            <h3 className="title text-lg font-bold">{serviceItem.title}</h3>
                                            <div className={styles.serviceIcon}>
                                                {serviceItem.icon}
                                            </div>
                                        </div>
                                        <p>{serviceItem.description}</p>
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