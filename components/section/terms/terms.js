const sectionHeader = {
    sectionSubTitle: 'Terms & Conditions',
    sectionTitleLeft: 'The',
    sectionTitleMain: 'Terms',
    sectionTitleRight: 'we maintain is specifically rulled for meet your needs.',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

export default function Terms() {
    return (
		<section className="terms-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header text-center col-span-4 col-start-2">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
                        <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
                    </div>
                </div>
                <div className="section--bg border border-slate-800 py-8 sm:py-10 lg:py-14 px-5 sm:px-8 lg:px-10 rounded-[8px]">
                <h4 className="text-xl md:text-2xl font-bold mb-3">Terms & Conditions</h4>
                    <p>
                        Welcome to AppDevs Software LTD (&quot;AppDevs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our website, https://appdevs.net, and any related services, applications, and products we provide (collectively, the “Services”). By accessing or using our Services, you agree to these Terms. If you do not agree, please refrain from using our Services.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Acceptance of Terms</h5>
                    <p>
                        By using our Services, you confirm that you are at least 18 years old or have received parental or guardian permission if under 18. By accessing our Services, you agree to comply with these Terms and any changes we may implement. We reserve the right to update these Terms periodically.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Use of Services</h5>
                    <p>
                        Our Services are intended for lawful and appropriate use only. You agree to not misuse or abuse the Services, including but not limited to unauthorized access to our systems, hacking, or any form of exploitation. You also agree not to use the Services in any manner that may cause harm to AppDevs, its users, or the general public.
                    </p>
                    <h5 className="text-lg font-semibold my-3">User Accounts and Security</h5>
                    <p>
                        To access certain features, you may be required to create an account. You agree to provide accurate and up-to-date information during registration and maintain the confidentiality of your account credentials. You are responsible for all actions performed under your account, and you agree to notify us of any unauthorized use.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Intellectual Property Rights</h5>
                    <p>
                        All content, materials, software, trademarks, and other assets on our Services are the intellectual property of AppDevs or our licensors. You are granted limited access for personal, non-commercial use only. You may not reproduce, distribute, or create derivative works from any content on our Services without prior written consent from AppDevs.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Payment Terms</h5>
                    <p>
                        Certain Services may require payment. By providing payment details, you confirm that you are authorized to use the provided payment method. All payments are subject to our pricing and payment terms at the time of transaction. We reserve the right to modify fees and will notify you of any changes that impact you.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Termination of Service</h5>
                    <p>
                        We may suspend or terminate your account or access to our Services without notice if you violate these Terms or engage in harmful, illegal, or abusive behavior. You may terminate your account by contacting us, but any fees paid prior to termination are non-refundable, unless stated otherwise in specific terms.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Disclaimer of Warranties</h5>
                    <p>
                        Our Services are provided &quot;as-is&quot; without warranties of any kind, whether express or implied. We do not guarantee that our Services will be error-free, uninterrupted, or free from security vulnerabilities. AppDevs disclaims any implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Limitation of Liability</h5>
                    <p>
                        To the extent permitted by law, AppDevs and its affiliates, directors, employees, and agents will not be liable for any indirect, incidental, punitive, or consequential damages, including loss of profits, data, or goodwill, arising from your use or inability to use our Services.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Privacy Policy</h5>
                    <p>
                        Your privacy is essential to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our Services, you agree to our privacy practices as outlined in our policy.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Amendments and Updates</h5>
                    <p>
                        We may revise these Terms at any time. Any changes will be posted on this page, and we encourage you to review the Terms periodically. If the changes are substantial, we will notify users through our website or other communication methods. Continued use of the Services following any changes constitutes acceptance of the revised Terms.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Governing Law and Jurisdiction</h5>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law principles. You agree that any disputes arising out of or in connection with these Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts located in Dhaka, Bangladesh. By accessing or using our Services, you consent to submit to the jurisdiction of these courts for such matters.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Contact Information</h5>
                    <p>
                        If you have questions, concerns, or need further assistance, please contact us at one of our offices:
                    </p>
                    <p className="mt-3">
                        <strong>UK Office</strong>
                        <br/>
                        71-75 Shelton Street
                        <br/>
                        Covent Garden
                        <br/>
                        London - WC2H 9JQ
                        <br/>
                        London, United Kingdom
                    </p>
                    <p className="mt-3">
                        <strong>Bangladesh Office</strong>
                        <br/>
                        F # F1 (5th Floor), H # 1188
                        <br/>
                        Avenue # 11, Mirpur DOHS
                        <br/>
                        Dhaka, Bangladesh
                    </p>
                    <p className="mt-3">
                        <strong>Email</strong>
                        : contact@appdevs.net
                    </p>
                    <p className="mt-3">We are here to help and will respond to inquiries as promptly as possible.</p>
                </div>
			</div>
		</section>
    );
}