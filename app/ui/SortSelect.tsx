"use client";

import { useSearchParams } from "next/navigation";
import { MovieSearchParams, SortDirection, sortLabels } from "../lib/searchParams";
import { useSetSearchParam } from "./useSetSearchParam";

export default function SortSelect() {
    const searchParams = useSearchParams();
    const setSearchParam = useSetSearchParam();
    const { sort, dir } = MovieSearchParams.parse(Object.fromEntries(searchParams));

    return (
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="sortSelect">Sort by</label>
            <select
                id="sortSelect"
                key={sort}
                defaultValue={sort}
                onChange={(e) => setSearchParam("sort", e.target.value)}
                className="rounded-lg bg-gray-800 text-gray-200 p-2"
            >
                {Object.entries(sortLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
            <button
                type="button"
                onClick={() => setSearchParam("dir", dir === SortDirection.ASCENDING ? SortDirection.DESCENDING : SortDirection.ASCENDING)}
                aria-label={dir === SortDirection.ASCENDING ? "Ascending" : "Descending"}
                className="rounded-lg bg-gray-800 text-gray-200 p-2"
            >
                {dir === SortDirection.ASCENDING ? "↑" : "↓"}
            </button>
        </div>
    );
}
