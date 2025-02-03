import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import MediaCard from "@/components/media/MediaCard";
import MediaService from "@/server/media";
import type { ApiResponse, MediaList, TVShowQueries } from "@/types";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async (query: TVShowQueries) => {
      setLoading(true);
      setError(null);

      if (lists[query]) {
        setLoading(false);
        return;
      }

      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "tv",
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
      .filter((q): q is TVShowQueries => q !== query)
      .forEach((q) => fetchMedia(q));
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full">
                    {mediaList.results.map((media) => (
                      <MediaCard key={media.id} media={media} />
                    ))}
                  </div>
                ) : (
                  <p>No data available.</p>
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
