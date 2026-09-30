import { Suspense } from "react";
import { GenresApiResponse } from "./lib/schema";
import { MovieSearchParams } from "./lib/searchParams";
import { GenresProvider } from "./ui/GenreProvider";
import TopBar from "./ui/TopBar";
import MoviesPage from "./ui/MoviesPage";

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

  const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
  const genres = GenresApiResponse.parse(await genresRes.json()).genres;

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
