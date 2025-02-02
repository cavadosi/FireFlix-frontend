import { Movie, TVShow } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Bookmark, Heart, Star } from "lucide-react";
import { Button } from "../ui/button";

export default function MediaCard({ media }: { media: Movie | TVShow }) {
  const isMovie = (media: Movie | TVShow): media is Movie => "title" in media;

  return (
    <Card className="!p-0 col-span-1">
      <CardHeader className="!p-0 relative ">
        <img
          src={
            isMovie(media)
              ? `https://image.tmdb.org/t/p/original/${
                  (media as Movie).poster_path
                }`
              : `https://image.tmdb.org/t/p/original/${(media as TVShow).name}`
          }
          alt="media poster image"
          className="rounded-t-lg bg-cover"
        />
        <div className="h-10  bottom-0 bg-gradient-to-b from-transparent to-card absolute z-10 w-full"></div>
      </CardHeader>
      <CardContent className="p-2 font-semibold leading-5">
        <div>{isMovie(media) ? media.title : media.name}</div>
      </CardContent>
      <CardFooter className="p-2">
        <div className="grow">

        <Button variant="ghost"  className="rounded-full p-2 gap-1.5 text-xs  ">
            <Star className="size-md text-amber-500"/>
            {media.vote_average}
        </Button>
        </div>
        <Button variant={null} size="icon" className="rounded-full group ">
            <Heart className="size-md text--500 text-rose-500 group-hover:fill-rose-500"/>
        </Button>
        <Button variant={null} size="icon" className="rounded-full group ">
            <Bookmark className="size-md text-cyan-500 group-hover:fill-cyan-500"/>
        </Button>
      </CardFooter>
    </Card>
  );
}
