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
import { Loader2, Plus } from "lucide-react";

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

  const [isLoadingMore, setIsLoadingMore] = useState<
    Record<MovieQueries, boolean>
  >({
    NowPlaying: false,
    Popular: false,
    TopRated: false,
    Upcoming: false,
  });

  useEffect(() => {
    const fetchMedia = async (query: MovieQueries, page: number = 1) => {
      if (lists[query] && page === 1) return;

      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "movie",
        query,
        page
      );

      if (response.status === 200 && response.data?.results) {
        setLists((prevLists) => ({
          ...prevLists,
          [query]:
            page === 1
              ? response.data
              : {
                  ...response.data,
                  results: [
                    ...(prevLists[query]?.results || []),
                    ...(response.data?.results || []),
                  ],
                },
        }));
      }
    };
    fetchMedia(query);
    setActiveQuery(query);

    Object.keys(lists)
      .filter((q): q is MovieQueries => q !== query)
      .forEach((q) => fetchMedia(q));
  }, [query]);

  const loadMoreMovies = async () => {
    try {
      const currentList = lists[activeQuery];
      if (!currentList || currentList.page >= currentList.total_pages) return;

      setIsLoadingMore((prev) => ({ ...prev, [activeQuery]: true }));

      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "movie",
        activeQuery,
        currentList.page + 1
      );

      if (response.status === 200 && response.data?.results) {
        setLists((prevLists) => ({
          ...prevLists,
          [activeQuery]: {
            ...response.data,
            results: [
              ...(currentList?.results || []),
              ...(response.data?.results || []),
            ],
          },
        }));
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setIsLoadingMore((prev) => ({ ...prev, [activeQuery]: false }));
    }
  };

  return (
    <>
      <Tabs
        value={activeQuery}
        className="w-full"
        onValueChange={(value) => setActiveQuery(value as MovieQueries)}
      >
        <PageHeader isCentered>
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
                <div className="space-y-2">
                  <h4 className="text-xl font-medium leading-none">
                    {MovieQueryDetails[key as MovieQueries].label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {MovieQueryDetails[key as MovieQueries].description}
                  </p>
                </div>
                <Separator className="my-4" />
                {mediaList ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-4 w-full">
                      {mediaList.results.map((media, key) => (
                        <MediaCard key={key} media={media} />
                      ))}
                      {mediaList.page < mediaList.total_pages && (
                        <button
                          className="h-full rounded-xl min-h-40 w-full flex items-center justify-center gap-2 border p-4 text-muted bg-card hover:bg-background transition col-span-full"
                          onClick={loadMoreMovies}
                          disabled={isLoadingMore[activeQuery]}
                        >
                          {isLoadingMore[activeQuery] ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />{" "}
                              Loading...
                            </>
                          ) : (
                            <>
                              <Plus className="w-5 h-5" /> Load More
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-4 w-full">
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
