import Image from "next/image";
import { Movie } from '../lib/schema';

type MovieCardProps = {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div>
            {movie.title}
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
            />

            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                width={500}
                height={750}
            />
        </div>
    );
};