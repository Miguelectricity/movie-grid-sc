"use client";

import { useSearchParams } from "next/navigation";
import { useGenres } from "./GenreProvider";
import { useSetSearchParam } from "./useSetSearchParam";

export default function GenreSelect() {
    const genres = useGenres();
    const searchParams = useSearchParams();
    const setSearchParam = useSetSearchParam();
    const selectedGenreId = searchParams.get('genreId') ?? '';

    return (
        <select
            id="genreSelect"
            key={selectedGenreId}
            defaultValue={selectedGenreId}
            onChange={(e) => setSearchParam("genreId", e.target.value || null)}
            className="rounded-lg bg-gray-800 text-gray-200 p-2"
        >
            <option value="">All</option>
            {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
        </select>
    );
}
