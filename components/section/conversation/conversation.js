"use client"
// Packages
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Pusher from "pusher-js";
import { Paperclip, Send, X, Play, File } from 'lucide-react';
import { sendMessageAPI, uploadFileAPI, getBasicSettingsAPI, removeFileAPI } from "@/services/apiClient/apiClient";

export default function ConversationSection({ data, imagePath }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(() => data?.conversations);
    const [isSending, setIsSending] = useState(false);
    const [uploadedDevPaths, setUploadedDevPaths] = useState([]);
    const [pusherConfig, setPusherConfig] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [previewData, setPreviewData] = useState([]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getBasicSettingsAPI();
                if (response.data) {
                    setPusherConfig(response.data.data.pusher.channel);
                }
            } catch (error) {
                toast.error("Error fetching settings:", error);
            }
        };

        fetchSettings();
    }, []);

    useEffect(() => {
        if (pusherConfig) {
            const pusher = new Pusher(pusherConfig.primary_key, { cluster: pusherConfig.cluster });
            const channel = pusher.subscribe(`support.conversation.${data?.token}`);
            channel.bind("support-conversation", (payload) => {
                const newMessage = {
                    id: payload.conversation?.id || Date.now(),
                    message: payload.conversation?.message || '',
                    sender_type: payload.conversation?.sender_type || 'ADMIN',
                    creator_image: payload.conversation?.creator_image || '',
                    conversation_attachments: []
                };
                if (payload.conversation?.attachments) {
                    newMessage.conversation_attachments = payload.conversation.attachments.map(attachment => {
                        const baseUrl = imagePath.base_url.replace(/\/public$/, "");
                        return {
                            ...attachment,
                            fullPath: attachment.type.includes("image") 
                                ? `${baseUrl}/${imagePath.support_conversation_path}/${attachment.name}`
                                : null,
                            attachment_download_link: `${baseUrl}/${imagePath.support_conversation_path}/${attachment.name}`
                        };
                    });
                }
                setMessages(prevMessages => [...prevMessages, newMessage]);
            });
    
            return () => {
                pusher.disconnect();
            };
        }
    }, [imagePath, pusherConfig]);

    useEffect(() => {
        const messageList = document.querySelector(".chat_container");
        messageList?.scrollTo({
            top: messageList.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!message.trim() && uploadedDevPaths.length === 0) return;

        setIsSending(true);
        setMessage("");
        
        try {
            const response = await sendMessageAPI(data.token, message, uploadedDevPaths);
            setUploadedDevPaths([]);
            setUploadProgress({});
            setPreviewData([]);
        } catch (err) {
            toast.error(err.response?.data?.message?.error);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!message.trim() && uploadedDevPaths.length === 0) return;
            handleSendMessage();
        }
    };

    return (
        <div className="bg-[#051524] rounded-md w-full sm:w-[900px] mx-auto z-[5] shadow-lg p-4 transition-transform duration-300 ease-in-out">
            {/* Header Section with User Info and Ticket Details */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-[#0d1f30] rounded-md">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <Image
                        src={data.user.userImage}
                        width={48}
                        height={48}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                    />
                    <div>
                        <h3 className="text-white font-semibold">{data.user.fullname}</h3>
                        <p className="text-gray-400 text-sm">{data.user.email}</p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:items-end">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Ticket ID:</span>
                        <span className="text-white font-mono">{data.token}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-gray-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs text-white ${data.stringStatus.class.includes('success') ? 'bg-green-500' : 
                                          data.stringStatus.class.includes('info') ? 'bg-blue-500' : 
                                          data.stringStatus.class.includes('danger') ? 'bg-red-500' : 'bg-gray-500'}`}>
                            {data.stringStatus.value}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content Area with Conversation and Support Details Sidebar */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Conversation Section (Left) */}
                <div className="chat_container border border-slate-800 rounded-md overflow-y-auto flex-1">
                    <div className="p-4 min-h-[calc(100vh-400px)] max-h-[calc(100vh-400px)] space-y-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.sender_type === "USER" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.sender_type === "ADMIN" && (
                                    <Image
                                        src={msg.senderImage || `${imagePath.base_url}${imagePath.default_image}`}
                                        width={32}
                                        height={32}
                                        alt="Admin"
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                )}
                                <div
                                    className={`max-w-xs p-3 rounded-lg text-white ${
                                        msg.sender_type === "USER"
                                        ? "bg-blue-600 text-right"
                                        : "bg-[#0d1f30] text-left"
                                    }`}
                                >
                                    <p>{msg.message}</p>
                                </div>
                                {msg.sender_type === "USER" && (
                                    <Image
                                        src={data.user.userImage}
                                        width={32}
                                        height={32}
                                        alt="user"
                                        className="w-8 h-8 rounded-full ml-2"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-[#0d1f30] rounded-md flex items-center space-x-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-sm w-full py-3 px-3 gradient--bg border-slate-800 text-white rounded-md"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                            >
                            <Send className="w-4 h-4 mr-1" />
                            Send
                        </button>
                    </div>
                </div>

                {/* Support Details Sidebar (Right) */}
                <div className="w-full lg:w-80 bg-[#0d1f30] rounded-md p-4 h-fit">
                    <h4 className="text-white font-semibold mb-4">Support Details</h4>
                    <div className="space-y-4">
                        <div>
                            <h5 className="text-gray-400 text-sm mb-1">Subject:</h5>
                            <p className="text-white">{data.subject}</p>
                        </div>
                        <div>
                            <h5 className="text-gray-400 text-sm mb-1">Description:</h5>
                            <p className="text-white">{data.desc}</p>
                        </div>
                        <div>
                            <h5 className="text-gray-400 text-sm mb-1">Created At:</h5>
                            <p className="text-white">{new Date(data.created_at).toLocaleString()}</p>
                        </div>
                        {data.attachments?.length > 0 && (
                            <div>
                                <h5 className="text-gray-400 text-sm mb-2">Attachments:</h5>
                                <div className="space-y-2">
                                    {data.attachments.map((attachment, index) => (
                                        <a 
                                            key={index}
                                            href={attachment.attachment_info.file_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-blue-400 hover:text-blue-300"
                                        >
                                            <File className="w-4 h-4 mr-2" />
                                            <span className="truncate">{attachment.attachment_info.original_name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}