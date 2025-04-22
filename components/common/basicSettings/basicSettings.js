'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { basicSettingsAPI } from "@/services/apiClient/apiClient";

export default function BasicSettings({ children }) {
	const [basicSettings, setBasicSettings] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
        setLoading(true);
        const fetchSettings = async () => {
            try {
                const response = await basicSettingsAPI();
                setBasicSettings(response?.data?.data?.basic_settings || {});
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return (
		<BasicSettings alias={basicSettings} />
    );
}