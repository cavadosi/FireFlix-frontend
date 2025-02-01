import * as React from "react";
import { Flame, Clapperboard, MonitorPlay, Compass } from "lucide-react";

import { NavMain } from "@/components/core/sidebar/NavMain";
import { NavUser } from "@/components/core/sidebar/NavUser";
import { NavHeader } from "@/components/core/sidebar/NavHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    accountUrl: "/account",
  },
  navHeader: {
    logo: Flame,
    name: "FireFlix",
    slogan: "Ignite Your Screen!",
    url: "/",
  },
  navMain: [
    {
      title: "Movies",
      url: "/movies",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Now playing",
          url: "/movies/now-playing",
        },
        {
          title: "Popular",
          url: "/movies/popular",
        },
        {
          title: "Top rated",
          url: "/movies/top-rated",
        },
        {
          title: "Upcoming",
          url: "/movies/upcoming",
        },
      ],
    },
    {
      title: "TV Shows",
      url: "/tv",
      icon: MonitorPlay,
      items: [
        {
          title: "Airing today",
          url: "/tv/airing-today",
        },
        {
          title: "On the air",
          url: "/tv/on-the-air",
        },
        {
          title: "Popular",
          url: "/tv/popular",
        },
        {
          title: "Top rated",
          url: "/tv/top-rated",
        },
      ],
    },
    {
      title: "Discover",
      url: "/discover",
      icon: Compass,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader company={data.navHeader} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
