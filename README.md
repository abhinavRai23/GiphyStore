# [GiphyStore](https://abhinavrai23.github.io/GiphyStore/)

GiphyStore is a React app for browsing trending GIFs and searching the Giphy library. It loads GIFs from the Giphy API, displays them in a responsive masonry-style gallery, and opens a larger preview when a GIF is selected.

## What It Does

- Shows trending GIFs by default.
- Searches GIFs by keyword.
- Loads more results as you scroll using the Intersection Observer API.
- Displays GIFs in a custom masonry layout that adapts the number of columns to the screen width.
- Opens a full-screen preview with the original GIF and a still fallback for pause/play behavior.
- Supports light and dark theme toggling.
- Uses debounced API calls so search input does not trigger too many requests.

## Small Details

The gallery is built with a small custom masonry component in `src/ImgGallery/masonry.js`. It calculates the column count from defined breakpoints and distributes GIF tiles across columns, giving the page a Pinterest-like layout without adding a separate masonry dependency.

GIF data fetching lives in `src/useFetch.js`. The hook decides whether to call the trending or search endpoint, handles pagination offsets, and appends new API results to the existing gallery list.

Preview behavior lives in `src/ImgGallery/index.js`. Each tile stores the full GIF and still image URLs as data attributes, so clicking a tile can open a larger preview without another API request.

## Tech Stack

- React
- Create React App
- Axios
- Giphy API
- GitHub Pages deployment

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Then open:

```text
http://localhost:3000/GiphyStore
```

## Build

Create a production build:

```bash
npm run build
```

## Dependencies

- `axios` for API requests.
- `gh-pages` for deploying the built React app to GitHub Pages.
- `husky` for project git hooks.

## Project Structure

```text
src/
  App.js                    Main app shell, search state, theme state, infinite scroll
  apis.js                   Giphy API endpoints and shared query parameters
  useFetch.js               Custom hook for fetching trending/search results
  ImgGallery/               Gallery, masonry layout, and preview modal
  SearchSection/            Search input
  ThemeTogglerButton/       Light/dark theme toggle
```
