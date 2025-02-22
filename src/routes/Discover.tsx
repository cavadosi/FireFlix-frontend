import { PageHeader } from "@/components/core/PageHeader";
import { PageWrapper } from "@/components/core/PageWrapper";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clapperboard, MonitorPlay, Search } from "lucide-react";
import { useState } from "react";
import MediaCard from "@/components/media/MediaCard";
import AdvancedSearchFilters from "@/components/core/AdvancedSearchFilters";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Loader2, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import MediaService from "@/server/media";
import {
  MediaList,
  DiscoverMoviesRequest,
  DiscoverTvShowsRequest,
} from "@/types";

const Discover = () => {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<
    Partial<DiscoverMoviesRequest & DiscoverTvShowsRequest>
  >({});
  const [page, setPage] = useState<number>(1);
  const [lastFilters, setLastFilters] = useState<
    Partial<DiscoverMoviesRequest & DiscoverTvShowsRequest>
  >({});
  const [lastQuery, setLastQuery] = useState<"search" | "discover">("search");
  const [mediatype, setMediatype] = useState<"movie" | "tv">("movie");
  const [activeTab, setActiveTab] = useState<string>("search");
  const [loading, setLoading] = useState<boolean>(false);
  const [mediaResults, setMediaResults] = useState<MediaList | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // 🔹 Handle Title-Based Search
  const handleTitleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLastQuery("search");
    setLoading(true);
    try {
      const response = await MediaService.SearchMedia(mediatype, search);

      if (response.status === 200 && response.data) {
        setMediaResults(response.data); // Update the mediaResults state
      }
    } catch (error) {
      console.error("Error searching media:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Discover (Filtered) Search
  const handleDiscoverSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLastFilters(filters);
    setLastQuery("discover");
    setLoading(true);
    try {
      const response = await MediaService.DiscoverMedia(mediatype, {
        ...filters,
        page: filters.page ?? 1,
      });

      console.log(filters.page);
      if (response.status === 200 && response.data) {
        setMediaResults(response.data); // Update the mediaResults state
      }
    } catch (error) {
      console.error("Error discovering media:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load More Results
  const loadMoreResults = async () => {
    if (
      isLoadingMore ||
      !mediaResults ||
      mediaResults.page >= mediaResults.total_pages
    )
      return;

    setIsLoadingMore(true);

    try {
      const response =
        lastQuery === "discover"
          ? await MediaService.DiscoverMedia(mediatype, {
              ...lastFilters,
              page: page + 1,
            })
          : await MediaService.SearchMedia(
              mediatype,
              search,
              mediaResults.page + 1
            );

      if (lastQuery === "discover") {
        setPage(page + 1);
      }

      if (response.status === 200 && response.data) {
        setMediaResults((prevResults) => ({
          ...response.data,
          results: [...(prevResults?.results || []), ...response.data.results],
        }));
      }
    } catch (error) {
      console.error("Error loading more results:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <PageHeader isCentered>
          <TabsList>
            <TabsTrigger value="search">Search by Title</TabsTrigger>
            <TabsTrigger value="discover">Advanced search</TabsTrigger>
          </TabsList>
        </PageHeader>
        <PageWrapper>
          <TabsContent value="search">
            <div className="space-y-2 w-full">
              <div className="flex gap-4 items-center">
                <h4 className="text-xl font-medium leading-none">Discover</h4>
                <ToggleGroup
                  type="single"
                  value={mediatype}
                  onValueChange={(value) => {
                    if (value === "movie" || value === "tv") {
                      setMediatype(value);
                    }
                  }}
                  size="sm"
                >
                  <Tooltip>
                    <ToggleGroupItem
                      asChild
                      value="movie"
                      aria-label="Toggle movie"
                    >
                      <TooltipTrigger>
                        <Clapperboard className="h-2 w-2" />
                      </TooltipTrigger>
                    </ToggleGroupItem>
                    <TooltipContent className="border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground">
                      <p>Movie</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator orientation="vertical" className="h-6" />
                  <Tooltip>
                    <ToggleGroupItem asChild value="tv" aria-label="Toggle tv">
                      <TooltipTrigger>
                        <MonitorPlay className="h-2 w-2" />
                      </TooltipTrigger>
                    </ToggleGroupItem>
                    <TooltipContent className="border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground">
                      <p>Tv</p>
                    </TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </div>
              <p className="text-sm text-muted-foreground pb-4">
                Search for movies or TV shows by name
              </p>
              <form
                onSubmit={handleTitleSearch}
                className="flex-col w-full space-y-4 max-w-md items-center space-x-2"
              >
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg bg-background pl-8"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute left-2.5 top-2.5 text-muted-foreground p-0"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="space-y-2 w-full">
              <div className="flex gap-4 items-center">
                <h4 className="text-xl font-medium leading-none">
                  Advanced Search
                </h4>
                <ToggleGroup
                  type="single"
                  value={mediatype}
                  onValueChange={(value) => {
                    if (value === "movie" || value === "tv") {
                      setMediatype(value);
                    }
                  }}
                  size="sm"
                >
                  <Tooltip>
                    <ToggleGroupItem
                      asChild
                      value="movie"
                      aria-label="Toggle movie"
                    >
                      <TooltipTrigger>
                        <Clapperboard className="h-2 w-2" />
                      </TooltipTrigger>
                    </ToggleGroupItem>
                    <TooltipContent className="border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground">
                      <p>Movie</p>
                    </TooltipContent>
                  </Tooltip>
                  <Separator orientation="vertical" className="h-6" />
                  <Tooltip>
                    <ToggleGroupItem asChild value="tv" aria-label="Toggle tv">
                      <TooltipTrigger>
                        <MonitorPlay className="h-2 w-2" />
                      </TooltipTrigger>
                    </ToggleGroupItem>
                    <TooltipContent className="border border-input bg-background shadow-sm hover:bg-accent text-accent-foreground">
                      <p>Tv</p>
                    </TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </div>
              <p className="text-sm text-muted-foreground pb-4">
                Use filters to find movies or TV shows.
              </p>

              <AdvancedSearchFilters
                filters={filters}
                setFilters={setFilters}
                mediatype={mediatype}
                loading={loading}
                handleDiscoverSearch={handleDiscoverSearch}
              />
            </div>
          </TabsContent>

          <Separator />
          {mediaResults ? (
            mediaResults.results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full mb-4 mt-8">
                {mediaResults.results.map((media, key) => (
                  <MediaCard key={key} media={media} />
                ))}
                {mediaResults.page < mediaResults.total_pages && (
                  <button
                    className="h-full rounded-xl min-h-40 w-full flex items-center justify-center gap-2 border p-4 text-muted bg-card hover:bg-background transition col-span-full"
                    onClick={loadMoreResults}
                    disabled={isLoadingMore}
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Loading...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" /> Load More
                      </>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <h3 className="text-xl font-semibold mb-2">
                  Oops! No results found
                </h3>
                <p className="text-sm">
                  We couldn't find any media matching your search. Try something
                  else!
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
                >
                  Clear Search
                </button>
              </div>
            )
          ) : (
            <div className="flex flex-col flex-grow items-center justify-center py-16 text-muted-foreground">
              <h3 className="text-xl font-semibold mb-2">
                Start by searching for media
              </h3>
              <p className="text-sm text-center">
                Enter a title use advanced search filters to discover movies or TV shows.
              </p>
            </div>
          )}
        </PageWrapper>
      </Tabs>
    </>
  );
};

export default Discover;
