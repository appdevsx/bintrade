"use client"
// Packages
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Pusher from "pusher-js";
import { Paperclip, Send } from 'lucide-react';
import { sendMessageAPI, uploadFileAPI, getBasicSettingsAPI, removeFileAPI } from "@/services/apiClient/apiClient";

export default function ConversationSection({ data, imagePath }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [uploadedDevPaths, setUploadedDevPaths] = useState([]);
    const [pusherConfig, setPusherConfig] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [previewData, setPreviewData] = useState([]);




    const [filePreview, setFilePreview] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
          if (file.type.startsWith("image/")) {
            setFilePreview(URL.createObjectURL(file));
          } else {
            setFilePreview(file.name);
          }
        }
    };

    const sendMessage = () => {
        if (newMessage.trim() || selectedFile) {
            const newMsg = {
            type: "user",
            text: newMessage || "",
            image: user,
            file: selectedFile ? { name: selectedFile.name, preview: filePreview } : null,
            };
    
            setMessages((prev) => [...prev, newMsg]);
            setNewMessage("");
            setSelectedFile(null);
            setFilePreview(null);
        }
    };
    
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getBasicSettingsAPI();
                if (response.data) {
                    setPusherConfig(response.data.data.pusher.channel);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };

        fetchSettings();
    }, []);


    useEffect(() => {
        if (pusherConfig) {
            const pusher = new Pusher(pusherConfig.primary_key, { cluster: pusherConfig.cluster });
            const channel = pusher.subscribe(`support.conversation.${data.token}`);
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

    const handleFileUpload = async (files) => {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("order", i.toString());

            try {
                const response = await uploadFileAPI(formData, (event) => {
                    // Calculate progress
                    const totalSize = event.total / (1024 * 1024); // Convert bytes to MB
                    const uploadedSize = event.loaded / (1024 * 1024); // Convert bytes to MB
                    const percentage = Math.round((event.loaded / event.total) * 100);

                    setUploadProgress({
                        percentage,
                        uploadedSize: uploadedSize.toFixed(2), // Keep 2 decimal places
                        totalSize: totalSize.toFixed(2),
                    });
                });

                if (response.data.data.dev_path) {
                    setUploadedDevPaths((prev) => [...prev, response.data.data.dev_path]);
                    setPreviewData((prev) => [...prev, response.data.data]);
                }
            } catch (err) {
                if (uploadedDevPaths.length === 0 && previewData.length === 0) {
                    setUploadProgress({});
                }
                const errors = err.response?.data?.message?.error || "Server didn't respond";
            }
        }
    };

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
            const errors = err.response?.data?.message?.error?.error || "Server didn't respond";
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

    const handleRemoveFile = async (devPath) => {
        try {
            const response = await removeFileAPI(devPath);
            if (response.status === 200) {
                setUploadedDevPaths((prevPaths) => {
                    const updatedPaths = prevPaths.filter((path) => path !== devPath);
                    if (updatedPaths.length === 0) {
                        setUploadProgress({});
                    }
                    return updatedPaths;
                });

                setPreviewData((prevData) => {
                    const updatedData = prevData.filter((item) => item.dev_path !== devPath);
                    if (updatedData.length === 0) {
                        setUploadProgress({});
                    }
                    return updatedData;
                });

                const successMessage = response?.data?.message?.success;
                successMessage.forEach((msg) => {
                    toast.success(msg);
                });
            }
        } catch (err) {
            const errors = err.response?.data?.message?.error || "Server didn't respond";
        }
    };


    return (
        // <>
        //     <div className="overflow-hidden">
        //         <div className="bg-white__color sm:px-5 sm:py-3 p-3 rounded-xl relative">
        //             {uploadProgress.percentage > 0 && (
        //                 <div className="absolute top-[-110px] left-0 bg-white__color w-full h-[120px] rounded-[20px_20px_0_0] p-3">
        //                     <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
        //                         <div className="h-full bg-primary__color transition-all" style={{ width: `${uploadProgress.percentage}%` }}></div>
        //                     </div>
        //                     <span className="text-[12px] text-color__paragraph">
        //                         {uploadProgress.uploadedSize} MB / {uploadProgress.totalSize} MB ({uploadProgress.percentage}%)
        //                     </span>
        //                     {uploadedDevPaths.length > 0 && (
        //                         <span className="text-[12px] text-color__paragraph ms-1">
        //                             {"| "}{uploadedDevPaths.length} <span>file(s) uploaded</span>
        //                         </span>
        //                     )}
                            
        //                     {previewData && previewData.length > 0 && (
        //                         <div className="mt-2 flex gap-2 w-full overflow-x-auto">
        //                             {previewData.map((item, index) => {
        //                                 if (item.type.includes("image")) {
        //                                     return (
        //                                         <div key={index} className="flex items-center gap-2 whitespace-nowrap border border-primary_border_color rounded-md p-1 min-w-[196px] relative transition-all group" title={item.original_name}>
        //                                             <Image
        //                                                 src={item.file_link}
        //                                                 width={40}
        //                                                 height={40}
        //                                                 objectFit="cover"
        //                                                 alt={item.name}
        //                                                 className="w-[40px] h-[40px] object-cover rounded-md"
        //                                             />
        //                                             <div className="leading-none">
        //                                                 <h6 className="text-[12px] font-semibold">{item.original_name.length > 20 ? `${item.original_name.substring(0, 20)}...` : item.original_name}</h6>
        //                                                 <span className="text-[12px]">{item.type}</span>
        //                                             </div>
        //                                             <button type="button" onClick={() => handleRemoveFile(item.dev_path)} className="absolute top-[-50px] right-[2px] bg-red-500 text-white__color rounded-full opacity-0 group-hover:opacity-100 group-hover:top-[2px] transition-all hover:bg-secondary__color">
        //                                                 Cross
        //                                             </button>
        //                                         </div>
        //                                     );
        //                                 } else if (item.type) {
        //                                     return (
        //                                         <div key={index} className="flex items-center gap-2 whitespace-nowrap border border-primary_border_color rounded-md p-1 min-w-[196px] relative transition-all group" title={item.original_name}>
        //                                             <div className="w-[40px] h-[40px] rounded-md flex items-center justify-center bg-purple-100 text-secondary__color">
        //                                                 Play
        //                                             </div>
        //                                             <div className="leading-none">
        //                                                 <h6 className="text-[12px] font-semibold">{item.original_name.length > 20 ? `${item.original_name.substring(0, 20)}...` : item.original_name}</h6>
        //                                                 <span className="text-[12px]">{item.type}</span>
        //                                             </div>
        //                                             <button type="button" onClick={() => handleRemoveFile(item.dev_path)} className="absolute top-[-50px] right-[2px] bg-red-500 text-white__color rounded-full opacity-0 group-hover:opacity-100 group-hover:top-[2px] transition-all hover:bg-secondary__color">
        //                                                 Cross
        //                                             </button>
        //                                         </div>
        //                                     );
        //                                 }
        //                                 return null;
        //                             })}
        //                         </div>
        //                     )}
        //                 </div>
        //             )}
        //             <div className="flex items-center">
        //                 <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} className="min-h-[80px] border border-primary_border_color rounded-lg px-3 py-2 text-color__heading text-small__font" placeholder="Type something here..."></textarea>
        //                 <div className="flex items-center sm:gap-4 gap-2 sm:ms-5 ms-2">
        //                     <label htmlFor="attachment" className="text-color__paragraph transition-all hover:text-primary__color cursor-pointer">Attachment</label>
        //                     <input
        //                         type="file"
        //                         id="attachment"
        //                         className="hidden"
        //                         multiple
        //                         accept=".png,.jpg,.jpeg,.webp,.svg"
        //                         onChange={(e) => {
        //                             const files = Array.from(e.target.files);
        //                             const maxSize = 52428800; // 50 MB
        //                             const validFiles = files.filter(file => file.size <= maxSize);

        //                             if (validFiles.length < files.length) {
        //                                 toast.error("Some files exceed the 50 MB limit and were not uploaded.");
        //                             }
        //                             handleFileUpload(validFiles); // Pass only valid files to your handler
        //                         }}
        //                     />
        //                     <button onClick={handleSendMessage} className="w-10 h-10 rounded-full flex items-center justify-center text-white__color bg-primary__color transition-all hover:bg-secondary__color">
        //                         Send
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <div className="h-[calc(100vh-100px)] bg-[#051524] border border-slate-800 rounded-md w-full sm:w-[900px] mx-auto overflow-y-auto z-[5] shadow-lg p-4 transition-transform duration-300 ease-in-out">
            <div className="p-4 space-y-4 flex flex-col justify-end overflow-y-auto h-[calc(100%-80px)]">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.type === "support" && (
                            <Image
                                src={msg.image}
                                width={32}
                                height={32}
                                alt="Admin"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                        )}
                        <div
                            className={`max-w-xs p-3 rounded-lg text-white ${
                                msg.type === "user"
                                ? "bg-blue-600 text-right"
                                : "bg-[#0d1f30] text-left"
                            }`}
                        >
                            <p>{msg.text}</p>
                            {msg.file && (
                                <div className="mt-2">
                                    {msg.file.preview.startsWith("blob:") ? (
                                        <img
                                        src={msg.file.preview}
                                        alt="Uploaded file"
                                        className="max-h-40 rounded-lg"
                                        />
                                    ) : (
                                        <a
                                        href={msg.file.preview}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-300 underline"
                                        >
                                        {msg.file.name}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                        {msg.type === "user" && (
                            <Image
                                src={msg.image}
                                width={32}
                                height={32}
                                alt="user"
                                className="w-8 h-8 rounded-full ml-2"
                            />
                        )}
                    </div>
                ))}
            </div>
            {filePreview && (
                <div className="p-4 bg-[#0d1f30]">
                    {filePreview.startsWith("blob:") ? (
                        <img
                        src={filePreview}
                        alt="Selected file preview"
                        className="max-h-40 mx-auto rounded-lg"
                        />
                    ) : (
                        <p className="text-white text-sm text-center">{filePreview}</p>
                    )}
                </div>
            )}
            <div className="p-4 bg-[#0d1f30] rounded-md flex items-center space-x-2">
                <label htmlFor="file-input" className="cursor-pointer">
                    <Paperclip className="text-white w-6 h-6" />
                    <input
                        type="file"
                        id="file-input"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="text-sm w-full py-3 px-3 gradient--bg border-slate-800 text-white rounded-md"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center"
                    >
                    <Send className="w-4 h-4 mr-1" />
                    Send
                </button>
            </div>
        </div>
    )
}