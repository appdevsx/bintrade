import Banner from "@/components/section/banner/banner";
import Feature from "@/components/section/feature/feature";
import Brand from "@/components/section/brand/brand";
import Step from "@/components/section/step/step";
import Choose from "@/components/section/choose/choose";
import DownloadApp from "@/components/section/downloadApp/downloadApp";
export default function Home() {
  	return (
		<>
			<Banner />
			<Feature/>
			<Brand/>
			<Step/>
			<Choose/>
			<DownloadApp/>
		</>
  	);
}