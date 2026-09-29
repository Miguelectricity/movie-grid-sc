import Image from "next/image";
import { Movie } from '../lib/schema';
import Tag from "./Tag";

type MovieCardProps = {
    movie: Movie;
    genresMap: Map<number, string>;
}

export default function MovieCard({ movie, genresMap }: MovieCardProps) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-lg p-2">
            <div className="group relative hover:z-10 hover:scale-125 transition-transform duration-500">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="aspect-[2/3] rounded-lg"
                />
                

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:delay-200 duration-500 bg-black/80 p-2 rounded-lg text-white text-sm gap-4">
                    <p>{movie.release_date.slice(0,4)}</p>
                    <p>★ {movie.vote_average.toFixed(1)}</p>
                    <div className="flex flex-wrap gap-1 py-2">
                        {movie.genre_ids.map((genreId) => (
                            <Tag key={genreId}>{genresMap.get(genreId)}</Tag>
                        ))}
                    </div>
                    <p className="line-clamp-7">{movie.overview}</p>
                </div>
            </div>
            <h2 className="text-center text-gray-300">{movie.title}</h2>
        </div>
    );
}

/**
 * 
 * 
 */