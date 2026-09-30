import { Suspense } from "react";
import GenreSelect from "@/app/_components/filters/GenreSelect";
import MinVotesSelect from "@/app/_components/filters/MinVotesSelect";
import SortSelect from "@/app/_components/filters/SortSelect";


export default function TopBar() {
    return (
        <div className="flex flex-row justify-between text-gray-300 items-center px-4 pb-8">
            <h1 className="font-bold text-xl">PreviewFlix</h1>
            <div className="flex flex-row gap-2 items-center">
                <label htmlFor="genreSelect">Genre: </label>
                <Suspense>
                    <GenreSelect />
                </Suspense>
            </div>
            <Suspense>
                <MinVotesSelect />
            </Suspense>
            <Suspense>
                <SortSelect />
            </Suspense>
        </div>
    );
}
