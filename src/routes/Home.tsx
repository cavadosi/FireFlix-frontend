import { useEffect, useState } from "react";
import HeroCarousel from "@/components/core/HeroCarousel";
import { PageHeader } from "@/components/core/PageHeader";
import MediaService from "@/server/media";
import { ApiResponse, MediaList } from "@/types";
import MediaCarousel from "@/components/media/MediaCarousel";
import Loading from "./Loading";

const LISTS = [
  {
    name: "Top Rated",
    type: "movie",
    params: { sort_by: "vote_average.desc", "vote_count.gte": 1000 },
  },
  {
    name: "Now Playing",
    type: "movie",
    params: {
      sort_by: "popularity.desc",
      with_release_type: "2|3",
      "vote_count.gte": 1000,
    },
  },
  {
    name: "Popular TV Shows",
    type: "tv",
    params: { sort_by: "popularity.desc", "vote_count.gte": 1000 },
  },
  {
    name: "Action Movies",
    type: "movie",
    params: {
      with_genres: "28",
      sort_by: "popularity.desc",
      "vote_count.gte": 1000,
    },
  },
  {
    name: "Sci-Fi & Fantasy",
    type: "movie",
    params: {
      with_genres: "878,14",
      sort_by: "popularity.desc",
      "vote_count.gte": 1000,
    },
  },
  {
    name: "Horror Movies",
    type: "movie",
    params: {
      with_genres: "27",
      sort_by: "popularity.desc",
      "vote_count.gte": 1000,
    },
  },
  {
    name: "Comedy Shows",
    type: "tv",
    params: {
      with_genres: "35",
      sort_by: "popularity.desc",
      "vote_count.gte": 1000,
    },
  },
];

const Home = () => {
  const [mediaLists, setMediaLists] = useState<{ [key: string]: MediaList }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMediaLists = async () => {
      setLoading(true);
      const newMediaLists: { [key: string]: MediaList } = {};

      for (const list of LISTS) {
        const response: ApiResponse<MediaList> =
          await MediaService.DiscoverMedia(
            list.type as "movie" | "tv",
            list.params
          );

        if (response.status === 200 && response.data?.results) {
          newMediaLists[list.name] = response.data;
        }
      }

      setMediaLists(newMediaLists);
      setLoading(false);
    };

    fetchMediaLists();
  }, []);

  return !loading ? (
    <>
      <PageHeader isCentered />
      <HeroCarousel />

      <div className="grid grid-cols-1 z-10 bg-background -mt-0.5">
        <div className="col-span-1 max-w-full mx-auto overflow-hidden">
          {Object.entries(mediaLists).map(([title, media]) => (
            <MediaCarousel key={title} title={title} mediaList={media} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
