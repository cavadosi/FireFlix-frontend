import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Movie, TVShow } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidMediaQuery = (
  query: string,
  mediaType: 'movie' | 'tv'
): boolean => {
  const validQueries = {
    movie: ['NowPlaying', 'Popular', 'TopRated', 'Upcoming'],
    tv: ['AiringToday', 'OnTheAir', 'TopRated', 'Popular'],
  };

  return validQueries[mediaType].includes(query);
};

export const isMovie = (media: Movie | TVShow): media is Movie => "title" in media;