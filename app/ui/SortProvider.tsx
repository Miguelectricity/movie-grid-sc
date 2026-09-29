"use client";

import { createContext, useContext, useState } from "react";

export type SortKey = "popularity" | "title" | "year" | "rating";
export enum SortDirection {
    ASCENDING = 'ASCENDING',
    DESCENDING = 'DESCENDING',
}

export const sortLabels: Record<SortKey, string> = {
    popularity: "Popularity",
    title: "Title",
    year: "Release year",
    rating: "Rating",
};

type SortContextValue = {
    sortKey: SortKey;
    setSortKey: (key: SortKey) => void;
    direction: SortDirection;
    toggleDirection: () => void;
};

const SortContext = createContext<SortContextValue | null>(null);

export function SortProvider({ children }: { children: React.ReactNode }) {
    const [sortKey, setSortKey] = useState<SortKey>("popularity");
    const [direction, setDirection] = useState<SortDirection>(SortDirection.DESCENDING);

    const toggleDirection = () =>
        setDirection((direction) => (direction === SortDirection.ASCENDING ? SortDirection.DESCENDING : SortDirection.ASCENDING));

    return (
        <SortContext value={{ sortKey, setSortKey, direction, toggleDirection }}>
            {children}
        </SortContext>
    );
}

export function useSort() {
    const ctx = useContext(SortContext);
    if (!ctx) throw new Error("useSort must be used inside <SortProvider>");
    return ctx;
}
