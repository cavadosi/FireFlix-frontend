import { MediaList } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MediaCard from "./MediaCard";

export default function MediaCarousel({
  mediaList,
  title,
}: {
  mediaList: MediaList;
  title: string;
}) {
  return (
    <div className="flex flex-col px-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Carousel className="">
        <CarouselContent className="py-10">
          {mediaList.results.map((media) => (
            <CarouselItem key={media.id} className="basis-1/2 md:basis-1/4 lg:basis-1/8">
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
