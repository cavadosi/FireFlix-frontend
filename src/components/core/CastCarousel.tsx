import { People } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CastCard from "@/components/core/CastCard";

export default function CastCarousel({ cast }: { cast: People[] }) {
  if (!cast) return null;

  return (
    <Carousel className="py-4">
      <CarouselContent className="py-2">
        {cast.map((el) => (
          <CarouselItem
            key={el.id}
            className="ml-4 basis-3/12 md:basis-2/12 lg:basis-1/8"
          >
            <CastCard person={el}/>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
