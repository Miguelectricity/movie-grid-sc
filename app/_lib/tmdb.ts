import "server-only";

import { GenresApiResponse, MoviesApiResponse, VideosApiResponse } from "@/app/_lib/schema";
import { MAX_TMDB_PAGE, MovieSearchParams, tmdbSortField } from "@/app/_lib/searchParams";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export class TmdbError extends Error {
    constructor(public status: number) {
        super(`TMDB request failed with status ${status}`);
    }
}

async function tmdbFetch(path: string, params: Record<string, string> = {}) {
    const query = new URLSearchParams({ api_key: process.env.TMDB_API_KEY ?? "", ...params });
    const res = await fetch(`${TMDB_BASE_URL}${path}?${query}`);
    if (!res.ok) {
        throw new TmdbError(res.status);
    }
    
    return res.json();
}

export async function getGenres() {
    const data = await tmdbFetch("/genre/movie/list");
    return GenresApiResponse.parse(data).genres;
}

export async function discoverMovies(params: MovieSearchParams) {
    const query: Record<string, string> = {
        sort_by: `${tmdbSortField[params.sort]}.${params.dir}`,
        page: String(params.page),
    };

    if (params.genreId) {
        query.with_genres = String(params.genreId);
    }

    if (params.minVotes > 0) {
        query["vote_count.gte"] = String(params.minVotes);
    }

    const data = MoviesApiResponse.parse(await tmdbFetch("/discover/movie", query));
    return {
        movies: data.results,
        // TMDB reports more pages than it serves; requests past page 500 fail.
        totalPages: Math.min(data.total_pages, MAX_TMDB_PAGE),
    };
}

export async function getMovieVideos(movieId: number) {
    const data = await tmdbFetch(`/movie/${movieId}/videos`, { language: "en-US" });
    return VideosApiResponse.parse(data).results;
}
