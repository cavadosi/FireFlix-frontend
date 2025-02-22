import { MediaFavoriteButton } from "@/components/media/MediaFavoriteButton";
import { MediaWatchlistButton } from "@/components/media/MediaWatchlistButton";
import { MediaRatingButton } from "@/components/media/MediaRatingButton";
import VideoModal from "@/components/core/VideoModal";
import type { Movie, TVShow } from "@/types";
import { isMovie } from "@/lib/utils";

const MediaActions = ({ media }: { media: Movie | TVShow }) => {
  return (
    <div className="flex gap-x-2 pt-2">
      {media.trailer && (
        <VideoModal
          video={media.trailer}
          label={
            isMovie(media)
              ? (media as Movie).title ?? "Video"
              : (media as TVShow).name ?? "Video"
          }
        />
      )}
      <MediaRatingButton media={media} variant="outline" />
      <MediaFavoriteButton media={media} variant="outline" />
      <MediaWatchlistButton media={media} variant="outline"/>
    </div>
  );
};

export default MediaActions;
