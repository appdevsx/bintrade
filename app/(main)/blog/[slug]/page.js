import BlogDetails from "@/components/section/blogDetails/blogDetails";
import { getBlogsAPI } from "@/services/apiClient/apiClient";

export async function generateStaticParams() {
    let allSlugs = [];
    let currentPage = 1;

    try {
        while (true) {
            const response = await getBlogsAPI();
            const blogs = response?.data?.data?.journals?.data;

            if (!blogs || blogs.length === 0) {
                break;
            }

            const slugs = blogs.map((post) => post.slug);
            allSlugs = [...allSlugs, ...slugs];

            const totalPages = response?.data?.data?.journals?.last_page;
            if (currentPage >= totalPages) {
                break;
            }

            currentPage++;
        }

        return allSlugs.map((slug) => ({
            slug,
        }));
    } catch (error) {
        return [];
    }
}

export default function BlogPage({ params }) {
    return (
        <div>
            <BlogDetails slug={params.slug} />
        </div>
    );
};