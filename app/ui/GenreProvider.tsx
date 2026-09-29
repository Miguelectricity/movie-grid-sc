"use client";

import { createContext, useContext } from "react";
import { Genre } from "../lib/schema";

const GenresContext = createContext<Genre[] | null>(null);

type GenresProviderProps = {
    genres: Genre[];
    children: React.ReactNode;
};

export function GenresProvider({ genres, children }: GenresProviderProps) {
    return <GenresContext value={genres}>{children}</GenresContext>;
}

export function useGenres() {
    const genres = useContext(GenresContext);
    if (!genres) throw new Error("useGenres must be used inside <GenresProvider>");
    return genres;
}
