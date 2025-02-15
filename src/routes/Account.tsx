import { useContext, useEffect } from "react";
import AuthContext from "@/components/core/UserProvider";
import { PageWrapper } from "@/components/core/PageWrapper";
import { PageHeader } from "@/components/core/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { UserX } from "lucide-react";

const Account = () => {
  const auth = useContext(AuthContext);
  //   const avatarSrc = auth?.user?.avatar
  //     ? `https://www.themoviedb.org/t/p/w150_and_h150_face${auth.user.avatar}`
  //     : "https://via.placeholder.com/150?text=Avatar"; // Proper fallback placeholder image

  return (
    <>
      <PageHeader>
        <div className="font-bold">Account</div>
      </PageHeader>
      <PageWrapper>
        {auth?.user ? (
          <>
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
            <Card className="w-full bg-muted">
              <CardHeader>
                <CardTitle>Your Lists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3"></div>
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
              <Button size="lg" variant="secondary">Go Back Home</Button>
            </Link>
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export default Account;
