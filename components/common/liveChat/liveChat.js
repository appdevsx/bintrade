"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LiveChat = () => {
    const pathname = usePathname();
    const [isChatLoaded, setIsChatLoaded] = useState(false);
    const chatTriggerRef = useRef(null);

    const loadLiveChatScript = () => {
        const existingScript = document.getElementById("contactus-jssdk");
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement("script");
        script.id = "contactus-jssdk";
        script.src =
            "https://api.anychat.one/widget/e49ef2ab-b251-4334-82ec-7da50cfc7802?r=" +
            encodeURIComponent(window.location.href);
        script.async = true;

        document.body.appendChild(script);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isChatLoaded) {
                    setIsChatLoaded(true);
                }
            });
        });

        if (chatTriggerRef.current) {
            observer.observe(chatTriggerRef.current);
        }

        return () => {
            if (chatTriggerRef.current) {
                observer.disconnect();
            }
        };
    }, [chatTriggerRef, isChatLoaded]);

    useEffect(() => {
        if (isChatLoaded) {
            loadLiveChatScript();
        }
    }, [isChatLoaded, pathname]);

    return <div ref={chatTriggerRef} style={{ height: "1px" }} />;
};

export default LiveChat;