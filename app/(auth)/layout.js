import { DM_Sans } from "next/font/google";
import "../globals.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata = {
	title: "BinTrade | Online Trading Platform",
	description: "Online Trading Platform",
};

export default function AuthLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
			</body>
		</html>
	);
}