"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useSetSearchParam() {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (name: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set(name, value);
        else params.delete(name);

        params.delete("page"); // a new filter or sort starts again at page 1
        router.push(`/?${params}`);
    };
}
