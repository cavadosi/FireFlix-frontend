import { isMovie } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import MediaActions from "./MediaActions";
import type { Movie, TVShow } from "@/types";

const MediaMainInfo = ({ media }: { media: Movie | TVShow }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center z-10 mt-4 md:mt-20 h-96 bg-gradient-to-t from-background via-background/70 to-transparent">
      <img
        src={`https://image.tmdb.org/t/p/original/${isMovie(media) ? media.poster_path : (media as TVShow).poster_path}`}
        alt="poster"
        className="bg-contain h-auto w-48 lg:w-56 rounded-lg hidden md:block"
      />
      <div className="flex flex-col text-start basis-3/5 mx-6 space-y-2">
        <h1 className="font-bold text-xl">{isMovie(media) ? media.title : media.name}</h1>
        <p className="text-sm italic text-secondary-foreground">{isMovie(media) ? media.tagline : null}</p>
        <p className="text-secondary-foreground line-clamp-4">{media.overview}</p>
        <div className="flex gap-2 pt-2 flex-wrap">
          {media.genres?.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>
        <MediaActions media={media} />
      </div>
    </div>
  );
};

export default MediaMainInfo;
