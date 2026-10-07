export const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";
export const tmbBackdropUrl = "https://image.tmdb.org/t/p/w1280";

export const mockShowcaseMovies = [
  { id: 1, title: "Scary Movie", url: "", date: "2024-03-01" },
  { id: 2, title: "Obsession", url: "", date: "2023-07-21" },
  { id: 3, title: "Scary Movie", url: "", date: "2024-03-01" },
  { id: 4, title: "Obsession", url: "", date: "2023-07-21" },
];

export const mockShowcaseData = {
  streaming: mockShowcaseMovies,
  rent: mockShowcaseMovies,
  theater: mockShowcaseMovies,
};

export const mockSearchTV = {
  kind: "media",
  movies: [
    {
      id: 1,
      title: "Breaking Bad",
      url: "",
      date: "2008-01-20",
      description:
        "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live.",
    },
    {
      id: 2,
      title: "House of the Dragon",
      url: "",
      date: "2022-08-21",
      description:
        "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke.",
    },
  ],
  totalPages: 3,
};

export const mockSearchMovies = {
  kind: "media",
  movies: [
    {
      id: 1,
      title: "Scary Movie",
      url: "",
      date: "2024-03-01",
      description:
        "Twenty-six years after outrunning a suspiciously familiar masked killer, the Core Four are back in the killer's crosshairs.",
    },
    {
      id: 2,
      title: "Obsession",
      url: "",
      date: "2023-07-21",
      description:
        "After breaking the mysterious One Wish Willow to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for.",
    },
  ],
  totalPages: 3,
};

export const mockSearchPeople = {
  kind: "person",
  people: [
    {
      id: 1,
      name: "Anna Smith",
      department: "Acting",
      profileImg: "",
      known_for: ["Movie name"],
    },
    {
      id: 2,
      name: "John Doe",
      department: "Directing",
      profileImg: "",
      known_for: ["Movie name"],
    },
  ],
  totalPages: 3,
};

export const mockSearchSimpleItems = {
  kind: "simple",
  items: [
    { id: 1, name: "Time Travel" },
    { id: 2, name: "Superhero" },
  ],
  totalPages: 1,
};

export const mockMovieList = [
  { id: 1, title: "Interstellar" },
  { id: 2, title: "Inception" },
  { id: 3, title: "The Dark Knight" },
];
