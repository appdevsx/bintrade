"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ConversationSection from "@/components/section/conversation/conversation";
import { getConversationDataAPI } from "@/services/apiClient/apiClient";

export default function ConversationPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("Id");
    const [conversationData, setConversationData] = useState(null);
    const [imagePath, setImagePath] = useState(null);

    const fetchConversationData = useCallback(async () => {
        try {
            const response = await getConversationDataAPI(id);
            setConversationData(response.data.data.support_ticket);
            setImagePath(response.data.data.image_paths);
        } catch (err) {
            toast.error(err.message || "Failed to fetch conversation data.");
        }
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetchConversationData();
    }, [id, fetchConversationData]);

    return (
        <>
            <ConversationSection data={conversationData} imagePath={imagePath} />
        </>
    );
}