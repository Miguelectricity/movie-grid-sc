import { MovieSearchParams } from "@/app/_lib/searchParams";
import { discoverMovies } from "@/app/_lib/tmdb";
import MovieGrid from "@/app/_components/movies/MovieGrid";
import Pagination from "@/app/_components/movies/Pagination";

type MoviesPageProps = {
    params: MovieSearchParams;
};

export default async function MoviesPage({ params }: MoviesPageProps) {
    const { movies, totalPages } = await discoverMovies(params);

    return (
        <>
            <MovieGrid movies={movies} />
            <Pagination params={params} totalPages={totalPages} />
        </>
    );
}
