const sectionHeader = {
    sectionSubTitle: 'Privacy Policy',
    sectionTitleLeft: 'The',
    sectionTitleMain: 'Policy',
    sectionTitleRight: 'we maintain is specifically rulled for meet your needs.',
    sectionDescription: 'In the rest of this article, we discuss how to set up your payments strategy to optimize every transaction.',
}

export default function Privacy() {
    return (
		<section className="privacy-section py-20">
            <div className="custom-container">
                <div className="section-header-wrapper grid grid-cols-1 md:grid-cols-6 mb-10">
                    <div className="section-header text-center col-span-4 col-start-2">
                        <span className="section-sub-title font-semibold border border-slate-800 text-sm rounded-full py-0.5 px-4 inline-block mb-3.5">{sectionHeader.sectionSubTitle}</span>
                        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-medium capitalize">{sectionHeader.sectionTitleLeft} <span className="font-extrabold text--base">{sectionHeader.sectionTitleMain}</span> {sectionHeader.sectionTitleRight}</h2>
                        <p className="mt-3.5 text-base">{sectionHeader.sectionDescription}</p>
                    </div>
                </div>
                <div className="section--bg border border-slate-800 py-8 sm:py-10 lg:py-14 px-5 sm:px-8 lg:px-10 rounded-[8px]">
                    <h4 className="text-xl md:text-2xl font-bold mb-3">Information Of Our Policy</h4>
                    <p>
                        At AppDevs, we are committed to protecting the privacy
                        and security of our user&apos;s personal information.
                        This Privacy Policy outlines how we collect, use, and
                        safeguard the information you provide to us when using
                        our website and services.
                    </p>
                    <h5 className="text-lg font-semibold my-3">1. Information We Collect</h5>
                    <p>
                        <strong>Personal Information:</strong> We may collect
                        personal information such as your name, email address,
                        phone number, and billing information when you register
                        an account, make a purchase, or communicate with us.
                    </p>
                    <p className="my-3">
                        <strong>Usage Information:</strong> We collect
                        information about how you interact with our website and
                        services, including your IP address, browser type,
                        device information, and pages visited.
                    </p>
                    <h5 className="my-3">2. How We Use Your Information</h5>
                    <p>
                        <strong>To Provide Services:</strong> We use the
                        information collected to deliver the products and
                        services you have requested, including processing
                        transactions, providing customer support, and managing
                        your account.
                    </p>
                    <p className="my-3">
                        <strong>To Improve Our Services:</strong> We may use the
                        information to analyze trends, monitor usage patterns,
                        and enhance the functionality and performance of our
                        website and services.
                    </p>
                    <p>
                        <strong>To Communicate With You:</strong> We may send
                        you important updates, notifications, and promotional
                        materials related to our products and services. You can
                        opt out of receiving marketing communications at any
                        time.
                    </p>
                    <h5 className="text-lg font-semibold my-3">3. Information Sharing</h5>
                    <p>
                        <strong>Third-Party Service Providers:</strong> We may
                        share your information with trusted third-party service
                        providers who assist us in delivering our products and
                        services. These providers are contractually obligated to
                        protect your information and only use it for the
                        purposes outlined in our Privacy Policy.
                    </p>
                    <p className="my-3">
                        <strong>Legal Compliance:</strong> We may disclose your
                        information when required by law or in response to
                        lawful requests from government authorities or law
                        enforcement agencies.
                    </p>
                    <h5 className="text-lg font-semibold my-3">4. Data Security:</h5>
                    <p>
                        We implement industry-standard security measures to
                        protect your personal information from unauthorized
                        access, disclosure, alteration, or destruction.
                    </p>
                    <h5 className="text-lg font-semibold my-3">5. Your Choices:</h5>
                    <p>
                        You have the right to access, update, or delete your
                        personal information. You can manage your account
                        settings and preferences through our website or by
                        contacting our support team.
                    </p>
                    <h5 className="text-lg font-semibold my-3">6. Children&apos;s Privacy:</h5>
                    <p>
                        Our website and services are not intended for use by
                        individuals under the age of 18. We do not knowingly
                        collect personal information from children under the age
                        of 18 without parental consent.
                    </p>
                    <h5 className="text-lg font-semibold my-3">7. Changes to This Privacy Policy:</h5>
                    <p>
                        We reserve the right to update or modify this Privacy
                        Policy at any time. We will notify you of any changes by
                        posting the revised policy on our website.
                    </p>
                    <h5 className="text-lg font-semibold my-3">8. Contact Us:</h5>
                    <p>
                        If you have any questions or concerns regarding our
                        Privacy Policy, please contact us.
                    </p>
                </div>
			</div>
		</section>
    );
}