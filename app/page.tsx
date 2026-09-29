import { Suspense } from "react";
import { GenresApiResponse } from "./lib/schema";
import { GenresProvider } from "./ui/GenreProvider";
import { SortProvider } from "./ui/SortProvider";
import TopBar from "./ui/TopBar";
import MoviesPage from "./ui/MoviesPage";

export type SearchParams = {
  genreId?: string;
};

type HomeProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { genreId } = await searchParams;

  const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);
  const genres = GenresApiResponse.parse(await genresRes.json()).genres;

  return (
    <GenresProvider genres={genres}>
      <SortProvider>
        <div className="flex flex-col p-12 bg-gray-900">
          <TopBar />
          <Suspense>
            <MoviesPage genreId={genreId}/>
          </Suspense>
        </div>
      </SortProvider>
    </GenresProvider>
  );
}
