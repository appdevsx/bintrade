import { DM_Sans } from "next/font/google";
import "../globals.css";
import "../global.scss";
import Header from "@/components/common/header/header";
import LiveChat from "@/components/common/liveChat/liveChat";
import Footer from "@/components/common/footer/footer";
import { LanguageProvider } from "@/context/languageProvider/languageProvider";

const inter = DM_Sans({ subsets: ["latin"] });

export default function MainLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<LanguageProvider>
					<Header/>
					<LiveChat />
					{children}
					<Footer/>
				</LanguageProvider>
			</body>
		</html>
	);
}