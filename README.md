# PreviewFlix

A movie preview browser built with Next.js, TypeScript, Tailwind CSS and Zod, using data from [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Features

- Grid of movies with poster, release year, rating, genres and overview
- Filter by genre
- Filter by minimum number of votes (Any, 100+, 1,000+; defaults to 1,000+)
- Sort by popularity, title, release year or rating, ascending or descending
- Previous/Next pagination
- Hover a poster to see details; keep hovering to play the movie's trailer
- Click somewhere on the page before hovering to enable autoplay of the trailers.

## Requirements

- A modern browser like Chrome, Firefox, Safari, etc.
- Node.js 20.9 or later
- A TMDB API key.

## Setup

1. Install dependencies:

   ```bash
   npm i
   ```

2. Create a file named `.env.local` in the project root with your key:

   ```bash
   TMDB_API_KEY=your-api-key-here
   ```

## Running

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

`npm start` builds the app first (via the `prestart` script), then starts the production server.

Open [http://localhost:3000](http://localhost:3000) in a modern browser (not VSCode browser).

## Project structure

```
app/
  page.tsx                  Home page: parses the URL params, fetches genres
  layout.tsx                Root layout and fonts
  api/trailer/[id]/route.ts Looks up a movie's YouTube trailer on TMDB (keeps the API key on the server)
  lib/schema.ts             Zod schemas for TMDB responses; TypeScript types are inferred from them
  lib/searchParams.ts       Zod schema for the URL params (genre, sort, direction, min votes, page)
  ui/
    MoviesPage.tsx          Server component: fetches one page of movies from TMDB for the current params
    MovieGrid.tsx           Responsive grid of movie cards
    Pagination.tsx          Previous/Next links; keeps the other params
    MovieCard.tsx           Poster with hover overlay
    MovieTrailer.tsx        Fetches and shows the trailer after a short hover
    YouTubeEmbed.tsx        YouTube iframe embed
    TopBar.tsx              Title, filter and sort controls
    GenreSelect.tsx         Genre dropdown
    MinVotesSelect.tsx      Minimum vote count dropdown
    SortSelect.tsx          Sort dropdown and direction toggle
    useSetSearchParam.ts    Changes one URL param, keeps the rest, and resets to page 1
    GenreProvider.tsx       Context: list of genres
    Tag.tsx                 Pill-shaped label used for genres
```

