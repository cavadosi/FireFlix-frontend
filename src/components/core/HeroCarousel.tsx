import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";
import { useEffect, useState, useRef } from "react";
import MediaService from "@/server/media";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import { ApiResponse, MediaList } from "@/types";
import { isMovie } from "@/lib/utils";
import { Button } from "../ui/button";

const AUTOPLAY_DELAY = 4000; // 3 seconds

export default function HeroCarousel() {
  const [slides, setSlides] = useState<MediaList | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<Swiper | null>(null);

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
      <div className="relative w-full">
        <SwiperComponent
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
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[EffectCoverflow, Navigation, Autoplay]}
          className="mySwiper !pb-0 md:!pb-36"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.on("autoplayTimeLeft", (_, timeLeft, progressRatio) => {
              setProgress((1 - progressRatio) * 100);
            });
            swiper.on("slideChange", () => {
              setActiveIndex(swiper.realIndex);
              setProgress(0); // Reset progress when slide changes
            });
          }}
        >
          {slides?.results.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              className="!max-w-xl !w-full aspect-video"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
                  className="w-full h-full object-cover"
                />
                {index === activeIndex && (
                  <div className="absolute top-0 left-0 w-full h-1">
                    <div
                      className="h-full bg-secondary "
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="absolute top-0 w-full bg-gradient-to-t from-transparent to-background/60 p-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-lg font-bold text-secondary-foreground"
                    asChild
                  >
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
        </SwiperComponent>
      </div>
    )
  );
}
