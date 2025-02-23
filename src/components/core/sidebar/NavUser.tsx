import { useContext, useMemo } from "react";
import {
  ChevronsUpDown,
  Bookmark,
  Star,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AuthContext from "@/components/core/UserProvider";
import { LoginForm } from "@/components/core/LoginForm";

export function NavUser() {
  const { isMobile, setOpenMobile } = useSidebar();
  const auth = useContext(AuthContext);

  const user = auth?.user;
  const userLists = auth?.userLists;
  const logout = auth?.logout;

  const userListsData = useMemo(() => {
    return [
      {
        key: "favorites",
        label: "Favorites",
        icon: <Heart className="text-red-500 fill-red-500" />,
        count: {
          movies: userLists?.favoriteMovies?.total_results || 0,
          tv: userLists?.favoriteTv?.total_results || 0,
        },
        listLink: {
          movies: "favoriteMovies",
          tv: "favoriteTv",
        },
      },
      {
        key: "watchlist",
        label: "Watchlist",
        icon: <Bookmark className="text-cyan-500 fill-cyan-500" />,
        count: {
          movies: userLists?.watchlistMovies?.total_results || 0,
          tv: userLists?.watchlistTv?.total_results || 0,
        },
        listLink: {
          movies: "watchlistMovies",
          tv: "watchlistTv",
        },
      },
      {
        key: "rated",
        label: "Rated",
        icon: <Star className="text-amber-500 fill-amber-500" />,
        count: {
          movies: userLists?.ratedMovies?.total_results || 0,
          tv: userLists?.ratedTv?.total_results || 0,
        },
        listLink: {
          movies: "ratedMovies",
          tv: "ratedTv",
        },
      },
    ];
  }, [userLists]);

  return (
    <SidebarMenu>
      {user ? (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-6 w-6 m-1 overflow-hidden rounded-full">
                  <AvatarImage
                    src={
                      auth.user?.avatar?.tmdb?.avatar_path
                        ? `https://image.tmdb.org/t/p/w200/${auth.user.avatar?.tmdb?.avatar_path}`
                        : `https://secure.gravatar.com/avatar/${auth.user?.avatar?.gravatar?.hash}.jpg?s=200`
                    }
                    alt="user avatar"
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback>
                    {auth.user?.name?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.username}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage
                      src={
                        auth.user?.avatar?.tmdb?.avatar_path
                          ? `https://image.tmdb.org/t/p/w200/${auth.user.avatar?.tmdb?.avatar_path}`
                          : `https://secure.gravatar.com/avatar/${auth.user?.avatar?.gravatar?.hash}.jpg?s=200`
                      }
                      alt="user avatar"
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback>
                      {auth.user?.name?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.username}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to="/account" onMouseDown={() => setOpenMobile(false)}>
                    <User className="text-zinc-500 " />
                    Account
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Tabs defaultValue="movie">
                <TabsList className="w-full">
                  <TabsTrigger value="movie" className="w-full">
                    Movie
                  </TabsTrigger>
                  <TabsTrigger value="tv" className="w-full">
                    Tv
                  </TabsTrigger>
                </TabsList>
                <DropdownMenuGroup>
                  <TabsContent value="movie">
                    {userListsData.map((item) => (
                      <Link
                        to={`/lists/${item.listLink.movies}`}
                        onMouseDown={() => setOpenMobile(false)}
                        key={item.key}
                      >
                        <DropdownMenuItem>
                          {item.icon}
                          <div className="grow">{item.label}</div>
                          <Badge variant="secondary">{item.count.movies}</Badge>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </TabsContent>
                  <TabsContent value="tv">
                    {userListsData.map((item) => (
                      <Link
                        to={`/lists/${item.listLink.tv}`}
                        key={item.key}
                        onMouseDown={() => setOpenMobile(false)}
                      >
                        <DropdownMenuItem>
                          {item.icon}
                          <div className="grow">{item.label}</div>
                          <Badge variant="secondary">{item.count.tv}</Badge>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                  </TabsContent>
                </DropdownMenuGroup>
              </Tabs>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <SidebarMenuButton onMouseDown={logout}>
                  <LogOut />
                  Log out
                </SidebarMenuButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ) : (
        <SidebarMenuItem>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton
                tooltip="Log In"
                size="lg"
                variant="outline"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Log in</span>
                  <span className="truncate text-xs">Verify your client</span>
                </div>
              </SidebarMenuButton>
            </DialogTrigger>
            <LoginForm />
          </Dialog>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
