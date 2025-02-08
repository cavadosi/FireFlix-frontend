import { isMovie } from "@/lib/utils";
import type { Movie, TVShow } from "@/types";

const MediaHeader = ({ media }: { media: Movie | TVShow }) => {
  return (
    <div className="grow">
      {isMovie(media)
        ? `${media.title} (${media.release_date ? new Date(media.release_date).getFullYear() : ""})`
        : `${media.name} (${media.first_air_date ? new Date(media.first_air_date).getFullYear() : ""})`}
    </div>
  );
};

export default MediaHeader;
