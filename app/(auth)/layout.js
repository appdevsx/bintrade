import { DM_Sans } from "next/font/google";
import "../globals.css";
import "../global.scss";

const inter = DM_Sans({ subsets: ["latin"] });

export default function AuthLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
			</body>
		</html>
	);
}