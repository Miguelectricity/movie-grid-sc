"use client";

import { Movie } from "../lib/schema";
import MovieCard from "./MovieCard";

type MovieGridProps = {
    movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
}