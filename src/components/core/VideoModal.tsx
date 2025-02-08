import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video } from "@/types";
import { Play } from "lucide-react";

export default function VideoModal({
  video,
  label,
}: {
  video: Video;
  label: string;
}) {
  const videoUrl =
    video.site === "YouTube"
      ? `https://www.youtube.com/embed/${video.key}?rel=0`
      : `https://vimeo.com/${video.key}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button
            variant="outline"
            className="rounded-full gap-1.5 hidden sm:flex text-xs"
          >
            <Play className="size-md text-amber-500 " />
            Watch trailer
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full flex sm:hidden text-xs"
          >
            <Play className="size-md text-amber-500 " />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle className="pt-4 px-6">{label}</DialogTitle>
        </DialogHeader>
        <div className="relative pb-[56.25%] w-full h-0 rounded-b-xl overflow-clip">
          <iframe
            src={videoUrl}
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
