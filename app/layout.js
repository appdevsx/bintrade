import { DM_Sans } from "next/font/google";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata = {
    icons: {
        icon: "/images/logo/favicon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}