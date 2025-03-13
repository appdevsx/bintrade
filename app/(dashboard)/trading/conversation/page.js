"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ConversationSection from "@/components/section/conversation/conversation";
import { getConversationDataAPI } from "@/services/apiClient/apiClient";
import toast from "react-hot-toast";
import { LoaderCircle } from 'lucide-react';

export default function ConversationPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("Id");
    const [conversationData, setConversationData] = useState();
    const [imagePath, setImagePath] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchConversationData = useCallback(async () => {
        try {
            const response = await getConversationDataAPI(id);
            setConversationData(response?.data?.data?.support_ticket);
            setImagePath(response.data.data.image_paths);
        } catch (err) {
            toast.error(err.message || "Failed to fetch conversation data.");
        } finally {
            setLoading(false)
        }
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetchConversationData();
    }, [id, fetchConversationData]);

    return (
        <>
            {loading ? (
                <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center bg-[#011120] z-[999]">
                    <LoaderCircle className="inline-block w-10 h-auto animate-spin text-[#cbd5e1]" />
                </div>
            ) : (
                <ConversationSection data={conversationData} imagePath={imagePath} />
            )}
        </>
    );
}