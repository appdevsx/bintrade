import Link from "next/link";
import Image from "next/image";

import blogOne from '@/public/images/blog/blog-1.webp';

const blogDetails = {
    date: '15th July, 2024',
    title: '2023 review: Milestones we’re proud of 🌟',
    descriptionOne: 'It’s been 9 years since we entered the market, and we’ve achieved so much with BinTrade. We’re focused on improving our platform to make a positive impact on traders and the world around.',
    innerTitleOne: '🚀What’s new at BinTrade:',
    image: blogOne,
    descriptionTwo: 'It’s been 9 years since we entered the market, and we’ve achieved so much with Olymp Trade. We’re focused on improving our platform to make a positive impact on traders and the world around. Here’s how 2023 went.',
    descriptionThree: 'We partnered up with a well-known charitable foundation to provide meals to 1,000 people in need during our Ramadan event.',
    innerTitleTwo: '💖haritable initiatives:',
    descriptionFour: 'Team Up for Change was a charitable initiative that showed the deep compassion woven through our global community.',
    descriptionFive: 'In Mexico, we provided support to the Gatos Olvidados animal shelter, assisting in the facility’s renovations and making sure that the animals had enough food and medicine.',
    descriptionSix: 'Thank you for being a part of the Olymp Trade family! Here’s to an amazing 2024 together 🥂🌟',
    shareTitle: 'Share :',
}

const blogSocials = [
    {
        name: 'Twitter',
        href: '/',
    },
    {
        name: 'Instagram',
        href: '/',
    },
    {
        name: 'Linked In',
        href: '/',
    }
]

export default function BlogDetails() {
    return (
		<section className="blog-details-section py-20">
            <div className="custom-container">
				<div className="blog-item-wrapper">
					<div className="blog-item">
						<div className="blog-content w-8/12">
							<span className="date block mb-4">{blogDetails.date}</span>
							<h2 className="title text-5xl font-bold mb-4">{blogDetails.title}</h2>
							<p>{blogDetails.descriptionOne}</p>
                            <div className="blog-thumb my-8">
                                <Image src={blogDetails.image} 
                                    className="object-cover rounded-xl w-full"
                                    alt="blog"
                                />
                            </div>
                            <h3 className="inner-title text-xl font-bold mb-4">{blogDetails.innerTitleOne}</h3>
                            <p className="mb-4">{blogDetails.descriptionTwo}</p>
                            <p className="mb-4">{blogDetails.descriptionThree}</p>
                            <h3 className="inner-title text-xl font-bold mb-4">{blogDetails.innerTitleTwo}</h3>
                            <p className="mb-4">{blogDetails.descriptionFour}</p>
                            <p className="mb-4">{blogDetails.descriptionFive}</p>
                            <p className="mt-8">{blogDetails.descriptionSix}</p>
                            <div className="blog-share flex items-center border-t-2 border-slate-800 pt-6 mt-6">
                                <span className="text-white text-lg font-bold mr-4">{blogDetails.shareTitle} </span>
                                <div className="blog-social-wrapper">
                                    <ul className="blog-social-list flex items-center justify-between space-x-7">
                                        {blogSocials.map(( blogSocial, index ) => {
                                            return (
                                                <li className="font-medium text-sm text-slate-300" key={index}>
                                                    <Link href="{blogSocial.href}">{blogSocial.name}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</section>
    );
}