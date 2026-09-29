import { z } from 'zod';

const Movie = z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string(),
    backdrop_path: z.string(),
});

export type Movie = z.infer<typeof Movie>;

export const ApiResponse = z.object({
    results: z.array(Movie),
});