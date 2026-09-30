import { MoviesApiResponse } from "../lib/schema";
import { MAX_TMDB_PAGE, MovieSearchParams, tmdbSortField } from "../lib/searchParams";
import MovieGrid from "./MovieGrid";
import Pagination from "./Pagination";

type MoviesPageProps = {
    params: MovieSearchParams;
};

export default async function MoviesPage({ params }: MoviesPageProps) {
    const query = new URLSearchParams({
        api_key: process.env.TMDB_API_KEY ?? "",
        sort_by: `${tmdbSortField[params.sort]}.${params.dir}`,
        page: String(params.page),
    });
    
    if (params.genreId) {
        query.set("with_genres", String(params.genreId));
    }
    if (params.minVotes > 0) {
        query.set("vote_count.gte", String(params.minVotes));
    }

    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?${query}`);
    const data = MoviesApiResponse.parse(await res.json());
    const totalPages = Math.min(data.total_pages, MAX_TMDB_PAGE);

    return (
        <>
            <MovieGrid movies={data.results} />
            <Pagination params={params} totalPages={totalPages} />
        </>
    );
}
