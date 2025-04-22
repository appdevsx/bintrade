import { DM_Sans } from "next/font/google";
import { SettingsProvider } from "@/context/settingsProvider/settingsProvider";
import HeadClient from '@/components/common/headClient/headClient';

const inter = DM_Sans({ subsets: ["latin"] });

// export const metadata = {
//     title: "BinTrade | Online Trading Platform",
// 	description: "Online Trading Platform",
//     icons: {
//         icon: "/images/logo/favicon.png",
//     },
// };

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SettingsProvider>
                    <HeadClient />
                    {children}
                </SettingsProvider>
            </body>
        </html>
    );
}