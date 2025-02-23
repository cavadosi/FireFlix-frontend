import { useState, useContext, useEffect } from "react";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthContext from "../core/UserProvider";
import MediaService from "@/server/media";
import { isMovie } from "@/lib/utils";
import { Movie, TVShow, MediaList } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../ui/separator";

export function MediaRatingButton({
  media,
  variant,
}: {
  media: Movie | TVShow;
  variant: "outline" | "ghost" | null;
}) {
  const auth = useContext(AuthContext);
  const ratedMoviesMap = auth?.ratedMoviesMap;
  const ratedTvMap = auth?.ratedTvMap;
  const user = auth?.user;
  const userLists = auth?.userLists;
  const updateUserLists = auth?.updateUserLists;

  const getCurrentRating = (media: Movie | TVShow) => {
    return isMovie(media)
      ? ratedMoviesMap?.get(media.id)
      : ratedTvMap?.get(media.id);
  };

  const [rating, setRating] = useState(getCurrentRating(media) || 0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    setRating(getCurrentRating(media) || 0);
    // console.log("ratingUSEEFFECT",rating, media.title as Movie, getCurrentRating(media));
  }, [ratedMoviesMap, ratedTvMap]);


  const handleRate = async (newRating: number) => {
    if (!user || !auth) return;

    const mediaType = isMovie(media) ? "movie" : "tv";

    if (newRating === 0) {
      const response = await MediaService.DeleteMediaRating(
        mediaType,
        media.id,
      );

      if (response.status !== 200) {
        toast("Oops, something went wrong while removing the rating");
        return;
      }

      setRating(0);
      if (updateUserLists && userLists) {
        updateUserLists({
          ...userLists,
          ratedMovies: isMovie(media)
            ? ({
                ...userLists.ratedMovies,
                results:
                  userLists.ratedMovies?.results.filter(
                    (m) => m.id !== media.id
                  ),
                total_results: (userLists.ratedMovies?.total_results ?? 1) - 1,
              } as MediaList)
            : userLists.ratedMovies,
          ratedTv: !isMovie(media)
            ? ({
                ...userLists.ratedTv,
                results:
                  userLists.ratedTv?.results.filter(
                    (tv) => tv.id !== media.id
                  ),
                total_results: (userLists.ratedTv?.total_results ?? 1) - 1,
              } as MediaList)
            : userLists.ratedTv,
        });
      }

      toast("Rating removed");
    } else {
      const response = await MediaService.AddMediaRating(
        mediaType,
        media.id,
        newRating,
      );

      if (response.status !== 200) {
        toast("Oops, something went wrong while rating");
        return;
      }

      setRating(newRating);

      if (updateUserLists && userLists) {
        const isAlreadyRated = isMovie(media)
          ? userLists.ratedMovies?.results.some((m) => m.id === media.id)
          : userLists.ratedTv?.results.some((tv) => tv.id === media.id);

        updateUserLists({
          ...userLists,
          ratedMovies: isMovie(media)
            ? ({
                ...userLists.ratedMovies,
                results: isAlreadyRated
                  ? userLists.ratedMovies?.results.map((m) =>
                      m.id === media.id ? { ...m, rating: newRating } : m
                    )
                  : [
                      ...(userLists.ratedMovies?.results || []),
                      { ...media, rating: newRating },
                    ],
                total_results: isAlreadyRated
                  ? userLists.ratedMovies?.total_results ?? 0
                  : (userLists.ratedMovies?.total_results ?? 0) + 1,
              } as MediaList)
            : userLists.ratedMovies,
          ratedTv: !isMovie(media)
            ? ({
                ...userLists.ratedTv,
                results: isAlreadyRated
                  ? userLists.ratedTv?.results.map((tv) =>
                      tv.id === media.id ? { ...tv, rating: newRating } : tv
                    )
                  : [
                      ...(userLists.ratedTv?.results || []),
                      { ...media, rating: newRating },
                    ],
                total_results: isAlreadyRated
                  ? userLists.ratedTv?.total_results ?? 0
                  : (userLists.ratedTv?.total_results ?? 0) + 1,
              } as MediaList)
            : userLists.ratedTv,
        });
      }

      toast(`Rated ${newRating} stars!`);
    }
  };

  if(media.id == 274) console.log(media.rating);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant}  className="rounded-full p-2 gap-1.5 text-xs">
          <Star
            className={rating > 0 ? "text-yellow-500" : "text-muted-foreground"}
            fill={rating > 0 ? "currentColor" : "none"}
          />
          {media.vote_average}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="center"
        className="border border-input bg-background shadow-sm mx-2"
      >
        <div className="flex-col space-y-2 px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <p className="font-bold">Rate this Movie</p>

            {rating ? (
              <span onClick={() => handleRate(0)} className="cursor-pointer">
                <StarOff className="text-muted-foreground size-5" />
              </span>
            ) : null}
          </div>
          <Separator />
          <div className="flex">
            {Array.from({ length: 10 }, (_, index) => {
              const starRating = index + 1;
              return (
                <span
                  key={starRating}
                  onMouseEnter={() => setHoveredStar(starRating)}
                  onMouseLeave={() => setHoveredStar(null)}
                  onClick={() =>
                    handleRate(starRating === rating ? 0 : starRating)
                  }
                  className="cursor-pointer p-0"
                >
                  <Star
                    className={
                      starRating <= (hoveredStar ?? rating)
                        ? "text-yellow-500 size-5"
                        : "text-muted size-5"
                    }
                    fill={
                      starRating <= (hoveredStar ?? rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </span>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
