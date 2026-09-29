# MovieFlix

A movie browser built with Next.js (App Router), TypeScript, Tailwind CSS and Zod, using data from [The Movie Database (TMDB)](https://www.themoviedb.org/).

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

   The key is only used on the server and is never sent to the browser. `.env*` files are gitignored.

## Running

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in a modern browser (not VSCode browser).

## Project structure

```
app/
  page.tsx                  Home page: reads ?genreId, fetches genres, sets up providers
  layout.tsx                Root layout and fonts
  api/trailer/[id]/route.ts Looks up a movie's YouTube trailer on TMDB (keeps the API key on the server)
  lib/schema.ts             Zod schemas for TMDB responses; TypeScript types are inferred from them
  ui/
    MoviesPage.tsx          Server component: fetches movies for the selected genre
    MovieGrid.tsx           Responsive grid; applies the current sort
    MovieCard.tsx           Poster with hover overlay
    MovieTrailer.tsx        Fetches and shows the trailer after a short hover
    YouTubeEmbed.tsx        YouTube iframe embed
    TopBar.tsx              Title, genre filter and sort controls
    GenreSelect.tsx         Genre dropdown; updates the URL
    SortSelect.tsx          Sort dropdown and direction toggle
    GenreProvider.tsx       Context: list of genres
    SortProvider.tsx        Context: current sort key and direction
    Tag.tsx                 Pill-shaped label used for genres
```

## Notes
- **Sorting** I wanted to note that on a production app, sorting at the database level is the practice I would normally go with given a high number of items. I made the product decision (given that it was allowed in the requirements) to do client-side rendering given the scope of this project. Additional complexity would be introduced if we passed sorting to url/request because obscure videos with low popularity may be displayed, among other things.
