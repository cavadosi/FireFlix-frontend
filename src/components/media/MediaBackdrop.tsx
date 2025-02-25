import { isMovie } from "@/lib/utils";
import type { Movie, TVShow } from "@/types";

const MediaBackdrop = ({ media }: { media: Movie | TVShow }) => {
  const backdropUrl = isMovie(media)
    ? `https://image.tmdb.org/t/p/original/${media.backdrop_path}`
    : `https://image.tmdb.org/t/p/original/${(media as TVShow).backdrop_path}`;

  return (
    <div className="fixed top-0 z-0 w-full h-[500px]">
      {media.backdrop_path ? (
        <img
          src={backdropUrl}
          alt="media backdrop"
          className="bg-cover w-full h-full object-cover"
        />
      ) : (
        <div className="bg-cover w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground bg-muted/20">
          No Image
        </div>
      )}
      <div className="absolute -bottom-1 w-full h-10 bg-gradient-to-b from-transparent to-card"></div>
    </div>
  );
};

export default MediaBackdrop;
