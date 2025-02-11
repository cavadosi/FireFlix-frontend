import { MediaList, Movie, TVShow } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useContext, useState } from "react";
import AuthContext from "../core/UserProvider";
import { Heart } from "lucide-react";
import { MarkAsFavorite } from "@/server/user";
import { isMovie } from "@/lib/utils";
import { toast } from "sonner";

export function MediaFavoriteButton({ media, variant }: { media: Movie | TVShow, variant: "outline" | null }) {
  const auth = useContext(AuthContext);

  const favoriteMoviesSet = auth?.favoriteMoviesSet;
  const favoriteTvSet = auth?.favoriteTvSet;
  const updateUserLists = auth?.updateUserLists;
  const user = auth?.user;
  const userLists = auth?.userLists

  const isFavorite = (media: Movie | TVShow) => {
    if (isMovie(media)) {
      return favoriteMoviesSet?.has(media.id);
    }

    return favoriteTvSet?.has(media.id);
  };

  const [isFavoriteMedia, setFavoriteMedia] = useState(isFavorite(media));

  const handleClick = async (media: Movie | TVShow) => {
    if (!user || !auth) return;
  
    const mediaType = isMovie(media) ? "movie" : "tv";
    const isCurrentlyFavorite = isFavoriteMedia;
  
    const response = await MarkAsFavorite(
      mediaType,
      media.id,
      !isCurrentlyFavorite,
      user?.id,
      user?.sessionId
    );
  
    if (response.status !== 200) {
      toast(`Oops, something went wrong with ${isMovie(media) ? media.title : media.name}`);
      return;
    }
  
    setFavoriteMedia(!isCurrentlyFavorite);
  
    if (updateUserLists && userLists) {
      updateUserLists({
        ...userLists,
        favoriteMovies: isMovie(media)
          ? {
              ...userLists.favoriteMovies,
              results: isFavoriteMedia
                ? userLists.favoriteMovies?.results.filter((m): m is Movie => m.id !== media.id) || []
                : [...(userLists.favoriteMovies?.results || []), media],
              page: userLists.favoriteMovies?.page ?? 1,
              total_pages: userLists.favoriteMovies?.total_pages ?? 1,
              total_results: userLists.favoriteMovies?.total_results ?? 0,
            } as MediaList
          : userLists.favoriteMovies,
    
        favoriteTv: !isMovie(media)
          ? {
              ...userLists.favoriteTv,
              results: isFavoriteMedia
                ? userLists.favoriteTv?.results.filter((tv): tv is TVShow => tv.id !== media.id) || []
                : [...(userLists.favoriteTv?.results || []), media],
              page: userLists.favoriteTv?.page ?? 1,
              total_pages: userLists.favoriteTv?.total_pages ?? 1,
              total_results: userLists.favoriteTv?.total_results ?? 0,
            } as MediaList
          : userLists.favoriteTv,
      });
    }
  
    toast(
      `${isMovie(media) ? media.title : media.name} ${
        isCurrentlyFavorite ? "Removed from Favorites" : "Added to Favorites"
      }`
    );
  };

  
  return (
    <Tooltip>
      <TooltipTrigger asChild onClick={() => handleClick(media)}>
        <Button variant={variant} size="icon" className="rounded-full">
          <Heart
            className={
              isFavorite(media)
                ? "text-rose-500 fill-rose-500"
                : "text-rose-500"
            }
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        <p>
          {isFavorite(media) ? "Remove from Favorites" : "Add to Favorites"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
