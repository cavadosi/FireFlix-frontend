import { MediaList, Movie, TVShow } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { isMovie } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function MediaListCard({
  mediaList,
  title,
  description,
  listKey,
}: {
  mediaList: MediaList | null;
  title: string;
  description: string;
  listKey: string;
}) {
  const totalResults = mediaList?.total_results ?? 0;
  const displayedMedia = mediaList?.results.slice(0, 5) ?? [];
  const placeholdersNeeded = Math.max(5 - displayedMedia.length, 0);

  return (
    <Card className="w-full p-2 h-full">
      <CardContent className="flex flex-col md:flex-row gap-2 p-2 w-full h-full">
        <div className="flex flex-row-reverse justify-end w-full overflow-clip rounded-md p-1 md:pr-6">
          {[
            ...Array(placeholdersNeeded).fill(null),
            ...displayedMedia,
          ].map((media, index) => (
            <div
              key={media?.id ?? `placeholder-${index}`}
              className={cn(
                "rounded-md overflow-hidden aspect-[9/16] w-1/4 transition-all duration-500 drop-shadow-2xl ring-[1px] ring-muted",
                index !== 4 ? "-ml-4 md:hover:translate-x-5" : "ml-0"
              )}
            >
              {media ? (
                <Link
                  to={
                    isMovie(media)
                      ? `/movie/${media.id}/details`
                      : `/tv/${media.id}/details`
                  }
                >
                  <img
                    src={
                      isMovie(media)
                        ? `https://image.tmdb.org/t/p/w500/${
                            (media as Movie).poster_path
                          }`
                        : `https://image.tmdb.org/t/p/w500/${
                            (media as TVShow).poster_path
                          }`
                    }
                    className="object-cover aspect-[9/16] transition-transform duration-300"
                  />
                </Link>
              ) : (
                <div className="w-full h-full bg-card backdrop-blur-lg" />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full grow">
          <div className="flex w-full">
            <Link to={`/lists/${listKey}`} className="grow text-lg font-semibold hover:underline">
              {title}
            </Link>
            <p className="text-muted">{`${totalResults} results`}</p>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
