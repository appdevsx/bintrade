'use client'
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./contact.module.css";
import { ArrowRightToLine, LoaderCircle } from 'lucide-react';
import { contactAPI } from "@/services/apiClient/apiClient";

const contactAddressContentHeader = {
    subTitle: 'Contact',
    titleLeft: 'Keep In',
    titleMain: 'Touch',
    titleRight: 'With Us.',
    description: 'Get in touch with us using the contact form below. Our team will respond to your inquiries promptly.',
}

const contactAddressItems = [
    {
        title: 'Address:',
        description: 'Road 4, Block C, Ranking Street, Paris, France',
    },
    {
        title: 'Contact:',
        description: 'hello@bintrade.com',
    }
]

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
    const [loading, setLoading] = useState(false);

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


    return (
		<section className="contact-section relative z-1 py-20">
            <Toaster reverseOrder={false} theme="dark" />
            <div className={styles.contactElement}></div>
            <div className="custom-container">
                <div className="contact-wrapper grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                    <div className="contact-address-content-wrapper mr-0 md:mr-12">
                        <div className="contact-address-content-header mb-7">
                            <span className="sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{contactAddressContentHeader.subTitle}</span>
                            <h2 className="title text-3xl md:text-4xl font-bold mb-4">{contactAddressContentHeader.titleLeft} <span className="text--base">{contactAddressContentHeader.titleMain}</span> {contactAddressContentHeader.titleRight}</h2>
                            <p className="text-base">{contactAddressContentHeader.description}</p>
                        </div>
                        <div className="contact-address-item-wrapper grid grid-cols-1 md:grid-cols-2 gap-5">
                            {contactAddressItems.map(( contactAddressItem, index ) => {
                                return (
                                    <div className="contact-address-item" key={index}>
                                        <div className="contact-address-info">
                                            <h3 className="title text-lg font-bold mb-3 text-emerald-400">{contactAddressItem.title}</h3>
                                            <p className="text-base">{contactAddressItem.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
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
                                                {contactForm.button} <ArrowRightToLine />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
			</div>
		</section>
    );
}