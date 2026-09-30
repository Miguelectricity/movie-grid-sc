"use client";

import { useSearchParams } from "next/navigation";
import { MovieSearchParams } from "@/app/_lib/searchParams";
import { useSetSearchParam } from "@/app/_components/filters/useSetSearchParam";

// TMDB has no popularity filter, so a minimum vote count stands in for it.
const MIN_VOTES_OPTIONS = [
    { value: "0", label: "Any" },
    { value: "100", label: "100+" },
    { value: "1000", label: "1,000+" },
];

export default function MinVotesSelect() {
    const searchParams = useSearchParams();
    const setSearchParam = useSetSearchParam();
    const { minVotes } = MovieSearchParams.parse(Object.fromEntries(searchParams));
    const selected = String(minVotes);

    return (
        <div className="flex flex-row gap-2 items-center">
            <label htmlFor="minVotesSelect">Min votes</label>
            <select
                id="minVotesSelect"
                key={selected}
                defaultValue={selected}
                onChange={(e) => setSearchParam("minVotes", e.target.value)}
                className="rounded-lg bg-gray-800 text-gray-200 p-2"
            >
                {MIN_VOTES_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
