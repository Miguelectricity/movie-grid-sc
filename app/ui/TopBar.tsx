import { Suspense } from "react";
import GenreSelect from "./GenreSelect";


export default function TopBar() {
    return (
        <div className="flex flex-row justify-between text-gray-300 items-center px-4 pb-8">
            <h1 className="font-bold text-xl">MovieFlix</h1>
            <div className="flex flex-row gap-2 items-center">
                <label htmlFor="genreSelect">Filter by: </label>
                <Suspense>
                    <GenreSelect />
                </Suspense>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <label htmlFor="sortSelect">Sort by</label>
                <select 
                    id="sortSelect" 
                    className="rounded-lg bg-gray-800 text-gray-200 p-2" 
                    defaultValue={'popularity'}
                >
                    <option value="popularity">Popularity</option>
                    <option value="title">Title</option>
                    <option value="year">Release year</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
        </div>
    );
}