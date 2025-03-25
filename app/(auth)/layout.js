import { DM_Sans } from "next/font/google";
import "../globals.css";
import "../global.scss";
import { LanguageProvider } from "@/context/languageProvider/languageProvider";

const inter = DM_Sans({ subsets: ["latin"] });

export default function AuthLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<LanguageProvider>
					{children}
				</LanguageProvider>
			</body>
		</html>
	);
}