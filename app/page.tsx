import { ApiResponse } from "./lib/schema";
import MovieCard from "./ui/MovieCard";

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`
  );
  const data = ApiResponse.parse(await res.json());


  return (
    <ul>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </ul>
  );
}
