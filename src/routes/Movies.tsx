import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MediaCarousel from "@/components/media/MediaCarousel";
import MediaCard from "@/components/media/MediaCard";
import MediaService from "@/server/media";
import { ApiResponse, MediaList } from "@/types";

const Movies = () => {
  const { query } = useParams<{ query?: string }>();
  console.log(query);

  const [activeList, setActiveList] = useState<MediaList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      setError(null);

      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "movie",
        query || "NowPlaying"
      );

      if (response.status === 200 && response.data) {
        setActiveList(response.data);
      } else {
        setError(response.error || "Failed to fetch media details.");
      }

      setLoading(false);
    };

    fetchMedia();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!activeList) return <p>No media found.</p>;

  return (
    <div className="grid grid-cols-1">
      <Link to={"/movie/912649/details"}>
        <Button>Go to movie</Button>
      </Link>

      {/* Grid container with proper width constraints */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full">
        {activeList.results.slice(0, 8).map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>

      {/* MediaCarousel */}
      <MediaCarousel title="MediaCarousel" mediaList={activeList} />
    </div>
  );
};

export default Movies;
