"use client";

import { useSearchParams } from "next/navigation";
import { useGenres } from "./GenreProvider";
import { useRouter } from "next/navigation";

export default function GenreSelect() {
    const router = useRouter();
    const genres = useGenres();
    const searchParams = useSearchParams();
    const selectedGenreId = searchParams.get('genreId') ?? '';

    return (
        <select
            id="genreSelect"
            key={selectedGenreId}
            defaultValue={selectedGenreId}
            onChange={(e) => {
                const id = e.target.value;
                router.push(id ? `/?genreId=${id}` : "/");
            }}
            className="rounded-lg bg-gray-800 text-gray-200 p-2"
        >
            <option value="">All</option>
            {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
        </select>
    );
}