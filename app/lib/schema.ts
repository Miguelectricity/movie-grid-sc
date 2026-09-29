import { z } from 'zod';

const Genre = z.object({
    id: z.number(),
    name: z.string(),
});
export type Genre = z.infer<typeof Genre>;

const Movie = z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string(),
    overview: z.string(),
    release_date: z.string(),
    vote_average: z.number(),
    genre_ids: z.array(z.number()),
    popularity: z.number(),
});
export type Movie = z.infer<typeof Movie>;

export const GenresApiResponse = z.object({
    genres: z.array(Genre),
});

export const MoviesApiResponse = z.object({
    results: z.array(Movie),
});