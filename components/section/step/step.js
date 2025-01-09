import styles from "./step.module.css";
import { CircleArrowRight } from 'lucide-react';
import Image from "next/image";

import stepOne from '@/public/images/step/step-1.webp';
import stepTwo from '@/public/images/step/step-2.webp';

const stepItems = [
    {
        subTitleNumber: '1',
        subTitleInfo: 'Make Trading',
        title: 'If trading was never an option for you before',
    },
    {
        subTitleNumber: '2',
        subTitleInfo: 'Make Deposite',
        title: 'If trading was never an option for you before',
        image: stepOne,
    },
    {
        subTitleNumber: '3',
        subTitleInfo: 'Make Payout',
        title: 'If trading was never an option for you before',
        image: stepTwo,
    },
    {
        subTitleNumber: '4',
        subTitleInfo: 'Make Practice',
        title: 'If trading was never an option for you before',
    }
]

export default function Step() {
    return (
        <section className="step-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header text-center col-span-4 col-start-2">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">Steps</span>
                        <h2 className="section-title text-4xl font-medium capitalize">Our working <span className="font-extrabold text--base">steps</span> to trading business.</h2>
                        <p className="mt-3.5 text-base">In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.</p>
                    </div>
                </div>
                <div className="step-item-wrapper grid grid-cols-12 gap-5">
                    {/* {stepItems.map(( stepItem, index ) => {
                        return (
                        );
                    })} */}
                    <div className="col-span-5 step-item-inner">
                        <div className={styles.stepItem}>
                            <div className="step-content">
                                <span className="sub-title text-white flex items-center mb-3"><span className="number w-7 h-7 border-2 border--base rounded-full flex justify-center items-center text-center text-lg text--base mr-2 font-bold">1</span> Make Trading <CircleArrowRight className="ml-1 w-4" /></span>
                                <h3 className="title text-xl font-bold mb-1">If trading was never an option for you before</h3>
                                <ul className={styles.stepList}>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>We provide you with a zero-risk demo account for practicing any and all strategies</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>A wealth of trading theory and practical advice — provided here for you</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>Our support team is ready to answer any questions and help you 24/7</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-7 step-item-inner">
                        <div className={styles.stepItem}>
                            <div className="step-content w-7/12">
                                <span className="sub-title text-white flex items-center mb-3"><span className="number w-7 h-7 border-2 border--base rounded-full flex justify-center items-center text-center text-lg text--base mr-2 font-bold">2</span> Make Deposite <CircleArrowRight className="ml-1 w-4" /></span>
                                <h3 className="title text-xl font-bold mb-1">If trading was never an option for you before</h3>
                                <ul className={styles.stepList}>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>We provide you with a zero-risk demo account for practicing any and all strategies</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>A wealth of trading theory and practical advice — provided here for you</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>Our support team is ready to answer any questions and help you 24/7</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="step-thumb absolute bottom-0 right-0">
                                <Image src={stepOne} 
                                    className="object-cover" 
                                    width={250} 
                                    alt="step"
                                    priority={true} 
                                    quality={50}  
                                    decoding="async" 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-7 step-item-inner">
                        <div className={styles.stepItem}>
                            <div className="step-content w-7/12">
                                <span className="sub-title text-white flex items-center mb-3"><span className="number w-7 h-7 border-2 border--base rounded-full flex justify-center items-center text-center text-lg text--base mr-2 font-bold">3</span> Make Payout <CircleArrowRight className="ml-1 w-4" /></span>
                                <h3 className="title text-xl font-bold mb-1">If trading was never an option for you before</h3>
                                <ul className={styles.stepList}>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>We provide you with a zero-risk demo account for practicing any and all strategies</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>A wealth of trading theory and practical advice — provided here for you</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>Our support team is ready to answer any questions and help you 24/7</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="step-thumb absolute bottom-0 right-0">
                                <Image src={stepTwo} 
                                    className="object-cover" 
                                    width={350} 
                                    alt="step"
                                    priority={true} 
                                    quality={50}  
                                    decoding="async" 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 step-item-inner">
                        <div className={styles.stepItem}>
                            <div className="step-content">
                                <span className="sub-title text-white flex items-center mb-3"><span className="number w-7 h-7 border-2 border--base rounded-full flex justify-center items-center text-center text-lg text--base mr-2 font-bold">4</span> Make Practice <CircleArrowRight className="ml-1 w-4" /></span>
                                <h3 className="title text-xl font-bold mb-1">If trading was never an option for you before</h3>
                                <ul className={styles.stepList}>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>We provide you with a zero-risk demo account for practicing any and all strategies</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>A wealth of trading theory and practical advice — provided here for you</span>
                                    </li>
                                    <li>
                                        <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>
                                        <span>Our support team is ready to answer any questions and help you 24/7</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}