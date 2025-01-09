import { DM_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer/footer";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata = {
	title: "BinTrade | Online Trading Platform",
	description: "Online Trading Platform",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header/>
				{children}
				<Footer/>
			</body>
		</html>
	);
}