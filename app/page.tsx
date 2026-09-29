import Image from "next/image";
import { ApiResponse } from "./lib/schema";

export default async function Home() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`
  );
  const data = ApiResponse.parse(await res.json());


  return (
    <ul>
      {data.results.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
