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
  const [mediatype, setMediatype] = useState<"movie" | "tv">("movie");
  const [activeTab, setActiveTab] = useState<string>("search");
  const [loading, setLoading] = useState<boolean>(false);
  const [mediaResults, setMediaResults] = useState<MediaList | null>(null);

  // 🔹 Handle Title-Based Search
  const handleTitleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

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

    setLoading(true);
    try {
      const response = await MediaService.DiscoverMedia(mediatype, {
        ...filters,
        page: 1,
      });

      if (response.status === 200 && response.data) {
        setMediaResults(response.data); // Update the mediaResults state
      }
    } catch (error) {
      console.error("Error discovering media:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <PageHeader>
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
                  <ToggleGroupItem value="movie" aria-label="Toggle bold">
                    <Clapperboard className="h-2 w-2" />
                  </ToggleGroupItem>
                  <Separator orientation="vertical" className="h-6" />
                  <ToggleGroupItem value="tv" aria-label="Toggle italic">
                    <MonitorPlay className="h-2 w-2" />
                  </ToggleGroupItem>
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
                <h4 className="text-xl font-medium leading-none">Advanced Search</h4>
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
                  <ToggleGroupItem value="movie" aria-label="Toggle bold">
                    <Clapperboard className="h-2 w-2" />
                  </ToggleGroupItem>
                  <Separator orientation="vertical" className="h-6" />
                  <ToggleGroupItem value="tv" aria-label="Toggle italic">
                    <MonitorPlay className="h-2 w-2" />
                  </ToggleGroupItem>
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
          {mediaResults && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full mt-8">
              {mediaResults.results.map((media, key) => (
                <MediaCard key={key} media={media} />
              ))}
            </div>
          )}
        </PageWrapper>
      </Tabs>
    </>
  );
};

export default Discover;
