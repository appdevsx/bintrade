'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { getAliasAPI } from "@/services/apiClient/apiClient";

export default function Alias() {
	const [alias, setAlias] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchAlias = async () => {
			try {
				const response = await getAliasAPI();
				setAlias(response.data?.data?.alias);
			} catch (error) {
				toast.error("Server did not respond");
			} finally {
				setLoading(false);
			}
		};

		fetchAlias();
	}, []);

    return (
		<Alias alias={alias} />
    );
}