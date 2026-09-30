import { Suspense } from "react";
import { MovieSearchParams } from "@/app/_lib/searchParams";
import { getGenres } from "@/app/_lib/tmdb";
import { GenresProvider } from "@/app/_components/shared/GenreProvider";
import TopBar from "@/app/_components/filters/TopBar";
import MoviesPage from "@/app/_components/movies/MoviesPage";

export type SearchParams = {
  genreId?: string;
  sort?: string;
  dir?: string;
  minVotes?: string;
  page?: string;
};

type HomeProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = MovieSearchParams.parse(await searchParams);

  const genres = await getGenres();

  return (
    <GenresProvider genres={genres}>
      <div className="flex flex-col p-16 bg-gray-900">
        <TopBar />
        <Suspense key={JSON.stringify(params)} fallback={<p className="text-gray-400">Loading movies…</p>}>
          <MoviesPage params={params} />
        </Suspense>
      </div>
    </GenresProvider>
  );
}
