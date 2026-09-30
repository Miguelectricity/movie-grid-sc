"use client";

import { useMemo } from "react";
import { Movie } from "../lib/schema";
import { useGenres } from "./GenreProvider";
import MovieCard from "./MovieCard";

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

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    genresMap={genresMap}
                />
            ))}
        </div>
    );
}