import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { MediaAditionalInfo } from "@/components/media/MediaAditionalInfo";
import { MediaFavoriteButton } from "@/components/media/MediaFavoriteButton";
import VideoModal from "@/components/core/VideoModal";
import type { Movie, TVShow } from "@/types";
import { isMovie } from "@/lib/utils";
import { MediaWatchlistButton } from "./MediaWatchlistButton";

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
      <Button variant="outline" className="rounded-full gap-1.5 text-xs">
        <Star className="text-amber-500" />
        {media.vote_average}
      </Button>
      <MediaFavoriteButton media={media} variant="outline" />
      <MediaWatchlistButton media={media} variant="outline"/>
      <MediaAditionalInfo media={media} />
    </div>
  );
};

export default MediaActions;
