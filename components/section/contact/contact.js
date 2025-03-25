'use client'
import { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import styles from "./contact.module.css";
import { ArrowRightToLine, LoaderCircle } from 'lucide-react';
import { contactAPI, getContactAPI } from "@/services/apiClient/apiClient";
import { useLanguage } from "@/context/languageProvider/languageProvider";

const contactForm = {
    title: 'Tell us about yourself',
    description: 'Whether you have questions or you would just like to say hello, contact us.',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    button: 'Send',
}

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [contact, setContact] = useState([]);
    const [loading, setLoading] = useState(false);
    const { language } = useLanguage();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await contactAPI(name, email, message);

            if (response.data.type === "success") {
                toast.success(response.data.message.success[0]);
            } else {
                toast.error(response.data.message.error[0]);
            }
        } catch (error) {
            toast.error("Server did not respond");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchContact = async () => {
            try {
                const response = await getContactAPI(language);
                setContact(response.data?.data?.section);
            } catch (error) {
                toast.error("Server did not respond");
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [language]);

    return (
		<section className="contact-section relative z-1 py-20">
            <Toaster reverseOrder={false} theme="dark" />
            <div className={styles.contactElement}></div>
            <div className="custom-container">
                {loading ? (
                    <div className="animate-pulse">
                        <div className="grid grid-cols-2 gap-5 items-center">
                            <div className="mr-12 space-y-4">
                                <div className="space-y-4">
                                    <div className="w-20 h-8 bg-gray-700 rounded"></div>
                                    <div className="w-full h-8 bg-gray-700 rounded"></div>
                                    <div className="w-full h-12 bg-gray-700 rounded"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    {[...Array(2)].map((_, index) => (
                                        <div className="space-y-4" key={index}>
                                            <div className="w-20 h-8 bg-gray-700 rounded"></div>
                                            <div className="w-full h-8 bg-gray-700 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-[500px] h-[500px] bg-gray-700 rounded"></div>
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="contact-wrapper grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                            <div className="contact-address-content-wrapper mr-0 md:mr-12">
                                <div className="contact-address-content-header mb-7">
                                    <span className="sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{contact.heading}</span>
                                    <h2 className="title text-3xl md:text-4xl font-bold mb-4">{contact.sub_heading}</h2>
                                    <p className="text-base">{contact.desc}</p>
                                </div>
                                <div className="contact-address-item-wrapper grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="contact-address-item">
                                        <div className="contact-address-info">
                                            <h3 className="title text-lg font-bold mb-3 text-emerald-400">Address:</h3>
                                            <p className="text-base">{contact.address}</p>
                                        </div>
                                    </div>
                                    <div className="contact-address-item">
                                        <div className="contact-address-info">
                                            <h3 className="title text-lg font-bold mb-3 text-emerald-400">Contact:</h3>
                                            <p className="text-base">{contact.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.contactFormWrapper}>
                                <div className={styles.contactForm}>
                                    <div className="contact-form-header mb-4">
                                        <h3 className="title text-xl md:text-2xl font-bold mb-3">{contactForm.title}</h3>
                                        <p>{contactForm.description}</p>
                                    </div>
                                    <form className="contact-form-inner grid grid-cols-12 gap-5" onSubmit={handleSubmit}>
                                        <div className="form-group col-span-6">
                                            <label className="text-sm mb-2 block">{contactForm.nameLabel}*</label>
                                            <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Type name here..." className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                                        </div>
                                        <div className="form-group col-span-6">
                                            <label className="text-sm mb-2 block">{contactForm.emailLabel}*</label>
                                            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Type email here..." className="w-full h-11 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></input>
                                        </div>
                                        <div className="form-group col-span-12">
                                            <label className="text-sm mb-2 block">{contactForm.messageLabel}*</label>
                                            <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type message here..." className="w-full h-32 text-sm font-medium rounded-md shadow-sm border-slate-800 text-slate-300 gradient--bg" required></textarea>
                                        </div>
                                        <div className="form-group col-span-12">
                                            <button type="submit" className={`baseBtn ${loading ? "cursor-not-allowed" : ""}`} disabled={loading}>
                                                {loading ? (
                                                    <LoaderCircle className="inline-block w-5 h-6 animate-spin text-white" />
                                                ) : (
                                                    <>
                                                        {contactForm.button} <ArrowRightToLine className={`${language === 'ar' ? 'transform rotate-[180deg]' : 'transform rotate-[0]'}`} />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
			</div>
		</section>
    );
}