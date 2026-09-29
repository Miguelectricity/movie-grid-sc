import { MoviesApiResponse } from "../lib/schema";
import MovieGrid from "./MovieGrid";

type MoviesPageProps = {
  genreId?: string;
};

export default async function MoviesPage({ genreId }: MoviesPageProps) {
    const genreQueryFilter = genreId ? `&with_genres=${encodeURIComponent(genreId)}` : '';
    const moviesRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}${genreQueryFilter}`);
    
    const movies = MoviesApiResponse.parse(await moviesRes.json()).results;
    return (
        <MovieGrid movies={movies}/>
    );
}