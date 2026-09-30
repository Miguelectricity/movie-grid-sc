import { z } from "zod";

export const SORT_KEYS = ["popularity", "title", "year", "rating"] as const;
export type SortKey = (typeof SORT_KEYS)[number];

// Values match TMDB's sort_by suffix (e.g. vote_average.asc), so they go into the URL and the request as-is.
export enum SortDirection {
    ASCENDING = "asc",
    DESCENDING = "desc",
}

export const MAX_TMDB_PAGE = 500;

export const MovieSearchParams = z.object({
    genreId: z.coerce.number().int().positive().optional().catch(undefined),
    sort: z.enum(SORT_KEYS).catch("popularity"),
    dir: z.enum(SortDirection).catch(SortDirection.DESCENDING),
    minVotes: z.coerce.number().int().min(0).catch(0),
    page: z.coerce.number().int().min(1).max(MAX_TMDB_PAGE).catch(1),
});
export type MovieSearchParams = z.infer<typeof MovieSearchParams>;

export const sortLabels: Record<SortKey, string> = {
    popularity: "Popularity",
    title: "Title",
    year: "Release year",
    rating: "Rating",
};

export const tmdbSortField: Record<SortKey, string> = {
    popularity: "popularity",
    title: "title",
    year: "primary_release_date",
    rating: "vote_average",
};
