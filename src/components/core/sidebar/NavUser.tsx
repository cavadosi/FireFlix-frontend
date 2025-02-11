import { useContext, useEffect, useMemo } from "react";
import { ChevronsUpDown, Bookmark, Star, Heart, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import AuthContext from "@/components/core/UserProvider";

export function NavUser() {
  const { isMobile } = useSidebar();
  const auth = useContext(AuthContext);

  const user = auth?.user;
  const userLists = auth?.userLists;
  const login = auth?.login;
  const logout = auth?.logout;

  
  const userListsCount = useMemo(() => {
    console.log("🆕 Calculando userListsCount...", userLists?.favoriteMovies);
    return {
      favorites:
      (userLists?.favoriteMovies?.total_results || 0) +
      (userLists?.favoriteTv?.total_results || 0),
      watchlist:
      (userLists?.watchlistMovies?.total_results || 0) +
      (userLists?.watchlistTv?.total_results || 0),
      rated:
      (userLists?.ratedMovies?.total_results || 0) +
      (userLists?.ratedTv?.total_results || 0),
    };
  }, [userLists]);

  useEffect(() => {
    console.log("🔄 userLists ha cambiado:", userLists?.favoriteMovies);
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
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
                  <Link to="/account">
                    <User className="text-zinc-500 fill-zinc-500" />
                    Account
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Heart className="text-red-500 fill-red-500" />
                  <div className="grow">Favorites</div>
                  <Badge key={userListsCount.favorites} variant="secondary">{userListsCount.favorites}</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="text-cyan-500 fill-cyan-500" />
                  <div className="grow">Watchlist</div>
                  <Badge key={userListsCount.watchlist} variant="secondary">{userListsCount.watchlist}</Badge>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="text-amber-500 fill-amber-500" />
                  <div className="grow">Rated</div>
                  <Badge key={userListsCount.rated} variant="secondary">{userListsCount.rated}</Badge>
                </DropdownMenuItem>
              </DropdownMenuGroup>
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
          <SidebarMenuButton
            tooltip="Log In"
            onClick={login}
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
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
