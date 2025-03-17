import { DM_Sans } from "next/font/google";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "BinTrade | Online Trading Platform",
	description: "Online Trading Platform",
    icons: {
        icon: "/images/logo/favicon.png",
    },
};

// export async function generateMetadata() {
//     try {
//         const res = await fetch(`https://bintrade.rokon.appdevs.team/api/settings/basic-settings?lang=en`, {
//             cache: "no-store",
//         });

//         const data = await res.json();
//         const basicSettings = data?.data?.basic_settings;

//         return {
//             title: basicSettings?.site_title || "BinTrade | Online Trading Platform",
//             description: "Online Trading Platform",
//             icons: {
//                 icon: basicSettings?.fav || "/images/logo/favicon.png",
//             },
//         };
//     } catch (error) {
//         console.error("Failed to fetch metadata:", error);
//     }
// }

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}