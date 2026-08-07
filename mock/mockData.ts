export const TMDB_SEARCH_URL_TV = "https://api.themoviedb.org/3/search/tv";
export const TMDB_SEARCH_URL_MOVIE =
  "https://api.themoviedb.org/3/search/movie";
export const TMDB_SEARCH_URL_PERSON =
  "https://api.themoviedb.org/3/search/person";
export const TMDB_SEARCH_URL_SIMPLE =
  "https://api.themoviedb.org/3/search/keyword";
export const TMDB_POPULAR_URL = "https://api.themoviedb.org/3/movie/popular";
export const TMDB_DISCOVER_URL_MOVIE =
  "https://api.themoviedb.org/3/discover/movie";
export const TMDB_DISCOVER_URL_NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing`;

export const mockTV = [
  {
    id: 1,
    name: "Breaking Bad",
    poster_path: null,
    first_air_date: "2008-01-20",
    overview:
      "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost",
  },
  {
    id: 2,
    name: "House of the Dragon",
    poster_path: null,
    first_air_date: "2022-08-21",
    overview:
      "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by",
  },
];

export const mockMovies = [
  {
    id: 1,
    title: "Scary Movie",
    poster_path: null,
    release_date: "2024-03-01",
    overview:
      "Twenty-six years after outrunning a suspiciously familiar masked killer, the Core Four are back in the killer's crosshairs and no horror movie IP is safe.",
  },
  {
    id: 2,
    title: "Obsession",
    poster_path: null,
    release_date: "2023-07-21",
    overview:
      "After breaking the mysterious One Wish Willow to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.",
  },
  {
    id: 3,
    title: "Scary Movie",
    poster_path: null,
    release_date: "2024-03-01",
    overview:
      "Twenty-six years after outrunning a suspiciously familiar masked killer, the Core Four are back in the killer's crosshairs and no horror movie IP is safe.",
  },
  {
    id: 4,
    title: "Obsession",
    poster_path: null,
    release_date: "2023-07-21",
    overview:
      "After breaking the mysterious One Wish Willow to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.",
  },
];

export const mockGenres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
];

export const mockPeople = [
  {
    id: 1,
    name: "Anna Smith",
    known_for_department: "Acting",
    profile_path: null,
    known_for: [],
  },
  {
    id: 2,
    name: "John Doe",
    known_for_department: "Directing",
    profile_path: null,
    known_for: [],
  },
];

export const mockSimpleItems = [
  { id: 1, name: "Time Travel" },
  { id: 2, name: "Superhero" },
];
