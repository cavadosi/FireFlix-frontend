// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import MediaService from "@/server/media";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { ApiResponse, MediaList } from "@/types";
import { isMovie } from "@/lib/utils";
import { Button } from "../ui/button";

export default function App() {
  const [slides, setSlides] = useState<MediaList | null>();

  useEffect(() => {
    const fetchMedia = async () => {
      const response: ApiResponse<MediaList> = await MediaService.GetMediaList(
        "movie",
        "Popular"
      );

      if (response.status === 200 && response.data?.results) {
        setSlides(response.data);
      }
    };

    fetchMedia();
  }, []);

  return (
    slides && (
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          loop={true}
          pagination={true}
          navigation={true}
          autoplay={{ delay: 3000 }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="mySwiper !pb-0 md:!pb-36"
        >
          {slides?.results.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="!max-w-xl !w-full aspect-video"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 w-full bg-gradient-to-t from-transparent to-background/60  p-2 ">
                  <Button variant="link" size="sm" className="text-lg font-bold text-secondary-foreground" asChild>
                    <Link
                      to={
                        isMovie(slide)
                          ? `/movie/${slide.id}/details`
                          : `/tv/${slide.id}/details`
                      }
                    >
                      {isMovie(slide) ? slide.title : slide.name}
                    </Link>
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
