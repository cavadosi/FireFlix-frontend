import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import MediaCard from "@/components/media/MediaCard";
import MediaService from "@/server/media";
import type { ApiResponse, MediaList, TVShowQueries } from "@/types";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";
import { SkeletonMediaCard } from "@/components/media/SkeletonMediaCard";
import { Button } from "@/components/ui/button";

const TVShowQueryDetails: Record<
  TVShowQueries,
  { label: string; description: string }
> = {
  AiringToday: {
    label: "Airing Today",
    description: "TV shows that are airing episodes today.",
  },
  Popular: {
    label: "Popular",
    description: "TV shows that are currently popular and widely watched.",
  },
  TopRated: {
    label: "Top Rated",
    description:
      "TV shows with the highest ratings from audiences and critics.",
  },
  OnTheAir: {
    label: "On The Air",
    description: "TV shows that are currently airing new episodes.",
  },
};

const Tv = () => {
  const { query: queryParam } = useParams<{ query?: string }>();
  const query: TVShowQueries = (queryParam as TVShowQueries) || "AiringToday";

  const [activeQuery, setActiveQuery] = useState<TVShowQueries>(query);

  const [lists, setLists] = useState<Record<TVShowQueries, MediaList | null>>({
    AiringToday: null,
    Popular: null,
    TopRated: null,
    OnTheAir: null,
  });

  const [isLoadingMore, setIsLoadingMore] = useState<
    Record<TVShowQueries, boolean>
  >({
    AiringToday: false,
    Popular: false,
    TopRated: false,
    OnTheAir: false,
  });

  useEffect(() => {
    const fetchMedia = async (query: TVShowQueries, page: number = 1) => {

      if (lists[query] && page === 1) return;

      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "tv",
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
      .filter((q): q is TVShowQueries => q !== query)
      .forEach((q) => fetchMedia(q));
  }, [query, lists]); // add lists to the dependency array

  const loadMoreTVShows = async () => {
    try {

      const currentList = lists[activeQuery];

      console.log(
        `Before Load More - ${activeQuery} - page: ${currentList?.page}, total_pages: ${currentList?.total_pages}`
      );

      if (!currentList || currentList.page >= currentList.total_pages) return;

      setIsLoadingMore((prev) => ({ ...prev, [activeQuery]: true }));

      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "tv",
        activeQuery,
        currentList.page + 1
      );

      if (response.status === 200 && response.data?.results) {
        console.log(
          `After Load More - ${activeQuery} - page: ${response.data.page}, total_pages: ${response.data.total_pages}`
        );
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
      console.error("Error loading more TV shows:", error);
    } finally {
      setIsLoadingMore((prev) => ({ ...prev, [activeQuery]: false }));
    }
  };

  return (
    <>
      <Tabs
        value={activeQuery}
        className="w-full"
        onValueChange={(value) => setActiveQuery(value as TVShowQueries)}
      >
        <PageHeader>
          <TabsList>
            {Object.keys(lists).map((key) => (
              <TabsTrigger key={key} value={key}>
                {TVShowQueryDetails[key as TVShowQueries].label}
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
                    {TVShowQueryDetails[key as TVShowQueries].label}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {TVShowQueryDetails[key as TVShowQueries].description}
                  </p>
                </div>
                <Separator className="my-4" />
                {mediaList ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full">
                      {mediaList.results.map((media, key) => (
                        <MediaCard key={key} media={media} />
                      ))}
                    </div>
                    {mediaList.page && (
                      <div className="flex justify-center mt-4">
                        <Button
                          onClick={loadMoreTVShows}
                          disabled={isLoadingMore[activeQuery]}
                        >
                          {isLoadingMore[activeQuery]
                            ? "Loading..."
                            : "Load More"}
                        </Button>
                      </div>
                    )}
                  </>
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

export default Tv;
