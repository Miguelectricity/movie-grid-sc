import { z } from "zod";
import { VideosApiResponse } from "@/app/lib/schema";

const MovieId = z.coerce.number().int().positive();

export async function GET(_request: Request, ctx: RouteContext<"/api/trailer/[id]">) {
    const { id } = await ctx.params;

    const parsedId = MovieId.safeParse(id);
    if (!parsedId.success) {
        return Response.json({ error: "Invalid movie id" }, { status: 400 });
    }
    const movieId = parsedId.data;

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    if (!res.ok) {
        return Response.json({ key: null }, { status: res.status === 404 ? 404 : 502 });
    }

    const videos = VideosApiResponse
        .parse(await res.json())
        .results
        .filter((video) => video.site === "YouTube");

    const trailer =
        videos.find((video) => video.type === "Trailer" && video.official) ??
        videos.find((video) => video.type === "Trailer") ??
        videos.find((video) => video.type === "Teaser");

    return Response.json({ key: trailer?.key ?? null });
}
