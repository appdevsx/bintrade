"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuthRedirect = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token =
                localStorage.getItem("jwtToken") ||
                sessionStorage.getItem("jwtToken");
            if (token) {
                router.push("/trading");
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (loading) return null;
};

export default useAuthRedirect;
