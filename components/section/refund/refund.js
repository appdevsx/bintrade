const sectionHeader = {
    sectionSubTitle: 'Refund Policy',
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
                <h4 className="text-xl md:text-2xl font-bold mb-3">Information Of Refund Policy</h4>
                    <p>
                        At AppDevs, we strive to ensure the satisfaction of our
                        valued customers. We understand that occasionally,
                        circumstances may arise that warrant a refund request.
                        To maintain transparency and uphold our commitment to
                        customer service, we have formulated the following
                        refund policy:
                    </p>
                    <h5 className="text-lg font-semibold my-3">Eligibility for Refund:</h5>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="font-medium text-small__font">
                            Refund requests must be submitted within 3days of
                            the purchase date.
                        </li>
                        <li className="font-medium text-small__font">
                            To be eligible for a refund, the software product
                            must be deemed faulty or not as described.
                        </li>
                        <li className="font-medium text-small__font">
                            Refunds will not be issued for change of mind or if
                            the software has been modified or altered by the
                            customer.
                        </li>
                    </ul>
                    <h5 className="text-lg font-semibold my-3">Refund Process:</h5>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="font-medium text-small__font">
                            Customers must contact our support team to initiate
                            a refund request.
                        </li>
                        <li className="font-medium text-small__font">
                            Upon receipt of the refund request, our team will
                            assess the validity of the claim and investigate the
                            reported issue.
                        </li>
                        <li className="font-medium text-small__font">
                            If the claim is found to be valid and meets the
                            eligibility criteria, a refund will be processed
                            within 14 business days.
                        </li>
                    </ul>
                    <h5 className="text-lg font-semibold my-3">Non-Refundable Items:</h5>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="font-medium text-small__font">
                            Customized or personalized software solutions are
                            non-refundable.
                        </li>
                        <li className="font-medium text-small__font">
                            Services such as installation, customization, or
                            consultancy fees are non-refundable once rendered.
                        </li>
                    </ul>
                    <h5 className="text-lg font-semibold my-3">Chargebacks and Disputes:</h5>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li className="font-medium text-small__font">
                            Initiating a chargeback or dispute without
                            contacting our support team first may result in a
                            suspension of access to our services.
                        </li>
                        <li className="font-medium text-small__font">
                            We encourage customers to reach out to our support
                            team to resolve any issues or concerns promptly and
                            amicably.
                        </li>
                    </ul>
                    <h5 className="text-lg font-semibold my-3">Communication:</h5>
                    <p>
                        Open communication is key to resolving any issues or
                        concerns regarding our products or services. Customers
                        are encouraged to reach out to our support team for
                        assistance.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Exceptions:</h5>
                    <p>
                        Exceptions to this refund policy may be made at the
                        discretion of AppDevs management in exceptional
                        circumstances.
                    </p>
                    <h5 className="text-lg font-semibold my-3">Contact Us:</h5>
                    <p>
                        If you have any questions or concerns regarding our
                        refund policy, please don&apos;t hesitate to contact our
                        support team. We appreciate your trust in AppDevs and
                        are committed to providing you with high-quality
                        software solutions and exceptional customer service.
                        Thank you for choosing AppDevs for your software needs.
                    </p>
                </div>
			</div>
		</section>
    );
}