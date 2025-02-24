import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import MediaService from "@/server/media";
import type { Movie, TVShow, ApiResponse, MediaList } from "@/types";
import { PageHeader } from "@/components/core/PageHeader";
import { MediaAditionalInfo } from "@/components/media/MediaAditionalInfo";
import MediaHeader from "@/components/media/MediaHeader";
import MediaBackdrop from "@/components/media/MediaBackdrop";
import AuthContext from "@/components/core/UserProvider";
import MediaMainInfo from "@/components/media/MediaMainInfo";
import MediaContent from "@/components/media/MediaContent";
import Loading from "./Loading";
import Error from "./Error";

const MediaDetails = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const auth = useContext(AuthContext);
  const [media, setMedia] = useState<Movie | TVShow | null>(null);
  const [similar, setSimilar] = useState<MediaList | null>(null);
  const [recomended, setRecomended] = useState<MediaList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const region = auth?.region

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

        const mediaResponse: ApiResponse<Movie | TVShow> = region
          ? await MediaService.GetMediaById(
              mediaType as "movie" | "tv",
              parseInt(id),
              region
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
  }, [mediaType, id, region]);

  if (loading || !media) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <PageHeader>
        
        <MediaHeader media={media} />
        <MediaAditionalInfo media={media} />
      </PageHeader>
      <MediaBackdrop media={media} />
      <MediaMainInfo media={media} />
      <MediaContent
        media={media}
        similar={similar}
        recomended={recomended}
        reviews={media.reviews || null}
      />
    </>
  );
};

export default MediaDetails;
