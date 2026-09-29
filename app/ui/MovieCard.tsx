import Image from "next/image";
import { Movie } from '../lib/schema';

type MovieCardProps = {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="flex flex-col items-center gap-2  rounded-lg p-2">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="aspect-[2/3] rounded-lg"
            />
            <h2 className="text-center">{movie.title}</h2>
        </div>
    );
};