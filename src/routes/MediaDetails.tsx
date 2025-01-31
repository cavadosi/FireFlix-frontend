import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MediaService from "@/server/media";
import type { Movie, TVShow, ApiResponse } from "@/types";

const MediaDetails = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const [media, setMedia] = useState<Movie | TVShow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaType || !id) {
      setError("Invalid media type or ID.");
      setLoading(false);
      return;
    }

    const fetchMedia = async () => {
      setLoading(true);
      setError(null);

      const response: ApiResponse<Movie | TVShow> = await MediaService.GetMediaById(
        mediaType as "movie" | "tv",
        parseInt(id)
      );

      if (response.status === 200 && response.data) {
        console.log(response.data);
        setMedia(response.data);
      } else {
        setError(response.error || "Failed to fetch media details.");
      }

      setLoading(false);
    };

    fetchMedia();
  }, [mediaType, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!media) return <p>No media found.</p>;

  return (
    <div>
        <img src={mediaType === "movie" ? `https://image.tmdb.org/t/p/original/${(media as Movie).backdrop_path}` : `https://image.tmdb.org/t/p/original/${(media as TVShow).name}`} alt="" />
      <h2>{mediaType === "movie" ? (media as Movie).title : (media as TVShow).name}</h2>
      <p>{mediaType === "movie" ? (media as Movie).overview : (media as TVShow).overview}</p>
    </div>
  );
};

export default MediaDetails;
