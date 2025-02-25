import { isMovie } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import MediaActions from "./MediaActions";
import type { Movie, TVShow } from "@/types";

const MediaMainInfo = ({ media }: { media: Movie | TVShow }) => {
  const imageUrl = isMovie(media)
    ? `https://image.tmdb.org/t/p/original/${media.poster_path}`
    : `https://image.tmdb.org/t/p/original/${(media as TVShow).poster_path}`;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center z-10 mt-4 md:mt-20 px-2 h-96 bg-gradient-to-t from-background via-background/70 to-transparent">
      {/* Image or fallback */}
      {media.poster_path ? (
        <img
          src={imageUrl}
          alt="poster"
          className="bg-contain h-auto w-48 lg:w-56 rounded-lg hidden md:block"
        />
      ) : (
        <div className="bg-contain aspect-square w-48 lg:w-56 rounded-lg max-md:hidden flex items-center justify-center text-lg font-bold text-muted-foreground bg-muted/20">
          No Image
        </div>
      )}

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
