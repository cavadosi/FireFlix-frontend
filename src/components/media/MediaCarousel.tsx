import { MediaList } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import MediaCard from "./MediaCard";

export default function MediaCarousel({
  mediaList,
  title,
}: {
  mediaList: MediaList;
  title: string;
}) {
  return (
    <div className="flex flex-col">
      <Separator />
      <h2 className="text-xl font-bold pl-6 bg-sidebar py-2">{title}</h2>
      <Separator />
      <Carousel className="py-2" opts={{ loop: true}}>
        <CarouselContent className="py-2">
          {mediaList.results.map((media) => (
            <CarouselItem
            key={media.id}
            className=" basis-5/12 sm:basis-3/12 md:basis-[23.00%] lg:basis-1/6"
            >
              <MediaCard media={media} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
