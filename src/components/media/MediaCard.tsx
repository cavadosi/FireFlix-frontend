import { Movie, TVShow } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Bookmark, Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { isMovie } from "@/lib/utils";

export default function MediaCard({ media }: { media: Movie | TVShow }) {
  return (
    <Link
      to={
        isMovie(media)
          ? `/movie/${media.id}/details`
          : `/tv/${media.id}/details`
      }
    >
      <Card className="!p-0 col-span-1 group hover:-translate-y-1.5 cursor-pointer transition-all duration-300 flex flex-col h-full">
        <CardHeader className="!p-0 relative">
          <img
            src={
              isMovie(media)
                ? `https://image.tmdb.org/t/p/original/${
                    (media as Movie).poster_path
                  }`
                : `https://image.tmdb.org/t/p/original/${
                    (media as TVShow).poster_path
                  }`
            }
            alt="media poster image"
            className="rounded-t-xl bg-cover"
          />
          <div className="absolute invisible dark:visible bottom-0 w-full h-10 bg-gradient-to-b from-transparent to-card group-hover:h-4 transition-all duration-300"></div>
        </CardHeader>

        <CardContent className="p-2 font-semibold leading-5 flex-1">
          {isMovie(media) ? media.title : media.name}
        </CardContent>

        <CardFooter className="p-2 flex items-center">
          <div className="grow">
            <Button
              variant="ghost"
              className="rounded-full p-2 gap-1.5 text-xs"
            >
              <Star className="size-md text-amber-500" />
              {media.vote_average}
            </Button>
          </div>
          <Button
            variant={null}
            size="icon"
            className="rounded-full group/favorite"
          >
            <Heart className="size-md text--500 text-rose-500 group-hover/favorite:fill-rose-500" />
          </Button>
          <Button
            variant={null}
            size="icon"
            className="rounded-full group/watchlist"
          >
            <Bookmark className="size-md text-cyan-500 group-hover/watchlist:fill-cyan-500" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
