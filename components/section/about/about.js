import styles from "./about.module.css";
import Image from "next/image";

import about from '@/public/images/about/about.webp';

const aboutWrapper = {
    subTitle: 'About Us',
    titleLeft: 'Secure Installment With',
    titleMain: 'BinTrade',
    description: 'In such cases, it is important to ensure that the QR code is compatible with a wide range of devices and platforms to maximize its effectiveness.',
	image: about,
}

const aboutLists = [
    {
        icon: <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>,
        name: 'We provide you with a zero-risk demo account for practicing any and all strategies',
    },
    {
		icon: <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>,
        name: 'A wealth of trading theory and practical advice — provided here for you',
    },
    {
		icon: <svg height="13" viewBox="0 0 520 520" width="13" xmlns="http://www.w3.org/2000/svg" id="fi_5291043"><g id="_7-Check" data-name="7-Check"><path d="m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z"></path></g></svg>,
        name: 'Our support team is ready to answer any questions and help you 24/7',
    }
]

export default function About() {
    return (
		<section className="about-section py-20">
            <div className="custom-container">
                <div className={styles.aboutWrapper}>
					<div className="about-inner-wrapper grid grid-cols-2 gap-5 items-center">
						<div className="about-content-wrapper mr-8">
							<span className="sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{aboutWrapper.subTitle}</span>
							<h2 className="title text-4xl font-bold mb-3">{aboutWrapper.titleLeft} <span className="text--base">{aboutWrapper.titleMain}</span></h2>
							<p className="mb-2">{aboutWrapper.description}</p>
							<ul className={styles.aboutList}>
								{aboutLists.map(( aboutList, index ) => {
									return (
										<li key={index}>
											{aboutList.icon}
											<span>{aboutList.name}</span>
										</li>
									);
								})}
							</ul>
						</div>
						<div className="about-thumb">
							<Image src={aboutWrapper.image} 
								className="object-cover rounded-xl ml-auto"
								alt="about"
								width={400}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}