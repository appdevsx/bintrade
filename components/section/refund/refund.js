'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getUsefullDetailsTwoAPI } from "@/services/apiClient/apiClient";

export default function Privacy() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUsefullLinksDetails = async () => {
            try {
                const response = await getUsefullDetailsTwoAPI();
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
                <div className="section--bg border border-slate-800 py-8 sm:py-10 lg:py-14 px-5 sm:px-8 lg:px-10 rounded-[8px]">
                    {loading ? (
                        <div className="animate-pulse">
                            <div className="space-y-4">
                                <div className="w-28 h-8 bg-gray-700 rounded"></div>
                                <div className="w-full h-[800px] bg-gray-700 rounded"></div>
                            </div>
                        </div>
                        ) : (
                        <>
                            <h4 className="text-xl md:text-2xl font-bold mb-3">{data?.data?.page_title}</h4>
                            <div dangerouslySetInnerHTML={{ __html: data?.data?.content }} />
                        </>
                    )}
                </div>
			</div>
		</section>
    );
}