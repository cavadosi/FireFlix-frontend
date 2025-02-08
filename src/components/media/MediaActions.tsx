import { Button } from "@/components/ui/button";
import { Star, Heart, Bookmark } from "lucide-react";
import { MediaAditionalInfo } from "@/components/media/MediaAditionalInfo";
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
      <Button variant="outline" className="rounded-full gap-1.5 text-xs">
        <Star className="text-amber-500" />
        {media.vote_average}
      </Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <Heart className="text-rose-500" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-full">
        <Bookmark className="text-cyan-500" />
      </Button>
      <MediaAditionalInfo media={media} />
    </div>
  );
};

export default MediaActions;
