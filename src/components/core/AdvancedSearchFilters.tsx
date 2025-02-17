import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DiscoverMoviesRequest, DiscoverTvShowsRequest } from "@/types";

interface AdvancedSearchFiltersProps {
  filters: DiscoverMoviesRequest | DiscoverTvShowsRequest;
  setFilters: (
    filters: Partial<DiscoverMoviesRequest | DiscoverTvShowsRequest>
  ) => void;
  mediatype: "movie" | "tv";
  loading: boolean;
  handleDiscoverSearch: (e: React.FormEvent) => void;
}

const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  filters,
  setFilters,
  mediatype,
  loading,
  handleDiscoverSearch,
}) => {
  const isMovie = mediatype === "movie";
  return (
    <form onSubmit={handleDiscoverSearch} className="space-y-6">
      {/* Genre Filter */}
      <div>
        <Label>Genre</Label>
        <Select
          value={filters.with_genres || "all"}
          onValueChange={(value) =>
            setFilters({
              ...filters,
              with_genres: value === "all" ? undefined : value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="28">Action</SelectItem>
            <SelectItem value="35">Comedy</SelectItem>
            <SelectItem value="18">Drama</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vote Average Filter */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Min Vote Average</Label>
          <Input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={filters["vote_average.gte"] || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                ["vote_average.gte"]: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div>
          <Label>Max Vote Average</Label>
          <Input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={filters["vote_average.lte"] || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                ["vote_average.lte"]: parseFloat(e.target.value),
              })
            }
          />
        </div>
      </div>

      {/* Date Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{isMovie ? "Release Date From" : "First Air Date From"}</Label>
          <Input
            type="date"
            value={
              (isMovie
                ? (filters as DiscoverMoviesRequest)["primary_release_date.gte"]
                : (filters as DiscoverTvShowsRequest)["first_air_date.gte"]) || ""
            }
            onChange={(e) =>
              setFilters({
                ...filters,
                ...(isMovie
                  ? { ["primary_release_date.gte"]: e.target.value }
                  : { ["first_air_date.gte"]: e.target.value }),
              })
            }
          />
        </div>
        <div>
          <Label>{isMovie ? "Release Date To" : "First Air Date To"}</Label>
          <Input
            type="date"
            value={
              (isMovie
                ? (filters as DiscoverMoviesRequest)["primary_release_date.lte"]
                : (filters as DiscoverTvShowsRequest)["first_air_date.lte"]) || ""
            }
            onChange={(e) =>
              setFilters({
                ...filters,
                ...(isMovie
                  ? { ["primary_release_date.lte"]: e.target.value }
                  : { ["first_air_date.lte"]: e.target.value }),
              })
            }
          />
        </div>
      </div>

      {/* Sort By Filter */}
      <div>
        <Label>Sort By</Label>
        <Select
          value={filters.sort_by || ""}
          onValueChange={(value) => setFilters({ ...filters, sort_by: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity.desc">Popularity Desc</SelectItem>
            <SelectItem value="popularity.asc">Popularity Asc</SelectItem>
            <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
            <SelectItem value="vote_average.asc">Lowest Rated</SelectItem>
            <SelectItem value="release_date.desc">Newest First</SelectItem>
            <SelectItem value="release_date.asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Discover Button */}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default AdvancedSearchFilters;
