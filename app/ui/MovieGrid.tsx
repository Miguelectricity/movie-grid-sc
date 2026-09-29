"use client";

import { useMemo } from "react";
import { Movie } from "../lib/schema";
import { useGenres } from "./GenreProvider";
import MovieCard from "./MovieCard";
import { SortDirection, SortKey, useSort } from "./SortProvider";

const compare: Record<SortKey, (a: Movie, b: Movie) => number> = {
    popularity: (a, b) => a.popularity - b.popularity,
    title: (a, b) => a.title.localeCompare(b.title),
    year: (a, b) => a.release_date.localeCompare(b.release_date),
    rating: (a, b) => a.vote_average - b.vote_average,
};

type MovieGridProps = {
    movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    const genres = useGenres();
    const genresMap = useMemo(() => {

        const map = new Map<number, string>();
        for (const genre of genres) {
            map.set(genre.id, genre.name);
        }

        return map;
    }, [genres]);

    const { sortKey, direction } = useSort();
    const sign = direction === SortDirection.ASCENDING ? 1 : -1;
    const sortedMovies = movies.toSorted((a, b) => compare[sortKey](a, b) * sign);

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {sortedMovies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    genresMap={genresMap}
                />
            ))}
        </div>
    );
}