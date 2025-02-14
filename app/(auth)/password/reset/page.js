import { Suspense } from "react";
import Reset from "@/components/section/reset/reset";
import { LoaderCircle } from 'lucide-react';

export default function ResetPage() {
    return (
        <Suspense fallback={
            <div className="h-screen w-screen absolute top-0 left-0 flex items-center justify-center bg-white__color z-[999]">
                <LoaderCircle className="inline-block w-10 h-auto animate-spin text-white" />
            </div>
        }>
            <Reset />
        </Suspense>
    );
}