import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "@/components/core/UserProvider";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";
import { Separator } from "@/components/ui/separator";
import { MediaList, User, UserLists } from "@/types";
import MediaCard from "@/components/media/MediaCard";
import { SkeletonMediaCard } from "@/components/media/SkeletonMediaCard";
import { Loader2, Plus } from "lucide-react";
import { GetUserList } from "@/server/user";

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
    endpoint: "rated/movies"
  },
  {
    key: "favoriteMovies",
    title: "Favorite Movies",
    description: "Movies you have marked as favorites",
    endpoint: "favorite/movies"
  },
  {
    key: "watchlistMovies",
    title: "Watchlist Movies",
    description: "Movies you want to watch later",
    endpoint: "watchlist/movies"
  },
  {
    key: "ratedTv",
    title: "Rated TV Shows",
    description: "TV shows you have rated",
    endpoint: "rated/tv"
  },
  {
    key: "favoriteTv",
    title: "Favorite TV Shows",
    description: "TV shows you have marked as favorites",
    endpoint: "favorite/tv"
  },
  {
    key: "watchlistTv",
    title: "Watchlist TV Shows",
    description: "TV shows you want to watch later",
    endpoint: "watchlist/tv"
  },
];

export default function MediaListView() {
  const { listKey } = useParams<{ listKey: string }>(); // Get list key from URL
  const auth = useContext(AuthContext);
  const userLists = auth?.userLists;
  const user = auth?.user;

  const listMetadata = userListMetadata.find((list) => list.key === listKey);
  const [mediaList, setMediaList] = useState<UserLists[keyof UserLists] | null>(
    null
  );


  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMedia = async (listKey: string, user: User, page: number) => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const response = await GetUserList(listKey, user.id, page);
      console.log(response);
      if (response.status === 200 && response.data) {
        setMediaList(
          (prevList) =>
            ({
              ...response.data,
              results: [
                ...(prevList?.results || []),
                ...(response.data?.results || []),
              ],
              page: response.data?.page ?? prevList?.page ?? 1,
              total_pages:
                response.data?.total_pages ?? prevList?.total_pages ?? 1,
              total_results:
                response.data?.total_results ?? prevList?.total_results ?? 0,
            } as MediaList)
        );
      }
    } catch (error) {
      console.error("Error loading more media:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (listKey && userLists) {
      const initialList = userLists[listKey as keyof UserLists];
      setMediaList(initialList);
    }
  }, [listKey, userLists]);


  return (
    <>
      <PageHeader>
        <div className="font-bold">{listMetadata?.title ?? "Media List"}</div>
      </PageHeader>
      <PageWrapper>
        <Separator />
        {mediaList && listMetadata ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 w-full mb-4">
              {mediaList.results.map((media, key) => (
                <MediaCard key={key} media={media} />
              ))}
              {mediaList.page < mediaList.total_pages && (
                        <button
                          className="h-full rounded-xl min-h-40 w-full flex items-center justify-center gap-2 border p-4 text-muted bg-card hover:bg-background transition"
                  onClick={() => fetchMedia(listMetadata.endpoint, user!, mediaList.page + 1)}
                  disabled={isLoadingMore}
                        >
                          {isLoadingMore ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />{" "}
                              Loading...
                            </>
                          ) : (
                            <>
                              <Plus className="w-5 h-5" /> Load More
                            </>
                          )}
                        </button>
                      )}
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
