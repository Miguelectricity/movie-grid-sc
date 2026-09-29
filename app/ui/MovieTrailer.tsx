"use client";

import { useEffect, useState } from "react";
import { TrailerResponse } from "../lib/schema";
import YouTubeEmbed from "./YouTubeEmbed";

const HOVER_DELAY_MS = 600;

async function getTrailerKey(movieId: number): Promise<string | null> {
    try {
        const res = await fetch(`/api/trailer/${movieId}`);
        if (!res.ok) return null;

        const { key } = TrailerResponse.parse(await res.json());
        return key;
    } catch {
        return null;
    }
}

type MovieTrailerProps = {
    movieId: number;
    title: string;
};

export default function MovieTrailer({ movieId, title }: MovieTrailerProps) {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setTrailerKey(await getTrailerKey(movieId));
        }, HOVER_DELAY_MS);

        return () => clearTimeout(timer);
    }, [movieId]);

    if (!trailerKey) return null;

    return (
        <div className="pointer-events-none">
            <YouTubeEmbed videoId={trailerKey} title={`${title} trailer`} />
        </div>
    );
}
