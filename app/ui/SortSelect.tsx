"use client";

import { SortDirection, SortKey, sortLabels, useSort } from "./SortProvider";

export default function SortSelect() {
    const { sortKey, setSortKey, direction, toggleDirection } = useSort();

    return (
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="sortSelect">Sort by</label>
            <select
                id="sortSelect"
                className="rounded-lg bg-gray-800 text-gray-200 p-2"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
            >
                {Object.entries(sortLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
            <button
                type="button"
                onClick={toggleDirection}
                aria-label={direction === SortDirection.ASCENDING ? "Ascending" : "Descending"}
                className="rounded-lg bg-gray-800 text-gray-200 p-2"
            >
                {direction === SortDirection.ASCENDING ? "↑" : "↓"}
            </button>
        </div>
    );
}
