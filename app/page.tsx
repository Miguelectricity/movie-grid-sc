import { ApiResponse } from "./lib/schema";
import MovieCard from "./ui/MovieCard";

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`
  );
  const data = ApiResponse.parse(await res.json());


  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 m-12">
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </div>
  );
}
