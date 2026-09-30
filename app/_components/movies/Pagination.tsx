import Link from "next/link";
import { MovieSearchParams } from "@/app/_lib/searchParams";

type PaginationProps = {
    params: MovieSearchParams;
    totalPages: number;
};

export default function Pagination({ params, totalPages }: PaginationProps) {
    const hrefForPage = (page: number) => {
        const query = new URLSearchParams();

        if (params.genreId) {
            query.set("genreId", String(params.genreId));
        }

        query.set("sort", params.sort);
        query.set("dir", params.dir);

        query.set("minVotes", String(params.minVotes));

        query.set("page", String(page));

        return `/?${query}`;
    };

    const { page } = params;
    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-4 py-8 text-gray-300">
        
        {hasPreviousPage && (
            <Link href={hrefForPage(page - 1)}>← Previous</Link>
        )}

        <span>Page {page} of {totalPages}</span>

        {hasNextPage && (
            <Link href={hrefForPage(page + 1)}>Next →</Link>
        )}
        
    </nav>
);

}
