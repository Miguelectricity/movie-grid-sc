import { z } from "zod";
import { getMovieVideos, TmdbError } from "@/app/_lib/tmdb";

const MovieId = z.coerce.number().int().positive();

export async function GET(_request: Request, ctx: RouteContext<"/api/trailer/[id]">) {
    const { id } = await ctx.params;

    const parsedId = MovieId.safeParse(id);
    if (!parsedId.success) {
        return Response.json({ error: "Invalid movie id" }, { status: 400 });
    }
    const movieId = parsedId.data;

    let allVideos;
    try {
        allVideos = await getMovieVideos(movieId);
    } catch (error) {
        const status = error instanceof TmdbError && error.status === 404 ? 404 : 502;
        return Response.json({ key: null }, { status });
    }

    const videos = allVideos.filter((video) => video.site === "YouTube");

    const trailer =
        videos.find((video) => video.type === "Trailer" && video.official) ??
        videos.find((video) => video.type === "Trailer") ??
        videos.find((video) => video.type === "Teaser");

    return Response.json({ key: trailer?.key ?? null });
}
