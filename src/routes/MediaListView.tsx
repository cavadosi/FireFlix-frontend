import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "@/components/core/UserProvider";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";
import { Separator } from "@/components/ui/separator";
import { UserLists } from "@/types";
import MediaCard from "@/components/media/MediaCard";
import { SkeletonMediaCard } from "@/components/media/SkeletonMediaCard";

const userListMetadata: {
  key: keyof UserLists;
  title: string;
  description: string;
  endpoint: string;
}[] = [
  {
    key: "ratedMovies",
    title: "Rated Movies",
    description: "Movies you have rated",
    endpoint: "rated/movies",
  },
  {
    key: "favoriteMovies",
    title: "Favorite Movies",
    description: "Movies you have marked as favorites",
    endpoint: "favorite/movies",
  },
  {
    key: "watchlistMovies",
    title: "Watchlist Movies",
    description: "Movies you want to watch later",
    endpoint: "watchlist/movies",
  },
  {
    key: "ratedTv",
    title: "Rated TV Shows",
    description: "TV shows you have rated",
    endpoint: "rated/tv",
  },
  {
    key: "favoriteTv",
    title: "Favorite TV Shows",
    description: "TV shows you have marked as favorites",
    endpoint: "favorite/tv",
  },
  {
    key: "watchlistTv",
    title: "Watchlist TV Shows",
    description: "TV shows you want to watch later",
    endpoint: "watchlist/tv",
  },
];

export default function MediaListView() {
  const { listKey } = useParams<{ listKey: string }>();
  const auth = useContext(AuthContext);
  const userLists = auth?.userLists;

  const listMetadata = userListMetadata.find((list) => list.key === listKey);
  const [mediaList, setMediaList] = useState<UserLists[keyof UserLists] | null>(
    null
  );

  useEffect(() => {
    if (listKey && userLists) {
      const initialList = userLists[listKey as keyof UserLists];
      setMediaList(initialList);
    }
  }, [listKey, userLists]);

  console.log(mediaList);

  return (
    <>
      <PageHeader isCentered>
        <div className="font-bold">{listMetadata?.title ?? "Media List"}</div>
      </PageHeader>
      <PageWrapper>
        <Separator />
        {mediaList ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full mb-4">
              {mediaList.results.map((media) => (
                <MediaCard key={media.id} media={media} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 mb-4 w-full">
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonMediaCard key={index} />
            ))}
          </div>
        )}
      </PageWrapper>
    </>
  );
}
