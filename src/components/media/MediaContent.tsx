import CastCarousel from "../core/CastCarousel";
import MediaCarousel from "./MediaCarousel";
import { Movie, TVShow, MediaList } from "@/types";
import { Separator } from "../ui/separator";

const MediaContent = ({
  media,
  similar,
  recomended,
}: {
  media: Movie | TVShow;
  similar: MediaList | null;
  recomended: MediaList | null;
}) => {
  return (
    <div className="grid grid-cols-1  z-10 bg-background -mt-0.5">
      <div className="col-span-1 max-w-full mx-auto overflow-hidden my-8">
        {media.cast && <CastCarousel cast={media.cast} />}
        {recomended && (
          <MediaCarousel title="Recomended" mediaList={recomended} />
        )}
        {similar && <MediaCarousel title="Similar" mediaList={similar} />}
        <Separator />
      </div>
    </div>
  );
};

export default MediaContent