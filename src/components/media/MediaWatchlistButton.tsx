import { MediaList, Movie, TVShow } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useContext, useState } from "react";
import AuthContext from "../core/UserProvider";
import { Bookmark } from "lucide-react";
import { MarkWatchlist } from "@/server/user";
import { isMovie } from "@/lib/utils";
import { toast } from "sonner";

export function MediaWatchlistButton({
  media,
  variant,
}: {
  media: Movie | TVShow;
  variant: "outline" | null;
}) {
  const auth = useContext(AuthContext);
  const watchlistMoviesSet = auth?.watchlistMoviesSet;
  const watchlistTvSet = auth?.watchlistTvSet;
  const user = auth?.user;
  const userLists = auth?.userLists;
  const updateUserLists = auth?.updateUserLists;

  const isInWatchlist = (media: Movie | TVShow) => {
    if (isMovie(media)) {
      return watchlistMoviesSet?.has(media.id);
    }
    return watchlistTvSet?.has(media.id);
  };

  const [isWatchlistMedia, setWatchlistMedia] = useState(isInWatchlist(media));

  const handleClick = async (media: Movie | TVShow) => {
    if (!user || !auth) return;

    const mediaType = isMovie(media) ? "movie" : "tv";
    const isCurrentlyInWatchlist = isWatchlistMedia;

    const response = await MarkWatchlist(
      mediaType,
      media.id,
      !isCurrentlyInWatchlist,
      user.id,
      user.sessionId
    );

    if (response.status !== 200) {
      toast(
        `Oops, something went wrong. ${
          isMovie(media) ? media.title : media.name
        }`
      );
      return;
    }

    setWatchlistMedia(!isCurrentlyInWatchlist);

    if (updateUserLists && userLists) {
      updateUserLists({
        ...userLists,
        watchlistMovies: isMovie(media)
          ? ({
              ...userLists.watchlistMovies,
              results: isWatchlistMedia
                ? userLists.watchlistMovies?.results.filter(
                    (m): m is Movie => m.id !== media.id
                  ) || []
                : [...(userLists.watchlistMovies?.results || []), media],
              page: userLists.watchlistMovies?.page ?? 1,
              total_pages: userLists.watchlistMovies?.total_pages ?? 1,
              total_results: isWatchlistMedia
                ? (userLists.watchlistMovies?.total_results ?? 1) - 1
                : (userLists.watchlistMovies?.total_results ?? 0) + 1,
            } as MediaList)
          : userLists.watchlistMovies,

        watchlistTv: !isMovie(media)
          ? ({
              ...userLists.watchlistTv,
              results: isWatchlistMedia
                ? userLists.watchlistTv?.results.filter(
                    (tv): tv is TVShow => tv.id !== media.id
                  ) || []
                : [...(userLists.watchlistTv?.results || []), media],
              page: userLists.watchlistTv?.page ?? 1,
              total_pages: userLists.watchlistTv?.total_pages ?? 1,
              total_results: isWatchlistMedia
                ? (userLists.watchlistTv?.total_results ?? 1) - 1
                : (userLists.watchlistTv?.total_results ?? 0) + 1,
            } as MediaList)
          : userLists.watchlistTv,
      });
    }

    toast(
      `${isMovie(media) ? media.title : media.name} ${
        isCurrentlyInWatchlist ? "Removed from Watchlist" : "Added to Watchlist"
      }`
    );
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild onClick={() => handleClick(media)}>
        <Button variant={variant} size="icon" className="rounded-full">
          <Bookmark
            className={
              isWatchlistMedia ? "text-cyan-500 fill-cyan-500" : "text-cyan-500"
            }
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        <p>{isWatchlistMedia ? "Remove from Watchlist" : "Add to Watchlist"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
