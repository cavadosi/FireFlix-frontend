import CastCarousel from "../core/CastCarousel";
import MediaCarousel from "./MediaCarousel";
import { MediaReviewList } from "./MediaReviewList";
import { Movie, TVShow, MediaList, ReviewList } from "@/types";
import { Separator } from "../ui/separator";

const MediaContent = ({
  media,
  similar,
  recomended,
  reviews,
}: {
  media: Movie | TVShow;
  similar: MediaList | null;
  recomended: MediaList | null;
  reviews: ReviewList | null;
}) => {

  return (
    <div className="grid grid-cols-1 z-10 bg-background -mt-0.5">
      <div className="col-span-1 max-w-full mx-auto overflow-hidden my-8">
        {media.cast && <CastCarousel cast={media.cast} />}
        
        {recomended?.results?.length ? (
          <MediaCarousel title="Recomended" mediaList={recomended} />
        ) : null}
        
        {similar?.results?.length ? (
          <MediaCarousel title="Similar" mediaList={similar} />
        ): null}
        
        <Separator />
        {reviews?.results?.length ? <MediaReviewList reviews={reviews} /> : null}
      </div>
    </div>
  );
};

export default MediaContent;
