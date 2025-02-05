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
      ? `https://www.youtube.com/embed/${video.id}?rel=0`
      : `https://vimeo.com/${video.id}`;

  console.log(videoUrl);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full gap-1.5 text-xs">
          <Play className="size-md text-amber-500" />
          Watch trailer
        </Button>
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
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
