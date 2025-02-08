import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MediaService from "@/server/media";
import type { Movie, TVShow, ApiResponse, MediaList } from "@/types";
import { Button } from "@/components/ui/button";
import { Star, Heart, Bookmark } from "lucide-react";
import { PageHeader } from "@/components/core/PageHeader";
import MediaCarousel from "@/components/media/MediaCarousel";
import { MediaAditionalInfo } from "@/components/media/MediaAditionalInfo";
import { isMovie } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CastCarousel from "@/components/core/CastCarousel";
import VideoModal from "@/components/core/VideoModal";
import { Separator } from "@/components/ui/separator";
import { useUserRegion } from "@/hooks/useUserRegion";

const MediaDetails = () => {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const { region } = useUserRegion();
  const [media, setMedia] = useState<Movie | TVShow | null>(null);
  const [similar, setSimilar] = useState<MediaList | null>(null);
  const [recomended, setRecomended] = useState<MediaList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaType || !id) {
      setError("Invalid media type or ID.");
      setLoading(false);
      return;
    }
    console.log(region);

    const fetchMedia = async () => {
      setLoading(true);
      setError(null);

      const response: ApiResponse<Movie | TVShow> = region
        ? await MediaService.GetMediaById(
            mediaType as "movie" | "tv",
            parseInt(id),
            region
          )
        : await MediaService.GetMediaById(
            mediaType as "movie" | "tv",
            parseInt(id),
          );
      if (response.status === 200 && response.data) {
        setMedia(response.data);
      } else {
        setError(response.error || "Failed to fetch media details.");
      }

      setLoading(false);
    };

    const fetchSimilar = async () => {
      setLoading(true);
      setError(null);

      const response: ApiResponse<MediaList> =
        await MediaService.GetSimilarMedia(
          mediaType as "movie" | "tv",
          parseInt(id)
        );

      if (response.status === 200 && response.data) {
        setSimilar(response.data);
      } else {
        setError(response.error || "Failed to fetch media details.");
      }

      setLoading(false);
    };

    const fetchRecomended = async () => {
      setLoading(true);
      setError(null);

      const response: ApiResponse<MediaList> =
        await MediaService.GetRecomendedMedia(
          mediaType as "movie" | "tv",
          parseInt(id)
        );

      if (response.status === 200 && response.data) {
        setRecomended(response.data);
      } else {
        setError(response.error || "Failed to fetch media details.");
      }

      setLoading(false);
    };

    fetchMedia();
    fetchSimilar();
    fetchRecomended();
  }, [mediaType, id, region]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!media) return <p>No media found.</p>;

  return (
    <>
      <PageHeader>
        <div className="grow">
          {isMovie(media)
            ? `${media.title} (${
                media.release_date
                  ? new Date(media.release_date).getFullYear()
                  : ""
              })`
            : `${media.name} (${
                media.first_air_date
                  ? new Date(media.first_air_date).getFullYear()
                  : ""
              })`}
        </div>
      </PageHeader>

      <div className="fixed top-0 z-0">
        <img
          src={
            isMovie(media)
              ? `https://image.tmdb.org/t/p/original/${
                  (media as Movie).backdrop_path
                }`
              : `https://image.tmdb.org/t/p/original/${
                  (media as TVShow).backdrop_path
                }`
          }
          alt="media poster image"
          className=" bg-cover"
        />
        <div className="absolute  -bottom-1 w-full h-10 bg-gradient-to-b from-transparent to-card group-hover:h-4 transition-all duration-300"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center z-10 mt-4 md:mt-20 h-96 bg-gradient-to-t from-background from-40% md:from-20% via-background/70 via-80% to-transparent">
        <div className="hidden md:flex items-center justify-center grow">
          <img
            src={
              isMovie(media)
                ? `https://image.tmdb.org/t/p/original/${
                    (media as Movie).poster_path
                  }`
                : `https://image.tmdb.org/t/p/original/${
                    (media as TVShow).poster_path
                  }`
            }
            alt="media poster image "
            className=" bg-contain  h-auto w-48 lg:w-56 rounded-lg"
          />
        </div>
        <div className="flex flex-col text-start basis-3/5 mx-6 md:mx-4 space-y-2">
          <div className="flex ">
            <div className=" font-bold text-xl text-wrap grow">
              {isMovie(media) ? (media as Movie).title : (media as TVShow).name}
            </div>
          </div>
          <div className=" text-sm text-pretty italic text-secondary-foreground">
            {isMovie(media) ? (media as Movie).tagline : null}
          </div>
          <div className="text-secondary-foreground line-clamp-4 text-pretty pr-0 md:pr-8">
            {isMovie(media)
              ? (media as Movie).overview
              : (media as TVShow).overview}
          </div>
          <div className="flex items-center gap-2 pt-2  text-sm flex-wrap ">
            {media.genres?.map((genre, key) => (
              <Badge
                key={key}
                variant="secondary"
                className="flex items-center gap-4"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-x-2 pt-2">
            {media.trailer && (
              <VideoModal
                video={media.trailer}
                label={
                  isMovie(media)
                    ? (media as Movie).title ?? "Video"
                    : (media as TVShow).name ?? "Video"
                }
              />
            )}
            <Button variant="outline" className="rounded-full gap-1.5 text-xs">
              <Star className="size-md text-amber-500" />
              {media.vote_average}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full group/favorite"
            >
              <Heart className=" text-rose-500 group-hover/favorite:fill-rose-500" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full group/watchlist"
            >
              <Bookmark className="size-md text-cyan-500 group-hover/watchlist:fill-cyan-500" />
            </Button>
            <MediaAditionalInfo media={media} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1  z-10 bg-background -mt-0.5">
        <div className="col-span-1 max-w-full mx-auto overflow-hidden my-8">
          {media.cast && <CastCarousel cast={media.cast} />}
          {recomended && (
            <MediaCarousel title="Recomended" mediaList={recomended} />
          )}
          {similar && <MediaCarousel title="Similar" mediaList={similar} />}
          <Separator />
        </div>
      </div>
    </>
  );
};

export default MediaDetails;
