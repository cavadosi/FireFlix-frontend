import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import MediaService from "@/server/media";
import type { Movie, TVShow, ApiResponse, MediaList } from "@/types";
import { PageHeader } from "@/components/core/PageHeader";
import MediaHeader from "@/components/media/MediaHeader";
import MediaBackdrop from "@/components/media/MediaBackdrop";
import AuthContext from "@/components/core/UserProvider";
import MediaMainInfo from "@/components/media/MediaMainInfo";
import MediaContent from "@/components/media/MediaContent";

const MediaDetails = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const auth = useContext(AuthContext);
  const [media, setMedia] = useState<Movie | TVShow | null>(null);
  const [similar, setSimilar] = useState<MediaList | null>(null);
  const [recomended, setRecomended] = useState<MediaList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const user = auth?.user

  useEffect(() => {
    if (!mediaType || !id) {
      setError("Invalid media type or ID.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const mediaResponse: ApiResponse<Movie | TVShow> = user?.region
          ? await MediaService.GetMediaById(
              mediaType as "movie" | "tv",
              parseInt(id),
              user.region
            )
          : await MediaService.GetMediaById(
              mediaType as "movie" | "tv",
              parseInt(id)
            );

        const similarResponse: ApiResponse<MediaList> =
          await MediaService.GetSimilarMedia(
            mediaType as "movie" | "tv",
            parseInt(id)
          );

        const recommendedResponse: ApiResponse<MediaList> =
          await MediaService.GetRecomendedMedia(
            mediaType as "movie" | "tv",
            parseInt(id)
          );

        if (mediaResponse.status === 200 && mediaResponse.data)
          setMedia(mediaResponse.data);
        else setError(mediaResponse.error || "Failed to fetch media details.");

        if (similarResponse.status === 200 && similarResponse.data)
          setSimilar(similarResponse.data);
        if (recommendedResponse.status === 200 && recommendedResponse.data)
          setRecomended(recommendedResponse.data);
      } catch (err) {
        setError(`An error occurred while fetching data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mediaType, id, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!media) return <p>No media found.</p>;

  return (
    <>
      <PageHeader>
        <MediaHeader media={media} />
      </PageHeader>
      <MediaBackdrop media={media} />
      <MediaMainInfo media={media} />
      <MediaContent media={media} similar={similar} recomended={recomended} />
    </>
  );
};

export default MediaDetails;
