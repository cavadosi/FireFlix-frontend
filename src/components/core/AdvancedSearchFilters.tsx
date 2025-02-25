import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DiscoverMoviesRequest, DiscoverTvShowsRequest, Genre } from "@/types";

interface AdvancedSearchFiltersProps {
  filters: DiscoverMoviesRequest | DiscoverTvShowsRequest;
  setFilters: (
    filters: Partial<DiscoverMoviesRequest | DiscoverTvShowsRequest>
  ) => void;
  mediatype: "movie" | "tv";
}

const GENRES = {
  movie: [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ],
  tv: [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ],
};

const SORT_OPTIONS = {
  movie: [
    { value: "original_title.asc", label: "Original Title Asc" },
    { value: "original_title.desc", label: "Original Title Desc" },
    { value: "popularity.asc", label: "Popularity Asc" },
    { value: "popularity.desc", label: "Popularity Desc" },
    { value: "revenue.asc", label: "Revenue Asc" },
    { value: "revenue.desc", label: "Revenue Desc" },
    { value: "primary_release_date.asc", label: "Release Date Asc" },
    { value: "primary_release_date.desc", label: "Release Date Desc" },
    { value: "title.asc", label: "Title Asc" },
    { value: "title.desc", label: "Title Desc" },
    { value: "vote_count.asc", label: "Vote Count Asc" },
    { value: "vote_count.desc", label: "Vote Count Desc" },
  ],
  tv: [
    { value: "first_air_date.asc", label: "First Air Date Asc" },
    { value: "first_air_date.desc", label: "First Air Date Desc" },
    { value: "name.asc", label: "Name Asc" },
    { value: "name.desc", label: "Name Desc" },
    { value: "popularity.asc", label: "Popularity Asc" },
    { value: "popularity.desc", label: "Popularity Desc" },
    { value: "vote_count.asc", label: "Vote Count Asc" },
    { value: "vote_count.desc", label: "Vote Count Desc" },
  ],
};

const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  filters,
  setFilters,
  mediatype,
}) => {
  const isMovie = mediatype === "movie";
  const genres: Genre[] = isMovie ? GENRES.movie : GENRES.tv;
  const sortOptions: {value: string, label:string}[] = isMovie
    ? SORT_OPTIONS.movie
    : SORT_OPTIONS.tv;

  const handleStartDateChange = (value: string) => {
    if (!value) {
      setFilters({
        ...filters,
        ...(isMovie
          ? { "primary_release_date.gte": undefined }
          : { "first_air_date.gte": undefined }),
      });
      return;
    }

    const dateStr = `${value}-01-01`;
    setFilters({
      ...filters,
      ...(isMovie
        ? { "primary_release_date.gte": dateStr }
        : { "first_air_date.gte": dateStr }),
    });
  };

  const handleEndDateChange = (value: string) => {
    if (!value) {
      setFilters({
        ...filters,
        ...(isMovie
          ? { "primary_release_date.lte": undefined }
          : { "first_air_date.lte": undefined }),
      });
      return;
    }

    const dateStr = `${value}-12-31`;
    setFilters({
      ...filters,
      ...(isMovie
        ? { "primary_release_date.lte": dateStr }
        : { "first_air_date.lte": dateStr }),
    });
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 1920 + 1 },
    (_, index) => new Date().getFullYear() - index
  );

  return (
    <form className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Géneros */}
        <div className="flex-1 min-w-[200px]">
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
              {genres.map((genre: Genre) => (
                <SelectItem key={genre.id} value={String(genre.id)}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Picker Range */}
        <div className="flex-1 min-w-[250px]">
          <Label>Date Range</Label>
          <div className="flex items-center gap-2">
            <div className="flex-1 items-center gap-2">
              <Select
                value={
                  isMovie
                    ? (filters as DiscoverMoviesRequest)[
                        "primary_release_date.gte"
                      ]
                      ? new Date(
                          (filters as DiscoverMoviesRequest)[
                            "primary_release_date.gte"
                          ] as string
                        )
                          .getFullYear()
                          .toString()
                      : ""
                    : (filters as DiscoverTvShowsRequest)["first_air_date.gte"]
                    ? new Date(
                        (filters as DiscoverTvShowsRequest)[
                          "first_air_date.gte"
                        ] as string
                      )
                        .getFullYear()
                        .toString()
                    : ""
                }
                onValueChange={(value) => handleStartDateChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"Min"} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span className="mx-1">-</span>
            <div className="flex-1 items-center gap-2">
              <Select
                value={
                  isMovie
                    ? (filters as DiscoverMoviesRequest)[
                        "primary_release_date.lte"
                      ]
                      ? new Date(
                          (filters as DiscoverMoviesRequest)[
                            "primary_release_date.lte"
                          ] as string
                        )
                          .getFullYear()
                          .toString()
                      : ""
                    : (filters as DiscoverTvShowsRequest)["first_air_date.lte"]
                    ? new Date(
                        (filters as DiscoverTvShowsRequest)[
                          "first_air_date.lte"
                        ] as string
                      )
                        .getFullYear()
                        .toString()
                    : ""
                }
                onValueChange={(value) => handleEndDateChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"Max"} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[200px]">
          <Label>Vote Average (0-10)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="Min"
              value={filters["vote_average.gte"] || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  ["vote_average.gte"]: parseFloat(e.target.value),
                })
              }
            />
            <Input
              type="number"
              min="0"
              max="10"
              step="0.1"
              placeholder="Max"
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

        <div className="flex-1 min-w-[200px]">
          <Label>Sort By</Label>
          <Select
            value={filters.sort_by || ""}
            onValueChange={(value) =>
              setFilters({ ...filters, sort_by: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
};

export default AdvancedSearchFilters;
