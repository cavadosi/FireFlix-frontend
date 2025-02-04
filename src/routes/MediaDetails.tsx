import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MediaService from "@/server/media";
import type { Movie, TVShow, ApiResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Star, Heart, Bookmark } from "lucide-react";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";
import { isMovie } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

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

      const response: ApiResponse<Movie | TVShow> =
        await MediaService.GetMediaById(
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
    <>
      <PageHeader>
        <div className="grow">{isMovie(media) ? media.title : media.name}</div>
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
        <div className="flex flex-col text-start basis-3/5 mx-4 space-y-2">
          <div className="flex ">
            <div className=" font-bold text-xl text-wrap grow">
              {isMovie(media) ? (media as Movie).title : (media as TVShow).name}
            </div>
          </div>
          <div className=" text-secondary-foreground text-pretty">
            {isMovie(media)
              ? (media as Movie).overview
              : (media as TVShow).overview}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex h-5 items-center space-x-4 text-sm ">
              {media.genres?.map((genre, key) => (
                <div key={key} className="flex h-5 items-center gap-4">
                  {genre.name}
                  <Separator orientation="vertical" />
                </div>
              ))}
            </div>
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
          </div>
        </div>
      </div>
      <div className="h-screen z-10 bg-background">
        <PageWrapper>AKSLJDasjdaksjd</PageWrapper>
      </div>
    </>
  );
};

export default MediaDetails;
