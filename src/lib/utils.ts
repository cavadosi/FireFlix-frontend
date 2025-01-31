import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidMediaQuery = (
  query: string,
  mediaType: 'movie' | 'tv'
): boolean => {
  const validQueries = {
    movie: ['NowPlaying', 'Popular', 'TopRated', 'Upcoming'],
    tv: ['NowPlaying', 'Popular', 'TopRated', 'Upcoming'],
  };

  return validQueries[mediaType].includes(query);
};
