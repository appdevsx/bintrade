"use client";
import { useState } from "react";
import Link from "next/link";
import { CircleArrowDown, CircleArrowRight } from 'lucide-react';

const sectionHeader = {
    sectionSubTitle: 'FAQ',
    sectionTitle: 'Frequently Asked Questions',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

const faqItems = [
    {
        title: "What is the process of buying your products?",
        description: "You can easily purchase our products from the CodeCanyon marketplace. Simply visit our portfolio, browse through our offerings, and follow the straightforward checkout process.",
    },
    {
        title: "How can I check out the demo before purchasing?",
        description: "Visit our product demo showcase to find live demos. If you need additional access, contact our sales team to request a personalized demonstration.",
    },
    {
        title: "Can I purchase products for my clients?",
        description: "Yes, you can purchase our solutions for your clients. We recommend buying an extended license if you are purchasing products for your clients.",
    },
    {
        title: "Are your scripts production ready?",
        description: "Yes, all our scripts are production-ready and come with detailed documentation to facilitate deployment.",
    },
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaqItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
		<section className="faq-section py-20">
            <div className="custom-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="section-header-wrapper">
                        <div className="section-header">
                            <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{sectionHeader.sectionTitle}</h2>
                            <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
                            <div className="faq-btn mt-8">
                                <Link className="baseBtn" href="/contact">Need Help? <CircleArrowRight /></Link>
                            </div>
                        </div>
                    </div>
                    <ul className="space-y-2">
                        {faqItems.map((faqItem, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <li
                                    className="section--bg border border-slate-800 py-4 lg:py-7 px-5 lg:px-10 rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out"
                                    key={index}
                                >
                                    <div className="flex items-center justify-between" onClick={() => toggleFaqItem(index)}>
                                        <h4 className="text-md sm:text-lg font-semibold w-[90%]">
                                            {faqItem.title}
                                        </h4>
                                        <div
                                            className={`relative right-[-10px] lg:right-[-10px] transform ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        >
                                            <CircleArrowDown className="w-5 sm:w-7" />
                                        </div>
                                    </div>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? "max-h-[500px] opacity-100 pt-3"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <p className="w-full">
                                            {faqItem.description}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
				</div>
			</div>
		</section>
    );
}