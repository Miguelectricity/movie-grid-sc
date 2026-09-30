# PreviewFlix

A movie preview browser built with Next.js, TypeScript, Tailwind CSS and Zod, using data from [The Movie Database (TMDB)](https://www.themoviedb.org/).


- Click somewhere random on the page a few times before hovering to enable autoplay of the trailers (on a modern browser).

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
  page.tsx                    Home page: parses the URL params, fetches genres
  layout.tsx                  Root layout and fonts
  api/trailer/[id]/route.ts   Picks a movie's YouTube trailer (keeps the API key on the server)
  _lib/
    tmdb.ts                   All TMDB requests: genres, movie discovery, movie videos (server-only)
    schema.ts                 Zod schemas for TMDB responses; TypeScript types are inferred from them
    searchParams.ts           Zod schema for the URL params (genre, sort, direction, min votes, page)
  _components/
    filters/
      TopBar.tsx              Title, filter and sort controls
      GenreSelect.tsx         Genre dropdown
      MinVotesSelect.tsx      Minimum vote count dropdown
      SortSelect.tsx          Sort dropdown and direction toggle
      useSetSearchParam.ts    Changes one URL param, keeps the rest, and resets to page 1
    movies/
      MoviesPage.tsx          Server component: loads one page of movies for the current params
      MovieGrid.tsx           Responsive grid of movie cards
      MovieCard.tsx           Poster with hover overlay
      Pagination.tsx          Previous/Next links; keeps the other params
    trailer/
      MovieTrailer.tsx        Fetches and shows the trailer after a short hover
      YouTubeEmbed.tsx        YouTube iframe embed
    shared/
      GenreProvider.tsx       Context: list of genres
      Tag.tsx                 Pill-shaped label used for genres
```

