import { useContext } from "react";
import AuthContext from "@/components/core/UserProvider";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MediaListCard } from "@/components/media/MediaListCard";
import { Link } from "react-router-dom";
import { UserX } from "lucide-react";
import { UserLists } from "@/types";

const userListMetadata: { key: keyof UserLists; title: string; description: string }[] = [
  { key: "ratedMovies", title: "Rated Movies", description: "Movies you have rated" },
  { key: "favoriteMovies", title: "Favorite Movies", description: "Movies you have marked as favorites" },
  { key: "watchlistMovies", title: "Watchlist Movies", description: "Movies you want to watch later" },
  { key: "ratedTv", title: "Rated TV Shows", description: "TV shows you have rated" },
  { key: "favoriteTv", title: "Favorite TV Shows", description: "TV shows you have marked as favorites" },
  { key: "watchlistTv", title: "Watchlist TV Shows", description: "TV shows you want to watch later" },
];


const Account = () => {
  const auth = useContext(AuthContext);
  const userLists = auth?.userLists;

  return (
    <>
      <PageHeader>
        <div className="font-bold">Account</div>
      </PageHeader>
      <PageWrapper>
        {auth?.user ? (
          <>
            {/* User Profile Card */}
            <Card className="flex items-center space-x-6 p-4 bg-muted rounded-lg shadow-md">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold capitalize">
                  {auth.user.username}
                </h2>
                <p className="text-gray-500">{"cavadosi"}</p>
              </div>
            </Card>

            <Separator />

            {/* User Lists */}
            <Card className="w-full bg-muted p-0">
              <CardHeader>
                <CardTitle>Your Lists</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="p-2">
                {userLists &&
                userListMetadata.some(({ key }) => userLists[key]?.results?.length ?? 0 > 0) ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                    {userListMetadata.map(({ key, title, description }) =>
                      userLists[key]?.results?.length ?? 0 > 0 ? (
                        <MediaListCard
                          key={key}
                          mediaList={userLists[key]!}
                          title={title}
                          description={description}
                        />
                      ) : null
                    )}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    You don’t have any saved lists.
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 gap-4 text-center">
            <Avatar className="size-20">
              <AvatarFallback>
                <UserX className="size-12" />
              </AvatarFallback>
            </Avatar>
            <p className="text-gray-500 text-xl">You are not logged in.</p>
            <Link to="/">
              <Button size="lg" variant="secondary">
                Go Back Home
              </Button>
            </Link>
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export default Account;
