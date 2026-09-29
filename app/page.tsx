import { ApiResponse } from "./lib/schema";
import MovieCard from "./ui/MovieCard";
import MovieGrid from "./ui/MovieGrid";

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`
  );
  const moviesData = ApiResponse.parse(await res.json());


  return (
    <div className="flex flex-col p-12 bg-gray-900">
      <MovieGrid movies={moviesData.results}/>
    </div>
  );
}
