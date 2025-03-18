'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getUsefullDetailsAPI } from "@/services/apiClient/apiClient";

const sectionHeader = {
    sectionSubTitle: 'Privacy Policy',
    sectionTitleLeft: 'The',
    sectionTitleMain: 'Policy',
    sectionTitleRight: 'we maintain is specifically rulled for meet your needs.',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

export default function Privacy() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUsefullLinksDetails = async () => {
            try {
                const response = await getUsefullDetailsAPI();
                setData(response.data);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchUsefullLinksDetails();
    }, []);

    return (
		<section className="privacy-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header text-center col-span-4 col-start-2">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
                        <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
                    </div>
                </div>
                <div className="section--bg border border-slate-800 py-8 sm:py-10 lg:py-14 px-5 sm:px-8 lg:px-10 rounded-[8px]">
                    <h4 className="text-xl md:text-2xl font-bold mb-3">{data?.data?.page_title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: data?.data?.content }} />
                </div>
			</div>
		</section>
    );
}