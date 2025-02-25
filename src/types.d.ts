export interface User {
  id: string;
  name: string;
  username: string;
  avatar: Avatar | null;
  iso_639_1: string | null;
  iso_3166_1: string | null;
  region?: string | null;
}

export interface Avatar {
  tmdb: TMDB | null;
  gravatar: GRAVATAR | null;
}

export interface TMDB {
  avatar_path: string | null;
}

export interface GRAVATAR {
  hash: string | null;
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
  reviews?: ReviewList | null; 
  rating?: number | null;
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
  reviews?: ReviewList | null;
  rating?: number | null;
}

export interface MediaList {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[] | TVShow[];
}

export interface ReviewList {
  page: number;
  total_pages: number;
  total_results: number;
  results: Review[];
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
  [key: string];
}

export interface WatchProviders {
  results: Record<string, WatchProvider>;
}

export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
}

export interface AuthorDetails {
  name?: string;
  username: string;
  avatar_path?: string;
  rating?: number;
}


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
export interface DiscoverTvShowsRequest {
  language?: string;
  region?: string;
  sort_by?: string;
  page?: number;
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  ["vote_average.gte"]?: number;
  ["vote_average.lte"]?: number;
  ["first_air_date.gte"]?: string;
  ["first_air_date.lte"]?: string;
  with_genres?: string;
}

export interface DiscoverMoviesRequest {
  language?: string;
  region?: string;
  sort_by?: string;
  page?: number;
  include_adult?: boolean;
  include_video?: boolean;
  ["primary_release_date.gte"]?: string;
  ["primary_release_date.lte"]?: string;
  ["vote_average.gte"]?: number;
  ["vote_average.lte"]?: number;
  ["vote_count.gte"]?: number;
  ["vote_count.lte"]?: number;
  with_genres?: string;
}

export type genres = {
  movie: Genre[];
  tv: Genre[];
};