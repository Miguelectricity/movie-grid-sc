"use client";

import Image from "next/image";
import { useState } from "react";
import { Movie } from "@/app/_lib/schema";
import MovieTrailer from "@/app/_components/trailer/MovieTrailer";
import Tag from "@/app/_components/shared/Tag";

type MovieCardProps = {
    movie: Movie;
    genresMap: Map<number, string>;
}

export default function MovieCard({ movie, genresMap }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-col items-center gap-2 rounded-lg p-2">
            <div
                className="group relative w-full max-w-[500px] hover:z-10 hover:scale-135 transition-transform duration-500"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {movie.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={500}
                        height={750}
                        className="w-full aspect-[2/3] rounded-lg"
                    />
                ) : (
                    <div className="w-full aspect-[2/3] rounded-lg bg-gray-800 flex items-center justify-center p-4 text-center text-gray-400">
                        No poster
                    </div>
                )}


                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:delay-200 duration-500 bg-black/80 p-2 rounded-lg text-white text-sm gap-4">
                    
                    {isHovered && <MovieTrailer movieId={movie.id} title={movie.title} />}
                    
                    <div className="flex flex-row justify-between p-1">
                        <p>{movie.release_date.slice(0,4)}</p>
                        <p>★ {movie.vote_average.toFixed(1)}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 py-2">
                        {movie.genre_ids.map((genreId) => (
                            <Tag key={genreId}>{genresMap.get(genreId)}</Tag>
                        ))}
                    </div>
                    <p className="line-clamp-6">{movie.overview}</p>
                </div>
            </div>
            <h2 className="text-center text-gray-300">{movie.title}</h2>
        </div>
    );
}
