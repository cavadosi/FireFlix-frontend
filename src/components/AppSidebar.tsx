import * as React from "react";
import {
  Flame,
  Clapperboard,
  MonitorPlay,
  Compass
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { NavHeader } from "@/components/NavHeader";
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
  },
  navHeader: {
    logo: Flame,
    name: "FireFlix",
    slogan: "Ignite Your Screen!",
  },
  navMain: [
    {
      title: "Movies",
      url: "#",
      icon: Clapperboard,
      isActive: true,
      items: [
        {
          title: "Now playing",
          url: "#",
        },
        {
          title: "Popular",
          url: "#",
        },
        {
          title: "Top rated",
          url: "#",
        },
        {
          title: "Upcoming",
          url: "#",
        },
      ],
    },
    {
      title: "TV Shows",
      url: "#",
      icon: MonitorPlay,
      items: [
        {
          title: "Airing today",
          url: "#",
        },
        {
          title: "On the air",
          url: "#",
        },
        {
          title: "Popular",
          url: "#",
        },
        {
          title: "Top rated",
          url: "#",
        },
      ],
    },
    {
      title: "Discover",
      url: "#",
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
