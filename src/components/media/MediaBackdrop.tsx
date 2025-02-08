import { isMovie } from "@/lib/utils";
import type { Movie, TVShow } from "@/types";

const MediaBackdrop = ({ media }: { media: Movie | TVShow }) => {
  return (
    <div className="fixed top-0 z-0">
      <img
        src={`https://image.tmdb.org/t/p/original/${isMovie(media) ? media.backdrop_path : (media as TVShow).backdrop_path}`}
        alt="media poster image"
        className=" bg-cover"
      />
      <div className="absolute -bottom-1 w-full h-10 bg-gradient-to-b from-transparent to-card"></div>
    </div>
  );
};

export default MediaBackdrop;
