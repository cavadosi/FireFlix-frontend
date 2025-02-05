import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import MediaCard from "@/components/media/MediaCard";
import MediaService from "@/server/media";
import type { ApiResponse, MediaList, MovieQueries } from "@/types";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";
import { SkeletonMediaCard } from "@/components/media/SkeletonMediaCard";

const MovieQueryDetails: Record<
  MovieQueries,
  { label: string; description: string }
> = {
  NowPlaying: {
    label: "Now Playing",
    description: "Movies currently playing in theaters.",
  },
  Popular: {
    label: "Popular",
    description: "Movies that are trending and widely watched.",
  },
  TopRated: {
    label: "Top Rated",
    description: "Movies with the highest ratings from audiences and critics.",
  },
  Upcoming: {
    label: "Upcoming",
    description: "Movies that are scheduled for release soon.",
  },
};

const Movies = () => {
  const { query: queryParam } = useParams<{ query?: string }>();
  const query: MovieQueries = (queryParam as MovieQueries) || "NowPlaying";
  const [activeQuery, setActiveQuery] = useState<MovieQueries>(query);
  const [lists, setLists] = useState<Record<MovieQueries, MediaList | null>>({
    NowPlaying: null,
    Popular: null,
    TopRated: null,
    Upcoming: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async (query: MovieQueries) => {
      setLoading(true);
      setError(null);

      if (lists[query]) {
        setLoading(false);
        return;
      }

      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "movie",
        query
      );

      if (response.status === 200 && response.data) {
        setLists((prevLists) => ({
          ...prevLists,
          [query]: response.data,
        }));
      } else {
        setError(response.error || "Failed to fetch media details.");
      }

      setLoading(false);
    };

    fetchMedia(query);

    setActiveQuery(query);

    Object.keys(lists)
      .filter((q): q is MovieQueries => q !== query)
      .forEach((q) => fetchMedia(q));
  }, [query]);

  return (
    <>
      <Tabs
        value={activeQuery}
        className="w-full"
        onValueChange={(value) => setActiveQuery(value as MovieQueries)}
      >
        <PageHeader>
          <TabsList>
            {Object.keys(lists).map((key) => (
              <TabsTrigger key={key} value={key}>
                {MovieQueryDetails[key as MovieQueries].label}
              </TabsTrigger>
            ))}
          </TabsList>
        </PageHeader>
        <PageWrapper>
          <div className="grid grid-cols-1">
            {Object.entries(lists).map(([key, mediaList]) => (
              <TabsContent key={key} value={key}>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">
                    {MovieQueryDetails[key as MovieQueries].label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {MovieQueryDetails[key as MovieQueries].description}
                  </p>
                </div>
                <Separator className="my-4" />
                {mediaList ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full">
                    {mediaList.results.map((media) => (
                      <MediaCard key={media.id} media={media} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full">
                    {Array.from({ length: 20 }).map((_, index) => (
                      <SkeletonMediaCard key={index} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </div>
        </PageWrapper>
      </Tabs>
    </>
  );
};

export default Movies;
