export interface User {
  id: string;
  name: string;
  username: string;
  sessionId: string;
  region?: string | null;
}

export interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

export interface Movie {
  id: number;
  title: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string | null;
  popularity?: number | null;
  trailer: Video | null;
  isAdult?: boolean | null;
  budget?: number | null;
  revenue?: number | null;
  runtime?: number | null;
  tagline?: string | null;
  status?: string | null;
  homepage?: string | null;
  original_language?: string | null;
  original_title?: string | null;
  genres?: Genre[] | null;
  production_companies?: ProductionCompany[] | null;
  production_countries?: ProductionCountry[] | null;
  spoken_languages?: SpokenLanguage[] | null;
  videos?: VideoResults | null;
  cast?: People[] | null;
  credits?: Credits | null;
  watchProviders?: WatchProviders | null; 
}

interface TVShow {
  id: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  fullBackdropPath?: string | null;
  fullPosterPath?: string | null;
  first_air_date?: string | null;
  origin_country?: string[] | null;
  original_language?: string | null;
  original_name?: string | null;
  name?: string | null;
  trailer: Video | null;
  overview?: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
  number_of_episodes: number;
  number_of_seasons: number;
  last_air_date?: string | null;
  status?: string | null;
  genres?: Genre[] | null;
  production_companies?: ProductionCompany[] | null;
  production_countries?: ProductionCountry[] | null;
  spoken_languages?: SpokenLanguage[] | null;
  videos?: VideoResults | null;
  cast?: People[] | null;
  credits?: Credits | null;
  watchProviders?: WatchProviders | null; 
}

export interface MediaList {
  page: number;
  dates?: { maximum: number; minimum: number } | null;
  total_pages: number;
  total_results: number;
  results: Movie[] | TVShow[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface VideoResults {
  results: Video[];
}

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface People {
  id: number;
  name: string;
  character?: string | null;
  cast_id?: string | null;
  profile_path?: string | null;
}

export interface Credits {
  cast: People[] | null;
}

export interface WatchProvider {
  id: number;
  provider_name: string;
  provider_id: string;
  logo_path: string | null;
  provider_url: string | null;
  [key: string] // This allows indexing with any string key

}

export interface WatchProviders {
  results: Record<string, WatchProvider>;
}

// export interface WatchProviderInfo {
//   display_priority: number;
//   logo_path: string | null;
//   provider_id: string;
//   provider_name: string;
//   provider_url: string | null;
//   [key: string] // This allows indexing with any string key
// }


// MediaQueryList

export type MovieQueries = "NowPlaying" | "Popular" | "TopRated" | "Upcoming";

export type TVShowQueries = "AiringToday" | "Popular" | "TopRated" | "OnTheAir";

export type UserLists = {
  ratedMovies: MediaList | null;
  favoriteMovies: MediaList | null;
  watchlistMovies: MediaList | null;
  ratedTv: MediaList | null;
  favoriteTv: MediaList | null;
  watchlistTv: MediaList | null;
};
